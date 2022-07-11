import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const MindfulCard = ({color, image, desc, width, onPress, id}) => {
  return (
    <View style={{alignItems: "center"}}>
      <TouchableOpacity key={id} onPress={onPress} style={{height: 80, width: 80, backgroundColor: color, borderRadius: 40, marginTop: 0, flexDirection: "row", alignItems: "center", borderColor: "#fff", borderWidth: width, marginHorizontal: 10, justifyContent: "center"}}>
        <Image source={{uri: image}} style={{height: 40, width: 40}} />
      </TouchableOpacity>
      <Text style={{marginTop: 8, fontSize: 12}}>{desc}</Text>
    </View>
    
  )
}

export default MindfulCard

const styles = StyleSheet.create({})