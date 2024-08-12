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

export function SignUpUi({ navigation }) {
  const image = {
    uri: "https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80",
  };


  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] =useState("");

  const ui = (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logo}>
          <Image source={require("./education.png")} />
        </View>
        <Text style={styles.text1}>Create Account</Text>

        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            width: 300,
            marginBottom: 20,
            marginTop: 20,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="First Name" value={firstName} onChangeText={text => setFirstName(text)}
        />
         <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            width: 300,
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Last Name" value={lastName} onChangeText={text => setLastName(text)}
        />
               <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            width: 300,
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Mobile Number" value={mobileNumber} onChangeText={text => setMobileNumber(text)}
        />
              <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            width: 300,
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="UserType" value={userType} onChangeText={text => setUserType(text)}
        />

        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            width: 300,
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}
        />


        <Pressable onPress={Registration} >
          <View style={styles.btn}>
            <Text style={styles.btntext1} >Sign Up</Text>
          </View>
        </Pressable>

        <View style={styles.view1}>
          <Text style={styles.text3}>Already have an account?</Text>
          <Text style={styles.text4}  onPress={() => navigation.navigate('Login')}   >Login</Text>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );



  function Registration(){
    var requestObject = {
        mobileNumber,
        firstName,
        lastName,
        userType,
        password,};
    
        var requestText =JSON.stringify(requestObject);

        var formData = new FormData();
        formData.append('requestText',requestText);

        var request= new XMLHttpRequest();
        request.onreadystatechange= function(){
            if(request.readyState == 4 && request.status == 200){

                if(request.responseText== "success"){
                 
                    navigation.navigate("Login");

                    Alert.alert("Message","Success");
                    saveData();

                }else{
                    Alert.alert("Message","Invalid Details");
                }

            }
        }

        request.open('POST','http://10.0.2.2/MyNotes/register.php',true);
        request.send(formData);

  }

  async function saveData(){
    await AsyncStorage.setItem("mobile",mobileNumber);
    await AsyncStorage.setItem("password",password);

    const x = await AsyncStorage.getItem("mobile");
    const y = await AsyncStorage.getItem("password");

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
    paddingVertical: 20,
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
