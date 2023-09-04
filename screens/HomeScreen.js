import { Image, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { FontAwesome, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {

    const list = [
        {
            id: "0",
            image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            name: "Home",
        },
        {
            id: "1",
            image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            name: "Deals",
        },
        {
            id: "2",
            image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            name: "Kitchen",
        },
        {
            id: "3",
            image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            name: "Living",
        },
    ]
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center" }}>
                    <Pressable style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 7,
                        gap: 10,
                        backgroundColor: "white",
                        borderRadius: 3,
                        height: 38,
                        flex: 1,
                        paddingHorizontal: 10,
                    }}>
                        <FontAwesome name="search" size={22} color="black" />
                        <TextInput placeholder='Search Amazon.in' />
                    </Pressable>
                    <Feather name="mic" size={24} color="black" />
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    padding: 10,
                    backgroundColor: "#AFEEEE"
                }}>
                    <Ionicons name="ios-location-outline" size={24} color="black" />
                    <Pressable>
                        <Text style={{ fontSize: 13, fontWeight: "500" }}>Deliver to Colombo - Sri Lanka</Text>
                    </Pressable>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {list.map((item, index) => (
                        <Pressable>
                            <Image style={{ width:50, height:50, resizeMode: "contain" }} source={{ uri:item.image}} />
                        </Pressable>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})