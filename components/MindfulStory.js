import { Button, Dimensions, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MindfulStory = ({desc, onPress, image, border, color, next}) => {
  return (
    <View style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center", padding: 50, backgroundColor: "#fff"}}>
      <Text style={{textAlign: "center", fontSize: 18, marginBottom: 0, fontWeight: "300", marginBottom: 30}}>{desc}</Text>
      <Image source={image} style={{position: "absolute", bottom: 0, left: 20, height: 130, width: 168}} />
      <View style={{position: "absolute", bottom: -50, right: 30}}>
        <Pressable onPress={onPress} style={{height: 50, width: 90, borderColor: border, justifyContent: "center", alignItems: "center", borderRadius: 10, borderWidth: 2, marginBottom: 160}}>
          <Text style={{color: color}}>{next}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default MindfulStory

const styles = StyleSheet.create({})