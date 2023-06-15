import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const BottomTabs = createBottomTabNavigator();
const Map = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 150, alignItems: 'center' }}>
                <Text>Map</Text>
                <TouchableOpacity style={{
                    marginTop: -30,
                    marginRight: 350
                }} activeOpacity={0.5}
                    onPress={() => navigation.navigate('Home', { screen: 'PostsScreen' })} >
                    <Ionicons style={{ padding: 10, }} name="arrow-back-sharp" size={24} color="#212121" />

                </TouchableOpacity>
            </View>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    ...route.params.location,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.006,
                }}
                mapType="standard"
                minZoomLevel={15}
                onMapReady={() => console.log("Map is ready")}
                onRegionChange={() => console.log("Region change")}
            >
                <Marker
                    title="I am here"
                    coordinate={route.params.location}
                    description='Hello'
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default Map;