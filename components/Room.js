import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Room = ({title, music, color, onPress}) => {
  return (
    <Pressable onPress={onPress} style={{height: 180, width: "90%", backgroundColor: color, borderRadius: 20, paddingLeft: 15, marginTop: 20, borderColor: "grey", paddingTop: 20}}>
        <Text numberOfLines={1} style={{marginLeft: 15, color: "#fff", fontSize: 12, width: 240, fontWeight: "300", textTransform: "uppercase"}}>{music}</Text>
        <Text numberOfLines={3} style={{marginLeft: 15, color: "#fff", fontSize: 20, width: 240, fontWeight: "500", marginTop: 10}}>{title}</Text>
        <View style={{position: "absolute", bottom: 20, left: 20, flexDirection: "row", alignItems: "center"}}>
            <Entypo name="air" size={20} color="white" style={{marginLeft: 10}} />
              
        </View>
    </Pressable>
  )
}

export default Room

const styles = StyleSheet.create({})