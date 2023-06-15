import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";


const BottomTabs = createBottomTabNavigator();

const PostsNav = ({ navigation }) => {
    return (
        <BottomTabs.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { height: 80, borderBottomColor: '#E8E8E8', borderBottomWidth: 2, }
        }}>
            <BottomTabs.Screen
                options={{
                    tabBarIcon: () => {
                        return <TouchableOpacity style={styles.trashButton} activeOpacity={0.5}
                            onPress={() => navigation.navigate('Home', { screen: 'Post' })}>
                            <EvilIcons name="trash" size={24} color="black" />
                        </TouchableOpacity>
                    },
                    headerLeft: () => (
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() => navigation.navigate('Home', { screen: 'CreatePostsScreen' })} >
                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                        </TouchableOpacity>),
                    headerLeftContainerStyle: { paddingLeft: 10 },
                    headerTitleAlign: "center",
                    headerTitleStyle: { paddingBottom: 5 }
                }} name='Створити публікацію' component={CreatePostsScreen} />
        </BottomTabs.Navigator>
    );
};

const styles = StyleSheet.create({
    trashButton: {
        backgroundColor: '#F6F6F6',
        height: 40,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
});

export default PostsNav;