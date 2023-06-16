import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, TouchableWithoutFeedback, Keyboard, ImageBackground } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import * as Location from "expo-location";


const BottomTabs = createBottomTabNavigator();

const CreatePostsScreen = ({ navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [inputRegion, setInputRegion] = useState('')
    const [title, setTitle] = useState('');
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);


    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
            }

            Location.getCurrentPositionAsync({}).then((locationPos) => {
                const coords = {
                    latitude: locationPos.coords.latitude,
                    longitude: locationPos.coords.longitude,
                };
                setLocation(coords);
                return coords;
            }).then((coords) => {
                return Location.reverseGeocodeAsync(coords)
            }).then((regionName) => setRegion(regionName)).catch();

        })();
    }, []);



    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            setInputRegion(region[0]['country'] + ", " + region[0]['city']);
        })();
    }, []);

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("../../fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("../../fonts/Roboto-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }
    const hendleCreate = () => {
        if (!title || !location || !image) { alert("Enter all data pleace!!!"); return }
        navigation.navigate('PostList', { image, location, inputRegion, title });
    }

    const inputTitlte = (text) => {

        setTitle(text);

    };
    const active = title && region;
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();

        }}>
            <View style={styles.postContainer}>

                <View style={styles.cameraContainer}>
                    <Camera
                        ref={ref => setCamera(ref)}
                        style={styles.fixedRatio}
                        type={type}
                        ratio={'1:1'} >
                        <TouchableOpacity
                            onPress={async () => {

                                if (camera) {
                                    const { uri } = await camera.takePictureAsync();
                                    setImage(uri);
                                    setInputRegion(region[0]['country'] + ", " + region[0]['city']);
                                    await MediaLibrary.createAssetAsync(uri);

                                }


                            }}
                            style={styles.postImgAdd} activeOpacity={0.5}>

                            <FontAwesome name="camera" size={24} color="#BDBDBD" />

                        </TouchableOpacity>
                    </Camera>
                    {image && <ImageBackground source={{ uri: image }} style={{
                        borderRadius: 35,
                        flexDirection: 'row',
                        marginTop: 32,
                        width: '100%',
                        height: '100%',
                        color: '#F6F6F6',
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    }} ><Text><TouchableOpacity style={styles.postImgAdd} activeOpacity={0.5}>

                        <FontAwesome name="camera" size={24} color="#BDBDBD" />

                    </TouchableOpacity>  </Text></ImageBackground>}
                </View>

                {!image ? <TouchableOpacity ><Text style={styles.postImgText}>Завантажте фото</Text>
                </TouchableOpacity> : <TouchableOpacity ><Text style={styles.postImgText}>Редагувати фото</Text>
                </TouchableOpacity>}
                <View style={styles.postForm}>
                    <TextInput style={styles.postName} onChangeText={inputTitlte} onFocus={() => {
                        setIsShowKeyboard(true);
                    }} placeholder="Назва..." inputMode="text" />
                    <View >
                        <Image style={{
                            top: 66,

                        }} />
                        {!image ? <Text style={{ ...styles.postName, paddingLeft: 10, color: '#BDBDBD' }} inputMode="navigation">
                            <EvilIcons name="location" size={24} color="gray" />Місцевість...</Text> :
                            <Text style={{ ...styles.postName, paddingLeft: 10 }} inputMode="navigation"> <EvilIcons name="location" size={24} color="gray" />{inputRegion}</Text>}

                    </View>

                    <TouchableOpacity style={active ? styles.postButtonActive : styles.postButton} onPress={hendleCreate} activeOpacity={0.5}>
                        <Text style={active ? styles.postButtonText : styles.postButtonTextActive}>Опубліковати</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback >)
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
    postButtonTextActive: {
        color: "#BDBDBD", fontFamily: "Roboto-Regular",

        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 19
    },
    postButtonActive: {
        backgroundColor: '#FF6C00',
        color: '#FFFFFF',
        height: 50,
        width: 343,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginTop: 44,
    },
    cameraContainer: {
        borderRadius: 35,
        flexDirection: 'row',
        marginTop: 32,
        width: '90%',
        height: '40%',
        color: '#F6F6F6',
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"

    },
    fixedRatio: {
        flex: 2,
        color: '#F6F6F6',
        justifyContent: "center",
        alignItems: "center",

        aspectRatio: 1.5,

    },
    postContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },

    postImgAdd: {
        padding: 40,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#FFFFFF',
    },
    postImgText: {
        fontFamily: "Roboto-Regular",
        color: "#BDBDBD",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        marginTop: 12,
        marginRight: 200
    },
    postForm: {
        flex: 3,
    },
    postButton: {
        backgroundColor: '#E8E8E8',
        height: 50,
        width: 343,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginTop: 44,
    },
    postButtonText: {
        fontFamily: "Roboto-Regular",
        color: '#fff',
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 19
    },
    postName: {
        fontFamily: "Roboto-Regular",
        width: 343,
        height: 50,
        borderRadius: 8,
        marginTop: 33,
        padding: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 2,
    },


});

export default CreatePostsScreen;