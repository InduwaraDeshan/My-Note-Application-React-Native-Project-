import { useState } from "react";
import React from "react";
import {
  Pressable,
  Alert,
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeUi({navigation}) {



  const image = {
    uri: "https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80",
  };



  const ui = (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logo}>
          <Image source={require("./education.png")} />
        </View>
        <Text style={styles.text1}>Notepad</Text>

        <Text style={styles.text2}>The easiest way to start your daily task</Text>


        <Pressable onPress={goToLoginPage} >
          <View style={styles.btn} >
            <Text style={styles.btntext1}>LOGIN</Text>
          </View>
        </Pressable>
        
        <Pressable onPress={goToSignUpPage} >
          <View style={styles.btn2}>
            <Text style={styles.btntext2}>SIGN UP</Text>
          </View>
        </Pressable>


      </ImageBackground>
    </SafeAreaView>
  );



  return ui;


  function goToLoginPage() {
    
    navigation.navigate("Login");
  }
  function goToSignUpPage() {
    
    navigation.navigate("SignUp");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0077b6",
  },
  text2: {
    fontSize: 14,
    marginTop:10,
    marginBottom:8,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },
  logo: {
    paddingVertical: 40,
    flexDirection: "row",
  },
  btn: {
    width:300,
    backgroundColor: "#0077b6",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom:20,
    alignItems: "center",
    justifyContent: "center",
  },
  btn2: {
    width:300,
    borderColor:"#0077b6",
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical:10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btntext1: {
    
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    paddingStart: 10,
  }, 
  btntext2: {
    fontSize: 25,
    color: "#0077b6",
    fontWeight: "bold",
    paddingStart: 10,
  },
});
