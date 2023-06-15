import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Post = ({ img, text, msgs, location, }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.postImg}></ImageBackground>
      <Text style={styles.posText} >{text}</Text>
      <View style={styles.infoContainer}>
        <View >
          <TouchableOpacity
            style={styles.info}
            activeOpacity={0.5} onPress={() => navigation.navigate('CommentsScreen')}>
            <Feather name="message-circle" size={18} color="#BDBDBD" />
            <Text style={{ marginLeft: 8, color: "#BDBDBD" }}>{msgs}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <EvilIcons name="location" size={24} color="gray" />
          <Text style={styles.infolink} onPress={() => navigation.navigate('Map', { screen: 'Map' })}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,
    justifyContent: "flex-start",
    padding: 10
  },
  postImg: {
    flex: 4,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    overflow: "hidden",
  },
  posText: {
    textAlign: "left",
    marginTop: 8,
    fontWeight: "500",
    fontSize: 16,

  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    padding: 10
  },
  infolink: {
    textDecorationLine: "underline",
  },
  infoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  }
});

export default Post;