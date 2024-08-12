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

export function LoginUi({ navigation}) {
  const image = {
    uri: "https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80",
  };


  const [getmobile, setMobile] = useState("");
  const [getpassword, setPassword] =useState("");


  const [getmobileField, setMobileField] = useState("");
  const [getpasswordField, setPasswordField] =useState("");


  const ui = (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logo}>
          <Image source={require("./education.png")} />
        </View>
        <Text style={styles.text1}>Welcome back.</Text>

        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            width: 300,
            marginBottom: 20,
            marginTop: 20,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Mobile Number" value={getmobileField} onChangeText={text => setMobileField(text)}
        />

        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            width: 300,
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Password" value={getpasswordField} onChangeText={text => setPasswordField(text)} secureTextEntry={true}
        />

       
        <Text style={styles.text2}>Forgot your password?</Text>
   
        <Pressable  onPress={Login}>
          <View style={styles.btn}>
            <Text style={styles.btntext1} >LOGIN</Text>
          </View>
        </Pressable>

        <View style={styles.view1}>
          <Text style={styles.text3}>Don't have an account?</Text>
          <Text style={styles.text4}   onPress={() => navigation.navigate('SignUp')}>Sign up</Text>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );


 async function Login(){

  const phone = await AsyncStorage.getItem("mobile");
  const pw = await AsyncStorage.getItem("password");

  setMobile(phone);
  setPassword(pw);


  var requestObject = {

    getmobileField,
    getpasswordField,
    getmobile,
    getpassword,

    };

    var requestText =JSON.stringify(requestObject);

    var formData = new FormData();
    formData.append('requestText',requestText);

    var request= new XMLHttpRequest();
    request.onreadystatechange= function(){
        if(request.readyState == 4 && request.status == 200){

            if(request.responseText== "success"){
             
                navigation.navigate("Note");

                Alert.alert("Message","Success");
             

            }else{
                Alert.alert("Message","Invalid Details");
            }

        }
    }

    request.open('POST','http://10.0.2.2/MyNotes/login.php',true);
    request.send(formData);




}







  return ui;
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
    marginBottom: 10,
    marginLeft:150,
    color: "black",
    fontWeight: "bold",
  },
  text3: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    color: "black",
    fontWeight: "bold",
  },
  text4: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    color: "#0077b6",
    fontWeight: "bold",
    paddingStart: 5,
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
    width: 300,
    backgroundColor: "#0077b6",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  view1: {
    flexDirection: "row",
  },
});
