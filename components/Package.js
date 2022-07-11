import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import HyperLink from 'react-native-hyperlink';

const Package = ({primer}) => {

    

    return (
        <View style={{flexDirection: "row", alignItems: "center", width: 300 }}>
            <HyperLink linkDefault={true} linkStyle={{textDecorationLine: "underline"}}>
                <Text style={{width: 300, color: "black", fontSize: 15, textAlign: "center", paddingHorizontal: 40}}>{primer}</Text>
            </HyperLink>
        </View>
    )
}

export default Package

const styles = StyleSheet.create({})
