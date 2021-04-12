import {NavigationContainer} from '@react-navigation/native';
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
// Screens
import Home from './screens/Home';
import AddSong from './screens/AddSong'
import SongDetails from './screens/SongDetails';

const Stack = createStackNavigator()

const MyStack = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Freestyle Playlist" component={Home}/>
      <Stack.Screen name="Añadir cancion,freestyle o rap a playlist" component={AddSong}/>
      <Stack.Screen name="Detalles de freestyle o rap" component={SongDetails}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

