const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin:1234@cluster0.xkwqaik.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ravishkadulshan1@gmail.com",
            pass: "fqjvbzsdhfvutmnh"
        }
    })

    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email verification",
        text: `Please click the following link to verify your email : http://localhost:${port}/verify/${verificationToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error);
    }
}

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}

const secretKey = generateSecretKey();

app.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "User already registered" });
        }
        const newUser = new User({ name, email, password });
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        await newUser.save();

        sendVerificationEmail(newUser.email, newUser.verificationToken);
    } catch (error) {
        console.log("Error registering User", error);
        res.status(500).json({ message: "Registration failed" });
    }
})

app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid Verification Token" });
        }
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();
        res.status(200).json({ message: "Email verified" });
    } catch (error) {
        res.status(500).json({ message: "Email verification failed" });
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "Invalid email or password" });
        }

        if (user.password !== password ){
            return res.status(500).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id}, secretKey);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
})