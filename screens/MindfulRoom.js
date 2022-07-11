import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Button, Dimensions, Text, Pressable, KeyboardAvoidingView, Image } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { db } from '../firebase';
import { collection, doc, getDoc, onSnapshot } from '@firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Package from '../components/Package';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function App({route, navigation}) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [show, setShow] = useState(true)
  const [inner, setInner] = useState("")
  const [image, setImage] = useState("")
  const [rooms, setRooms] = useState([]);

  const {id} = route.params;

  useEffect(() => {
    const blabla = async() => {
      const coinss = doc(db, "rooms", id);
      const coinSnap = await getDoc(coinss);
      
      setInner(coinSnap.data().inner);
      setImage(coinSnap.data().image);
    }

    blabla();


      
}, [])

useEffect(
  () => 
  onSnapshot(collection(db, "rooms", id, "room"),
  (snapshot) => setRooms(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }))))

, []);
  

  return (
    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
      <Video
        ref={video}
        style={styles.video}
        source={{uri: image}}
        shouldPlay
        resizeMode="contain"
        isLooping
        resizeMode={"cover"}
      />
      {
          show ? (
            <>
                <Pressable onPress={() => navigation.goBack()} style={{position: "absolute", top: 50, left: 30, zIndex: 1}}>
                  <AntDesign name="back" size={24} color="white" />
                </Pressable>
                <Text style={{color: "#fff", fontSize: 30, zIndex: 1, width: "80%", textAlign: "center"}}>{inner}</Text>
                <View style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "black", position: "absolute", top: 0, opacity: 0.5}} />
                
                
                <View style={{width: 300, height: 200, backgroundColor: "#fff", marginTop: 30, alignItems: "center", borderRadius: 50, opacity: 0.8, justifyContent: "center"}}>
                    <ScrollView 
                        decelerationRate={0}
                        horizontal
                        snapToAlignment="center"
                        snapToInterval={300}
                        showsHorizontalScrollIndicator={false}
                        onStartShouldSetResponder={() => true}
                        style={{paddingTop: 20}}
                    >
                        {
                            rooms.map(({id, data}) => {
                                return <Package key={id} primer={data.primer} />
                            })
                        }
                        
                    </ScrollView>
                    <MaterialIcons name="navigate-next" size={24} color="black" style={{paddingBottom: 10}} />
                </View>
                <Pressable onPress={() => setShow(false)} style={{marginTop: 40, height: 50, width: 150, borderColor: "lightgrey", borderWidth: 2, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                  <Text style={{color: "#fff"}}>Think about it</Text>
                </Pressable>
               
               
               
            </>
          ) : <Pressable style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height}} onPress={() => setShow(true)}></Pressable>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
    video: {
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        zIndex: 0,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    }
})