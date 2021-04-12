import { ScrollView, View, StyleSheet, Button } from "react-native";
import { Card } from "react-native-elements";
import React, { useState, useEffect } from "react";
import firebase from "../database/firebase";
import { Video } from "expo-av";

const SongDetails = props => {
  const [song, setSong] = useState([]);
  const songData = [];
  const [status, setStatus] = useState({});
  const video = React.useRef(null);

  const getSong = async () => {
    const idSong = props.route.params.idSong;
    const dbRef = firebase.db.collection("playlist").doc(idSong);
    const doc = await dbRef.get();
    const data = doc.data();
    // const videoId = data.url.split("=");
    // const urlFinal = "https://www.youtube.com/embed/" + videoId[1];
    songData.push({
      id: doc.id,
      name: data.name,
      url: data.url,
      type: data.type
    });
    setSong(songData);
  };
  useEffect(() => {
    getSong();
  }, []);
  return (
    <ScrollView>
      {song.map(songD => (
        <Card key={songD.id}>
          <Card.Title>{songD.name}</Card.Title>
          <Card.Divider />
          <View key={songD.id}>
            <Video
              ref={video}
              style={styles.backgroundVideo}
              source={{
                uri: songD.url
              }}
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
          </View>
          <View>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    marginBottom: 10
  }
});
export default SongDetails;
