import { useEffect, useState } from "react";
import React from "react";
import {
  Pressable,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export function NoteListUi({ navigation }) {
  const image = {
    uri: "https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80",
  };

  const [notes, setNotes] = useState([]);

  viewNoteList();

  const ui = (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
              }}
            >

              <View style={{ width:350 }} >
                <Text style={{ marginLeft: 200 }}>{item.date}</Text>

                <View style={{  flexDirection: "row", }}>
                  <View>
                    <Image source={require("./education.png")} />
                  </View>

                  <View style={{ marginStart:25,}}>
                    <Text>Category: {item.category}</Text>
                    <Text>Description: {item.note}</Text>
                  </View>
                </View>
              </View>


            </View>
          )}
        />

        <Pressable onPress={() => navigation.navigate("Note")}>
          <View style={styles.btn}>
            <Text style={styles.btntext1}>New Note</Text>
          </View>
        </Pressable>
      </ImageBackground>
    </SafeAreaView>
  );

  return ui;

  async function viewNoteList() {
    const mobile = await AsyncStorage.getItem("mobile");
    const formData = new FormData();

    formData.append("mobile", mobile);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setNotes(JSON.parse(request.responseText));
      }
    };

    request.open("POST", "http://10.0.2.2/MyNotes/noteList.php", true);
    request.send(formData);
  }

  function NoteViewUi({ item }) {
    const ui = (
      <View>
        <Text>{item.note}</Text>
        <Text>{item.mobile}</Text>
      </View>
    );
    return ui;
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
