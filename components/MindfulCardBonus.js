import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

const MindfulCardBonus = ({color, image, desc, width, onPress, id, name}) => {
  return (
    <TouchableOpacity key={id} onPress={onPress} style={{height: 60, width: "90%", backgroundColor: color, borderRadius: 10, paddingLeft: 0, marginTop: 20, flexDirection: "row", alignItems: "center", borderColor: "grey",justifyContent: "space-around"}}>
        <View style={{flexDirection: "row", alignItems: "center", paddingLeft: 0}}>
            <Image source={{uri: image}} style={{height: 30, width: 30}} />
            <Text numberOfLines={1} style={{marginLeft: 15, color: "#fff", fontSize: 15, width: 200}}>{desc} {name}</Text>
        </View>
        <FontAwesome5 name="smile-beam" size={24} color="white" />
    </TouchableOpacity>
  )
}

export default MindfulCardBonus

const styles = StyleSheet.create({})