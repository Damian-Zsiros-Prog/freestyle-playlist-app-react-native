import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  TextInput,
  Picker
} from "react-native";
import { Input, Text } from "react-native-elements";
import React, { useState, useEffect } from "react";
import firebase from "../database/firebase";

const Addsong = props => {
  const [playlist, setPlaylist] = useState({
    name: "",
    url: "",
    type: ""
  });
  const [type, setType] = useState("");

  const handleOnChangeText = (name, value) => {
    setPlaylist({ ...playlist, [name]: value });
  };

  const addSongToPlaylist = () => {
    if (playlist.name == "" || playlist.url == "") {
      alert("Dato/s vacios. Completelos e intentelo de nuevo");
    } else {
      if (playlist.type == "None" || playlist.type == "") {
        alert("Elija un tipo de procedencia del freestyle o rap a agregar");
      } else {
        try {
          firebase.db.collection("playlist").add({
            name: playlist.name,
            url: playlist.url,
            type: playlist.type
          });
          alert("Cancion,freestyle o rap agregado correctamente")
          props.navigation.navigate("Freestyle Playlist");
        } catch (e) {
          alert("Error al agregar la cancion");
          console.error(e);
        }
      }
    }
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Input
            placeholder="Nombre"
            leftIcon={{ type: "font-awesome", name: "user" }}
            onChangeText={value => handleOnChangeText("name", value, true)}
          />
          <Input
            placeholder="Url de la cancion"
            leftIcon={{ type: "font-awesome", name: "globe" }}
            onChangeText={value => handleOnChangeText("url", value, true)}
          />
          <Picker
            style={styles.space}
            selectedValue={playlist.type}
            onValueChange={typeValue => handleOnChangeText("type", typeValue)}
          >
            <Picker.Item
              label="Seleccionar el tipo de procedencia del freestyle o rap"
              value="None"
            />
            <Picker.Item label="Video externo" value="Video Externo" />
          </Picker>
          <Button
            style={styles.space}
            onPress={() => addSongToPlaylist()}
            title="Agregar cancion a playlist"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  space: {
    marginBottom: 10
  },
  textStyle: {
    fontSize: 18
  }
});
export default Addsong;
