import {
  StyleSheet, Text, ImageBackground,
  View, TouchableOpacity, TextInput, KeyboardAvoidingView,
  Platform, Keyboard, TouchableWithoutFeedback
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from "expo-font";


const backImage = require('../../Source/Photo_BG.png');
const buttonImg = require('./add.png');


const RegistrationScreen = ({ navigation }) => {

  const [login, setLogin] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const handleLogin = (text) => { setLogin(text) };
  const handleMail = (text) => { setMail(text) };
  const handlePassword = (text) => { setPassword(text) };

  const register = () => {
    if (!login || !mail || !password) { alert("Заповніть всі поля!!!"); return }
    navigation.navigate('Home', { screen: 'PostsScreen' });
  }

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setIsShowKeyboard(false);
      setInputFocused(false)
    }}>
      <View style={styles.maincontainer}>
        <ImageBackground source={backImage} style={styles.backImg}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.containerKeyB} >
            <View onPress={() => {
              Keyboard.dismiss();


            }} style={styles.container}>
              <View style={styles.pfotoContainer}>
                <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
                  <ImageBackground source={buttonImg} style={{ width: '100%', height: '100%' }}></ImageBackground>
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>

              <TextInput onFocus={() => {
                setIsShowKeyboard(true);
                setInputFocused((prev) => ({ ...prev, login: true }));
              }}
                onBlur={() =>
                  setInputFocused((prev) => ({ ...prev, login: false }))
                }
                style={
                  isInputFocused.login
                    ? {
                      ...styles.inputLogin,
                      backgroundColor: "#FFFFFF",
                      borderColor: "#FF6C00",
                    }
                    : {
                      ...styles.inputLogin,
                      backgroundColor: "#F6F6F6",
                      borderColor: "#E8E8E8",
                    }
                }
                placeholder="Логін" inputMode="text" value={login} onChangeText={handleLogin} />
              <TextInput onFocus={() => {
                setIsShowKeyboard(true);
                setInputFocused((prev) => ({ ...prev, mail: true }));
              }}
                onBlur={() =>
                  setInputFocused((prev) => ({ ...prev, mail: false }))
                }
                style={
                  isInputFocused.mail
                    ? {
                      ...styles.inputMailPassw,
                      backgroundColor: "#FFFFFF",
                      borderColor: "#FF6C00",
                    }
                    : {
                      ...styles.inputMailPassw,
                      backgroundColor: "#F6F6F6",
                      borderColor: "#E8E8E8",
                    }
                }
                placeholder="Адреса електронної пошти" inputMode="email" value={mail} onChangeText={handleMail} />
              <TextInput

                onFocus={() => {
                  setIsShowKeyboard(true);
                  setInputFocused((prev) => ({ ...prev, password: true }));
                }}
                onBlur={() =>
                  setInputFocused((prev) => ({ ...prev, password: false }))
                }
                style={
                  isInputFocused.password
                    ? {
                      ...styles.inputMailPassw,
                      backgroundColor: "#FFFFFF",
                      borderColor: "#FF6C00",
                    }
                    : {
                      ...styles.inputMailPassw,
                      backgroundColor: "#F6F6F6",
                      borderColor: "#E8E8E8",
                    }
                }

                placeholder="Пароль" secureTextEntry={isPasswordHidden} value={password} onChangeText={handlePassword} />

              <TouchableOpacity
                style={styles.passwShow}
                onPress={onShowPassword}
              >
                <Text style={styles.passwShowText}>
                  {isPasswordHidden ? "Показати" : "Сховати"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.registerButton} activeOpacity={0.5} onPress={register}>
                <Text style={styles.registerButtonText}>Зареєстуватися</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.loginLink, ...Platform.select({ ios: { marginBottom: isShowKeyboard ? -115 : 45, }, android: { marginBottom: isShowKeyboard ? -100 : 45, } })

                }}
                activeOpacity={0.5} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>

            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
  },
  backImg: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%'
  },
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  containerKeyB: {
    justifyContent: "flex-end",
  },
  pfotoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },

  addbutton: {
    marginTop: '65%',
    left: '90%',
    height: 25,
    width: 25,
    pointerEvents: "auto",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontWeight: '500',
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputLogin: {
    borderWidth: 1,
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
  },
  inputMailPassw: {
    borderWidth: 1,
    fontFamily: "Roboto-Regular",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    position: 'relative',
  },
  passwShowText: {
    fontFamily: "Roboto-Regular",
    color: '#1B4371',
    marginRight: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
  passwShow: {
    top: -34,
    left: 130,
  },
  registerButton: {
    backgroundColor: '#FF6C00',
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    fontFamily: "Roboto-Regular",
    color: '#fff',
    fontWeight: '400'
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66
  },
  loginLinkText: {
    fontFamily: "Roboto-Regular",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
});

export default RegistrationScreen;