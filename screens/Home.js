import { StyleSheet, Text, ScrollView, View, Button } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import React, { useState, useEffect } from "react";
import firebase from "../database/firebase";

const Home = props => {
  const [playlist, setPlaylist] = useState([]);

  const deleteSong = async id => {
    try {
      console.log(id);
      const dbRef = await firebase.db.collection("playlist").doc(id);
      await dbRef.delete();
      alert("Cancion, freestyle o rap eliminado correctamente");
    } catch (e) {
      alert("Error al eliminar");
      console.error(e);
    }
  };

  useEffect(() => {
    firebase.db.collection("playlist").onSnapshot(querySnapshot => {
      const data = [];
      querySnapshot.docs.forEach(doc => {
        const { name, url, type } = doc.data();
        data.push({
          id: doc.id,
          name: name,
          url: url,
          type: type
        });
      });
      setPlaylist(data);
    });
  }, []);
  return (
    <ScrollView>
      <View>
        <Button
          title="add freestyle"
          onPress={() =>
            props.navigation.navigate(
              "Añadir cancion,freestyle o rap a playlist"
            )
          }
        />
      </View>
      <View>
        {playlist.map(song => (
          <ListItem
            key={song.id}
            onPress={() =>
              props.navigation.navigate("Detalles de freestyle o rap", {
                idSong: song.id
              })
            }
          >
            <Avatar
              size="medium"
              source={{
                uri:
                  "https://image.winudf.com/v2/image1/aW8ua29kdWxhci5uZXViYXBwcy5GcmVlc3R5bGVTaW11bGFkb3JGb3JtYXRvRk1TX2ljb25fMTU3NjM1NDQzNl8wODU/icon.png?w=170&fakeurl=1"
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{song.name}</ListItem.Title>
              <ListItem.Subtitle>{song.type}</ListItem.Subtitle>
            </ListItem.Content>
            <View>
              <Button
                title="Eliminar"
                key={song.id}
                onPress={() => deleteSong(song.id)}
              />
            </View>
          </ListItem>
        ))}
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
  }
});
export default Home;
