import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Mindfulness = ({playPause, progress, name, day, image}) => {
  return (
    <ImageBackground source={{ uri: image }} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center"}}>
      <View style={{alignItems: "center", position: "absolute", top: 200}}>
        <Text style={{color: "#fff", fontSize: 30, fontWeight: "400"}}>{name}</Text>
        <Text style={{color: "#fff", fontSize: 22, fontWeight: "200", marginTop: 20}}>{day}</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center", position: "absolute", bottom: 100, width: "80%", justifyContent: "space-around"}}>  
                  
        <TouchableOpacity onPress={playPause} style={{zIndex: 1}}>
          <Ionicons name={"play"} size={70} color="#fff" style={{marginTop: 50}} />
        </TouchableOpacity>
      </View>
      <View style={[styles.progress, { width: `${progress}%`}]} />
    </ImageBackground>
  )
}

export default Mindfulness

const styles = StyleSheet.create({
  progress: {
    height: "100%",
    backgroundColor: "black",
    opacity: 0.3,
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0,
    zIndex: -1
  }
})