import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GroupMeditation = ({image, name}) => {
  return (
    <Pressable style={{height: 220, width: 250, borderRadius: 20, marginHorizontal: 10, marginTop: 20}}>
        <ImageBackground imageStyle={{ borderRadius: 20}} source={image} style={{height: 220, width: 250, borderRadius: 20}}>
            <View style={{height: 220, width: 250, backgroundColor: "black", opacity: 0.2, borderRadius: 20}} />
            <Text style={{color: "#fff", position: "absolute", bottom: 10, left: 10, fontSize: 18, fontWeight: "500"}}>{name}</Text>
        </ImageBackground>
    </Pressable>
  )
}

export default GroupMeditation

const styles = StyleSheet.create({})