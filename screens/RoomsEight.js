import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Button, Dimensions, Text, Pressable, KeyboardAvoidingView, Image, Animated, Keyboard } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Package from '../components/Package';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { addDoc, collection, doc, getDoc, onSnapshot } from '@firebase/firestore';
import { db } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';



export default function App({route, navigation}) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [show, setShow] = useState(true)
  const [inner, setInner] = useState("")
  const [image, setImage] = useState("")
  const [rooms, setRooms] = useState([]);
  const [countDown, setCountDown] = useState(true);
  const [input, setInput] = useState("");

  const [items, setItems] = useState([]);

  const {id} = route.params;

  
  useEffect(
    () => 
    onSnapshot(collection(db, "rooms", id, "room"),
    
    (snapshot) => setItems(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))
, []);

useEffect(() => {
    const blabla = async() => {
      const coinss = doc(db, "rooms", id);
      const coinSnap = await getDoc(coinss);
      
      setInner(coinSnap.data().inner);
      
    }

    blabla();


      
}, [])

const addContent = () => {
    addDoc(collection(db, "rooms", id, "room"), {
        primer: input
    })

    setInput(null);
    Keyboard.dismiss();
}

const [sound, setSound] = React.useState();



useEffect(() => {
    const neki =  async() => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       {uri: "https://firebasestorage.googleapis.com/v0/b/mindfulfriend-9fe90.appspot.com/o/meditate.mp3?alt=media&token=c9678472-17b6-4b16-9768-a5d55cc90bef"}
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

    neki();
}, [])



  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
      <Video
        ref={video}
        style={styles.video}
        source={require("../assets/images/snow.mp4")}
        shouldPlay
        resizeMode="contain"
        isLooping
        resizeMode={"cover"}
      />
      <View style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "black", position: "absolute", top: 0, opacity: 0.2}} />
      {
        countDown ? (<CountdownCircleTimer
                                isPlaying={countDown}
                                duration={2}
                                strokeWidth={15}
                                size={220}
                                onComplete={() => setCountDown(false)}
                                strokeWidth={6}
                                trailStrokeWidth={1}
                                colors={"white"}
                                
                            >
                                {({ remainingTime, animatedColor }) => (
                                <Animated.Text style={{ color: "white" }}>
                                    <Text style={{fontSize: 50}}>{remainingTime}</Text>
                                </Animated.Text>
                                )}
                            </CountdownCircleTimer>) : 
                            <View style={{alignItems: "center", height: "100%", justifyContent: "center"}}>
                                <Text style={{color: "#fff", fontSize: 30, zIndex: 1, width: 300, textAlign: "center"}}>{inner}</Text>
                                <View style={{width: 300, height: 200, backgroundColor: "#fff", marginTop: 30, alignItems: "center", borderRadius: 20, opacity: 0.8, justifyContent: "center", flexDirection: "row"}}>
                                    <ScrollView 
                                        decelerationRate={0}
                                        horizontal
                                        snapToAlignment="center"
                                        snapToInterval={300}
                                        showsHorizontalScrollIndicator={false}
                                        onStartShouldSetResponder={() => true}
                                        style={{paddingTop: 0}}
                                        
                                    >
                                       {
                                           items.map(({id, data}) => {
                                               return <Package key={id} primer={data.primer} />
                                           })
                                       }
                                           
                                        
                                    </ScrollView>
                                    <AntDesign name="right" size={15} color="black" style={{paddingRight: 10}} />
                                </View>
                                <Pressable onPress={() => setCountDown(true)} style={{marginTop: 40, height: 80, width: 80, borderColor: "lightgrey", borderWidth: 2, borderRadius: 40, justifyContent: "center", alignItems: "center"}}>
                                    <MaterialCommunityIcons name="meditation" size={35} color="white" />
                                </Pressable>
                                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"} style={{position: "absolute", bottom: 10, justifyContent: "space-around", width: "90%", flexDirection: "row", alignItems: "center"}}>
                                    <TextInput value={input} onChangeText={(text) => setInput(text)} placeholderTextColor="white" placeholder={inner} style={{height: 55, width: 300, borderRadius: 40, borderColor: "white", borderWidth: 1, paddingLeft: 15, opacity: 0.8}} />
                                    <TouchableOpacity disabled={input === ""} onPress={addContent}>
                                        <FontAwesome name="send" size={24} color="white" style={{opacity: 0.8}} />
                                    </TouchableOpacity>
                                </KeyboardAvoidingView>
                            </View>
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