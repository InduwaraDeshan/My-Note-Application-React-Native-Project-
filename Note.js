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

export function NoteUi({ navigation }) {
  const image = {
    uri: "https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80",
  };

  const [getCategory, setCategory] = useState("");
  const [getNote, setNote] = useState("");
  const [getmobile, setMobile] = useState("");

  const ui = (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text1}>Notepad</Text>
        <View style={styles.categoryView}>
          <TextInput
            multiline={true}
            style={{
              paddingHorizontal: 20,
              paddingBottom: 100,
              fontSize: 16,
              color: "#555",
            }}
            placeholder="Type of Category"
            value={getCategory}
            onChangeText={(text) => setCategory(text)}
          />
        </View>

        <View style={styles.noteView}>
          <TextInput
            multiline={true}
            style={{
              paddingHorizontal: 20,
              paddingBottom: 100,
              fontSize: 16,
              color: "#555",
            }}
            placeholder="Your note"
            value={getNote}
            onChangeText={(text) => setNote(text)}
          />
        </View>

        <Pressable onPress={SaveNote}>
          <View style={styles.btn}>
            <Text style={styles.btntext1}>Save Note</Text>
          </View>
        </Pressable>
      </ImageBackground>
    </SafeAreaView>
  );

  return ui;

  async function SaveNote() {

    const phone = await AsyncStorage.getItem("mobile");
    setMobile(phone);
    var formData = new FormData();

    formData.append("category", getCategory);
    formData.append("note", getNote);
    formData.append("mobile", getmobile);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        if (request.responseText == "success") {
          navigation.navigate("NoteList");

          Alert.alert("Message", "Save Note");
        } else {
        }
      }
    };

    request.open("POST", "http://10.0.2.2/MyNotes/saveNote.php", true);
    request.send(formData);
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
    marginTop: 10,
    marginBottom: 8,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    paddingVertical: 40,
    flexDirection: "row",
  },
  noteView: {
    borderWidth: 1,
    width: 400,
    height: 350,
  },
  categoryView: {
    width: 400,
    height: 150,
  },
  btn: {
    width: 250,
    backgroundColor: "#0077b6",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
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
});
