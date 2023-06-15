

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import { EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";

import { Feather } from '@expo/vector-icons';
const BottomTabs = createBottomTabNavigator();

const CommentsScreens = () => {
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("../../fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("../../fonts/Roboto-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();

        }}>

            <View style={{ position: "absolute", width: '100%', height: '100%' }}>
                <View style={{ top: 34, }}><Image style={{ width: 28, height: 28, borderRadius: 60, top: 30, marginLeft: 16 }} source={require('../../Source/Rectangle22.png')}></Image>
                    <Text style={{
                        backgroundColor: "rgba(0, 0, 0, 0.03)", width: 300, height: 100, marginLeft: 56,
                        marginRight: 15, borderWidth: 1, padding: 16, borderRadius: 6

                    }}>Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!</Text></View>

                <Text style={{ marginLeft: 280, marginTop: 8 }}>data</Text>
                <View style={{ position: "relative", left: 0, marginLeft: 40, marginTop: 35 }}>

                    <TextInput style={{ borderWidth: 2, borderRadius: 100, width: 343, height: 50, paddingLeft: 15, borderColor: '#E8E8E8', backgroundColor: '#E8E8E8' }} placeholder="Коментувати..." inputMode="text" />
                    <TouchableOpacity style={{ position: "absolute", borderRadius: 40, padding: 8, backgroundColor: "#FF6C00", marginTop: 5, marginLeft: 289 }}>
                        <Feather name="arrow-up" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                </View>
            </View>

        </TouchableWithoutFeedback>)
};


const CommentsScreen = ({ navigation }) => {
    return (
        <BottomTabs.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { height: 80, },
            tabBarStyle: { display: "none" }
        }}>
            <BottomTabs.Screen
                options={{

                    tabBarIcon: () => {
                        return <TouchableOpacity activeOpacity={0.5} >
                            <EvilIcons name="trash" size={24} color="black" />
                        </TouchableOpacity>
                    },
                    headerLeft: () => (
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() => navigation.navigate('Home', { screen: 'PostsScreen' })} >
                            <Ionicons name="arrow-back-sharp" size={24} color="#212121" />
                        </TouchableOpacity>),
                    headerLeftContainerStyle: { paddingLeft: 10 },
                    headerTitleAlign: "center",
                    headerTitleStyle: { paddingBottom: 5 },
                    headerStyle: {
                        borderBottomColor: '#E8E8E8',
                        borderBottomWidth: 2,

                    }
                }} style={{
                    fontFamily: "Roboto-Medium", fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 17,
                    lineHeight: 22
                }} name='Коментарі' component={CommentsScreens} />
        </BottomTabs.Navigator>
    );
};



export default CommentsScreen;