import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { ActivityIndicator, Button, Dimensions, FlatList, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Sound } from "expo-av/build/Audio/Sound"
import { AntDesign } from '@expo/vector-icons';
import Mindfulness from '../components/Mindfulness';
import { collection, doc, getDoc, onSnapshot } from '@firebase/firestore';
import { auth, db } from '../firebase';
import MindfulStory from '../components/MindfulStory';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Video, AVPlaybackStatus } from 'expo-av';
import Package from '../components/Package';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';



const MeditationPlay = ({navigation}) => {

    

    const [isPlaying, setIsPlaying] = useState(true);
    const [isPlayingTwo, setIsPlayingTwo] = useState(true);
    const [isPlayingThree, setIsPlayingThree] = useState(true);
    const [isPlayingFour, setIsPlayingFour] = useState(true);
    const [sound, setSound] = useState(null);
    const [soundTwo, setSoundTwo] = useState(null);
    const [soundThree, setSoundThree] = useState(null);
    const [soundFour, setSoundFour] = useState(null);
    const [durationTwo, setDurationTwo] = useState(null);
    const [durationThree, setDurationThree] = useState(null);
    const [durationFour, setDurationFour] = useState(null);
    const [duration, setDuration] = useState(null);
    const [positionTwo, setPositionTwo] = useState(null);
    const [position, setPosition] = useState(null);
    const [positionThree, setPositionThree] = useState(null);
    const [positionFour, setPositionFour] = useState(null);
    const [mind, setMind] = useState([]);
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [forth, setForth] = useState(false);

    const [play, setPlay] = useState(false);
    const [playTwo, setPlayTwo] = useState(false);
    const [playThree, setPlayThree] = useState(false);
    const [playFour, setPlayFour] = useState(false);
    const [song, setSong] = useState("");
    const [songTwo, setSongTwo] = useState("");
    const [songThree, setSongThree] = useState("");
    const [songFour, setSongFour] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingTwo, setLoadingTwo] = useState(false);
    const [loadingThree, setLoadingThree] = useState(false);
    const [loadingFour, setLoadingFour] = useState(false);
    const [index, setIndex] = useState(1);
    const [indexTwo, setIndexTwo] = useState(1);
    const [mindful, setMindful] = useState(false);
    const [mindfulTwo, setMindfulTwo] = useState(false);
    const [countDown, setCountDown] = useState(null);
    const [breathText, setBreathText] = useState("Take a deep breath");
    const [breath, setBreath] = useState(false);
    const [breathTwo, setBreathTwo] = useState(false);
    const video = React.useRef(null);
    const videoTwo = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [statusTwo, setStatusTwo] = React.useState({});
    const [show, setShow] = useState(true)
    const [showTwo, setShowTwo] = useState(true)
    const videoThree = React.useRef(null);
    const videoFour = React.useRef(null);
    const [rooms, setRooms] = useState([]);
    const [roomsTwo, setRoomsTwo] = useState([]);
    const [mute, setMute] = useState(false);
    const [muteTwo, setMuteTwo] = useState(false);
    const [voice, setVoice] = useState(true);
    const [voiceTwo, setVoiceTwo] = useState(true);

    const [range, setRange] = useState("50%");
    const [sliding, setSliding] = useState("Inactive")

    const [mood, setMood] = useState(true);
    const [moodText, setMoodText] = useState("");
    const [moodTextTwo, setMoodTextTwo] = useState("");

    const [youtube1, setYoutube1] = useState("");
    const [youtube2, setYoutube2] = useState("");
    const [youtube3, setYoutube3] = useState("");
    const [book1, setBook1] = useState("");
    const [book2, setBook2] = useState("");
    const [book3, setBook3] = useState("");
    const [link1, setLink1] = useState("");
    const [link2, setLink2] = useState("");
    const [link3, setLink3] = useState("");

    const [storyOne, setStoryOne] = useState([]);
    const [storyTwoo, setStoryTwoo] = useState([]);

    const [title1, setTitle1] = useState("");
    const [title2, setTitle2] = useState("");
    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");



    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])



    const onPlaybackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying)
        setDuration(status.durationMillis)
        setPosition(status.positionMillis)
    }

    const onPlaybackStatusUpdateTwo = (status) => {
      setIsPlayingTwo(status.isPlaying)
      setDurationTwo(status.durationMillis)
      setPositionTwo(status.positionMillis)
  }

    const onPlaybackStatusUpdateThree = (status) => {
      setIsPlayingThree(status.isPlaying)
      setDurationThree(status.durationMillis)
      setPositionThree(status.positionMillis)
    }

    const onPlaybackStatusUpdateFour = (status) => {
      setIsPlayingFour(status.isPlaying)
      setDurationFour(status.durationMillis)
      setPositionFour(status.positionMillis)
    }

    const playCurrentSong = async () => {
      setLoading(true);

         if (sound) {
             await sound.unloadAsync();
         }

         const { sound: newSound } = await Sound.createAsync(
            {uri: song},
             { shouldPlay: isPlaying },
             onPlaybackStatusUpdate
         )

         setSound(newSound)
         setFirst(!first);
    }

    const playCurrentSongTwo = async () => {
      setLoadingTwo(true);
      if (soundTwo) {
          await soundTwo.unloadAsync();
      }

      const { sound: newSound } = await Sound.createAsync(
         {uri: songTwo},
          { shouldPlay: isPlayingTwo },
          onPlaybackStatusUpdateTwo
      )

      setSoundTwo(newSound)
      setSecond(!second);
    }

    const playCurrentSongThree = async () => {
      setLoadingThree(true);
      if (soundThree) {
          await soundThree.unloadAsync();
      }

      const { sound: newSound } = await Sound.createAsync(
        {uri: songThree},
          { shouldPlay: isPlayingThree },
          onPlaybackStatusUpdateThree
      )

      setSoundThree(newSound)
      setThird(!third);
    }

    const playCurrentSongFour = async () => {
      setLoadingFour(true);
      if (soundFour) {
          await soundFour.unloadAsync();
      }

      const { sound: newSound } = await Sound.createAsync(
        {uri: songFour},
          { shouldPlay: isPlayingFour },
          onPlaybackStatusUpdateFour
      )

      setSoundFour(newSound)
      setForth(!forth);
    }

    

    const onPlayPausePressOne = async () => {
        if (!sound) {
            return;
        }
        if (isPlaying) {
             await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }

        setPlay(!play)
    }

    const onPlayPausePressTwo = async () => {
      if (!soundTwo) {
          return;
      }
      if (isPlayingTwo) {
           await soundTwo.pauseAsync();
      } else {
          await soundTwo.playAsync();
      }

      setPlayTwo(!playTwo)
  }

    const onPlayPausePressThree = async () => {
      if (!soundThree) {
          return;
      }
      if (isPlayingThree) {
          await soundThree.pauseAsync();
      } else {
          await soundThree.playAsync();
      }

      setPlayThree(!playThree)
    }


    const onPlayPausePressFour = async () => {
      if (!soundFour) {
          return;
      }
      if (isPlayingFour) {
          await soundFour.pauseAsync();
      } else {
          await soundFour.playAsync();
      }

      setPlayFour(!playFour)
    }


    const getProgress = () => {
      if (sound === null || duration === null || position === null) {
        return 0;
      }

      return (position / duration) * 100;
    }

    const getProgressTwo = () => {
      if (soundTwo === null || durationTwo === null || positionTwo === null) {
        return 0;
      }

      return (positionTwo / durationTwo) * 100;
    }

    const getProgressThree = () => {
      if (soundThree === null || durationThree === null || positionThree === null) {
        return 0;
      }

      return (positionThree / durationThree) * 100;
    }

    const getProgressFour = () => {
      if (soundFour === null || durationFour === null || positionFour === null) {
        return 0;
      }

      return (positionFour / durationFour) * 100;
    }

    useEffect(() => {
      const unsub = onSnapshot(collection(db, "mindfulness"),
      
      (snapshot) => setMind(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
      }))))

      return unsub;
  }, []);


  useEffect(() => {
      const blabla = async() => {
        const coinss = doc(db, "songs", "XaTpCr6euI4FIWRtAAa2");
        const coinSnap = await getDoc(coinss);
        
        setSong(coinSnap.data().song);
        setSongTwo(coinSnap.data().songTwo);
        setSongThree(coinSnap.data().songThree)
        setSongFour(coinSnap.data().songFour)
      }

      blabla();


        console.log(song);
  }, [])

  useEffect(() => {
    const blabla = async() => {
      const coinss = doc(db, "links", "kKOKPrlhu3qEj5LqflvN");
      const coinSnap = await getDoc(coinss);
      
      setYoutube1(coinSnap.data().youtube1);
      setYoutube2(coinSnap.data().youtube2);
      setYoutube3(coinSnap.data().youtube3);
      setBook1(coinSnap.data().book1);
      setBook2(coinSnap.data().book2);
      setBook3(coinSnap.data().book3);
      setLink1(coinSnap.data().link1)
      setLink2(coinSnap.data().link2)
      setLink3(coinSnap.data().link3)
      setMoodText(coinSnap.data().mood)
      setMoodTextTwo(coinSnap.data().mood2)
      setTitle1(coinSnap.data().title)
      setTitle2(coinSnap.data().title2)
      setDescription1(coinSnap.data().desc)
      setDescription2(coinSnap.data().desc2)
    }

    blabla();


      console.log(song);
}, [])
  


  const stopSong = () => {
    setFirst(false);
    sound.stopAsync();
    setPlay(true);
    setLoading(false);
  }

  const stopSongTwo = () => {
    setSecond(false);
    soundTwo.stopAsync();
    setPlayTwo(true);
    setLoadingTwo(false);
  }

  const stopSongThree = () => {
    setThird(false);
    soundThree.stopAsync();
    setPlayThree(true);
    setLoadingThree(false);
  }

  const stopSongForth = () => {
    setForth(false);
    soundFour.stopAsync();
    setPlayFour(true);
    setLoadingFour(false);
  }

  const firstStory = [{
    id: 1,
    neki: "Two monks were returning to the monastery in the evening. It had rained and there were puddles of water on the road sides. At one place a beautiful young woman was standing unable to walk across because of a puddle of water. The elder of the two monks lifted the woman, carried her across the river, placed her gently on the other side, and continued his way to the monastery.",
    button: "Continue >"
  },{
    id: 2,
    neki: "In the evening the younger monk came to the elder monk and said, “Sir, as monks, we cannot touch a woman?” The elder monk answered “Yes, brother.” Then the younger monk asks again, “But then Sir, how is that you lifted that woman on the roadside ?”",
    button: "Continue >"
  }, {
    id: 3,
    neki: "The elder monk smiled at him and replied, “Brother, I set her down on the other side of the river, why are you still carrying her?",
    button: "Finish"
  }]

  const secondStory = [{
    id: 1,
    neki: "A man goes to a Zen master and says, “I would like to move to this city. What do you think of the people here?” And the Zen master says, “What were the people like in your old city?” And the man says, “They were awful, mean, spiteful.” The Zen master says, “They are the same here. You shouldn’t move here.”",
    button: "Continue >"
  },{
    id: 2,
    neki: "Then another person goes to the Zen master and says, “I’d like to move to your city. What do you think of the people here?”",
    button: "Continue >"
  }, {
    id: 3,
    neki: "And the Zen master says, “What were the people like in your old city?” And the man says, “They were very nice people. Very smart. I enjoyed being around them.” And the Zen master says, “They are the same here. You will enjoy it here.”",
    button: "Finish"
  }]

  const nextIndex = () => {
    setBreath(true);
    animateBall();
    if (index === 3) {
      setMindful(false)
      setIndex(1)
    } else {
      setIndex(index + 1)
      refContainer.current.scrollToIndex({animated:true,index: index,viewPosition:0});
    }
    

    
  }

  const refContainer = useRef(null); 

  const taskAnimated = useRef(
    new Animated.Value(50),
    
).current;


const nextIndexTwo = () => {
  setBreathTwo(true);
  animateBall();
  if (indexTwo === 3) {
    setMindfulTwo(false)
    setIndexTwo(1)
  } else {
    setIndexTwo(indexTwo + 1)
    refContainer.current.scrollToIndex({animated:true,index: indexTwo,viewPosition:0});
  }
}

const animateBall = () => {
    Animated.timing(taskAnimated, {
        toValue: 180,
        duration: 4000,
        useNativeDriver: false
    }).start(() => {
      setCountDown(1)
      setBreathText("");
    })
    
    
}

const animateBallTwo = () => {
  setBreathText("Breath In");
  Animated.timing(taskAnimated, {
      toValue: 180,
      duration: 3000,
      useNativeDriver: false
  }).start(() => {
    setCountDown(countDown + 1)
    setBreathText("");
  })
  
  
}


const animateBallBack = () => {
    Animated.timing(taskAnimated, {
        toValue: 50,
        duration: 5000,
        useNativeDriver: false
    }).start(() => {
      if (countDown === 1) {
        setBreath(false);
        setBreathText("Take a deep breath")
      } else {
        animateBallTwo()
      }
     
    })
    
    
}

const animateBallBackTwo = () => {
  Animated.timing(taskAnimated, {
      toValue: 50,
      duration: 5000,
      useNativeDriver: false
  }).start(() => {
    if (countDown === 1) {
      setBreathTwo(false);
      setBreathText("Take a deep breath")
    } else {
      animateBallTwo()
    }
   
  })
  
  
}

const taskAnimation = {
    height: taskAnimated,
    width: taskAnimated
}


const backAnimation = () => {
  animateBallBack();
  setCountDown(null);
  setBreathText("Breath Out");
  
}

const backAnimationTwo = () => {
  animateBallBackTwo();
  setCountDown(null);
  setBreathText("Breath Out");
  
}

const story = () =>{
  setMindful(true);
  setBreath(true);
  animateBall();
}

const storyTwo = () =>{
  setMindfulTwo(true);
  setBreathTwo(true);
  animateBall();
}


useEffect(
  () => 
  onSnapshot(collection(db, "rooms", "0LEq84ss8LKWDOpWFMdZ", "room"),
  (snapshot) => setRooms(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }))))

, []);

useEffect(
  () => 
  onSnapshot(collection(db, "rooms", "bGgC5VJJq98Hz2Tq1d75", "room"),
  (snapshot) => setRoomsTwo(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }))))

, []);


const muteUnmute = () => {
  setMute(!mute);
  setVoice(!voice);
}

const muteUnmuteTwo = () => {
  setMuteTwo(!muteTwo);
  setVoiceTwo(!voiceTwo);
}

useEffect(
  () => 
  onSnapshot(collection(db, "story"),
  (snapshot) => setStoryOne(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }))))

, []);


useEffect(
  () => 
  onSnapshot(collection(db, "story2"),
  (snapshot) => setStoryTwoo(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }))))

, []);


    return (
        <View>
          <ScrollView 
          decelerationRate={0}
          snapToAlignment="center"
          snapToInterval={Dimensions.get("screen").height}
          showsVerticalScrollIndicator={false}
        >
          <View style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center", backgroundColor: "#E98C4F"}}>
                
                <View style={{alignItems: "center", position: "absolute", top: 150}}>
                  <Text style={{color: "#fff", fontSize: 30, fontWeight: "400"}}>Happy</Text>
                  <Text style={{color: "#fff", fontSize: 22, fontWeight: "200", marginTop: 20, textAlign: "center", width: "70%"}}>"Beauty is everywhere. You only have to see it."</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Pressable onPress={() => Linking.openURL(youtube1)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
                    <AntDesign name="youtube" size={40} color="red" />
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL(book1)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
                   <Entypo name="book" size={40} color="green" />
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL(link1)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
                   <AntDesign name="link" size={40} color="black" />
                  </Pressable>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", position: "absolute", bottom: 80, width: "80%", justifyContent: "space-around"}}>  
                  
                  <TouchableOpacity onPress={playCurrentSong} style={{height: 60, width: 230, backgroundColor: "#cf631d", borderRadius: 10, justifyContent: "center", alignItems: "center", borderColor: "#fff"}}>
                    {
                      loading ? (
                        <ActivityIndicator color={"#fff"} size="small" />
                      ) : (
                        <Text style={{fontSize: 20, fontWeight: "500", color: "white"}}>Meditate</Text>
                      )
                    }
                      
                  </TouchableOpacity>
                 
                </View>
                <Text style={{alignSelf: "center", position: "absolute", bottom: 30, color: "#fff", fontWeight: "300"}}>Swipe up</Text>
                <AntDesign name="down" size={20} color="white" style={{alignSelf: "center", position: "absolute", bottom: 10}} />
            </View>
         
            {/*{
              mind.map(({id, data}) => {
                return <Mindfulness image={data.image} day={data.day} name={data.name} />
              })
            }
          <Mindfulness progress={getProgress()} playPause={playCurrentSong} />*/}
          {
              mindful ? (
                <FlatList 
                  ref={refContainer}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  data={storyOne}
                  renderItem={({ item, index }) => (<MindfulStory border={"#7381F3"} color={"#7381F3"} image={require("../assets/images/walk.png")} desc={item.data.desc} onPress={nextIndex} next={item.data.button} />)}
                  decelerationRate={0}
                  snapToAlignment="center"
                  snapToInterval={Dimensions.get("screen").width}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              ) : (
                <View style={{justifyContent: "center", alignItems: "center", height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, padding: 20, backgroundColor: "#fff"}}>
                  <Image source={require("../assets/images/nature.png")} style={{height: 220, width: 203}} />
                  <Text style={{fontSize: 30, fontWeight: "bold", marginTop: 40}}>{title1}</Text>
                  <Text style={{fontSize: 18, color: "grey", marginTop: 15, textAlign: "center"}}>{description1}</Text>
                  <View style={{position: "absolute", bottom: 20}}>
                    <TouchableOpacity onPress={story} style={{height: 60, width: 150, backgroundColor: "#7381F3", borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 10}}>
                      <Text style={{color: "#fff", fontSize: 15}}>Be mindful</Text>
                    </TouchableOpacity>
                    <AntDesign name="down" size={20} color="black" style={{alignSelf: "center"}} />
                  </View>
                </View>
              )
            }
            <View style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center", backgroundColor: "#2cb4e6"}}>
              {
                mood ? (
                  <>
              <AntDesign name="smileo" size={80} color="white" style={{}} />
              <Text style={{color: "#fff", fontSize: 30, textAlign: "center", marginTop: 70, fontWeight: "500", width: "90%"}}>Hey, {auth.currentUser.displayName}. How are you today?</Text>
              
              <Slider 
                style={{height: 40, width: 250, marginTop: 50}}
                
              />
              <TouchableOpacity onPress={() => setMood(false)} style={{height: 60, width: 200, backgroundColor: "#248cb3", justifyContent: "center", alignItems: "center", borderRadius: 30, marginTop: 0, position: "absolute", bottom: 50}}>
                <Text style={{color: "#fff", fontSize: 18}}>Continue</Text>
              </TouchableOpacity> 
              </> ) : (
                <Text style={{color: "#fff", fontSize: 20, paddingHorizontal: 20, textAlign: "center"}}>{moodText}</Text>
              )
              }
               <AntDesign name="down" size={20} color="white" style={{alignSelf: "center", position: "absolute", bottom: 20}} />
            </View>
            <View style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center", backgroundColor: "#8DB370"}}>
                
                <View style={{alignItems: "center", position: "absolute", top: 150}}>
                  <Text style={{color: "#fff", fontSize: 30, fontWeight: "400"}}>Peace</Text>
                  <Text style={{color: "#fff", fontSize: 22, fontWeight: "200", marginTop: 20}}>"Peace begins with a smile."</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Pressable onPress={() => Linking.openURL(youtube2)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
                    <AntDesign name="youtube" size={40} color="red" />
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL(book2)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
                   <Entypo name="book" size={40} color="green" />
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL(link2)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
                   <AntDesign name="link" size={40} color="black" />
                  </Pressable>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", position: "absolute", bottom: 50, width: "80%", justifyContent: "space-around"}}>  
                  <TouchableOpacity onPress={playCurrentSongFour} style={{height: 60, width: 230, backgroundColor: "#547838", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                      {
                        loadingFour ? (
                          <ActivityIndicator color={"#fff"} size="small" />
                        ) : (
                          <Text style={{fontSize: 20, fontWeight: "500", color: "white"}}>Meditate</Text>
                        )
                      }
                  </TouchableOpacity>
                </View>
                <AntDesign name="down" size={20} color="white" style={{alignSelf: "center", position: "absolute", bottom: 20}} />
              </View>
            
            {/*
            <Pressable onPress={() =>
                  status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                } style={{justifyContent: "center", alignItems: "center"}}>
              <Video
                ref={video}
                style={styles.video}
                source={require("../assets/images/sadhguru.mp4")}
                
                resizeMode="contain"
                isLooping
                resizeMode={"cover"}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
              
              
            </Pressable>
            */}
            {
              mindfulTwo ? (
                <FlatList 
                  ref={refContainer}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  data={storyTwoo}
                  renderItem={({ item, index }) => (<MindfulStory border={"#FF8D8D"} color={"#FF8D8D"} image={require("../assets/images/walkTo.png")} desc={item.data.desc} onPress={nextIndexTwo} next={item.data.button} />)}
                  decelerationRate={0}
                  snapToAlignment="center"
                  snapToInterval={Dimensions.get("screen").width}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              ) : (
                <View style={{justifyContent: "center", alignItems: "center", height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, padding: 20, backgroundColor: "#fff"}}>
                  <Image source={require("../assets/images/tree.png")} style={{height: 220, width: 322}} />
                  <Text style={{fontSize: 30, fontWeight: "bold", marginTop: 40, textAlign: "center"}}>{title2}</Text>
                  <Text style={{fontSize: 18, color: "grey", marginTop: 15, textAlign: "center"}}>{description2}</Text>
                  <View style={{position: "absolute", bottom: 20}}>
                    <TouchableOpacity onPress={storyTwo} style={{height: 60, width: 150, backgroundColor: "#FF8D8D", borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 10}}>
                      <Text style={{color: "#fff", fontSize: 15}}>Be mindful</Text>
                    </TouchableOpacity>
                    <AntDesign name="down" size={20} color="black" style={{alignSelf: "center"}} />
                  </View>
                </View>
              )
            }
            <View style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center", backgroundColor: "#8576CC"}}>
                
                <View style={{alignItems: "center", position: "absolute", top: 150}}>
                  <Text style={{color: "#fff", fontSize: 30, fontWeight: "400"}}>Personal Growth</Text>
                  <Text style={{color: "#fff", fontSize: 22, fontWeight: "200", marginTop: 20, textAlign: "center"}}>"Work on you, for you."</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Pressable onPress={() => Linking.openURL(youtube3)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5}}>
                    <AntDesign name="youtube" size={40} color="red" />
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL(book3)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5}}>
                   <Entypo name="book" size={40} color="green" />
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL(link3)} style={{height: 100, width: 100, backgroundColor: "#fff", borderRadius: 50, marginHorizontal: 5, justifyContent: "center", alignItems: "center", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5}}>
                   <AntDesign name="link" size={40} color="black" />
                  </Pressable>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", position: "absolute", bottom: 50, width: "80%", justifyContent: "space-around"}}>  
                  
                  <TouchableOpacity onPress={playCurrentSongTwo} style={{height: 60, width: 230, backgroundColor: "#4c3f8a", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    {
                      loadingTwo ? (
                        <ActivityIndicator color={"#fff"} size="small" />
                      ) : (
                        <Text style={{fontSize: 20, fontWeight: "500", color: "white"}}>Meditate</Text>
                      )
                    }
                  </TouchableOpacity>
                 
                </View>
                
            </View>
           {/*}
            <ImageBackground source={require("../assets/images/dez.jpeg")} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center"}}>
                
                <View style={{alignItems: "center", position: "absolute", top: 200}}>
                  <Text style={{color: "#fff", fontSize: 30, fontWeight: "400"}}>Focus</Text>
                  <Text style={{color: "#fff", fontSize: 22, fontWeight: "200", marginTop: 20, textAlign: "center", width: "80%"}}>"What you stay focused on will grow."</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", position: "absolute", bottom: 50, width: "80%", justifyContent: "space-around"}}>  
                 
                <TouchableOpacity onPress={playCurrentSongThree} style={{height: 60, width: 230, backgroundColor: "#A5A5A6", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    {
                      loadingThree ? (
                        <ActivityIndicator color={"#fff"} size="small" />
                      ) : (
                        <Text style={{fontSize: 20, fontWeight: "500", color: "white"}}>Meditate</Text>
                      )
                    }
                  </TouchableOpacity>
                  
                </View>
                  </ImageBackground>*/}
            
            
            
            
          </ScrollView>
          <View style={{position: "absolute", top: 10, left: 10}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{position: "absolute", top: 50, left: 20}}>
                  <Ionicons name="chevron-back-circle" size={50} color="lightgrey" />
                </TouchableOpacity>
          </View>
          <Modal
            visible={first}
            animationType={"slide"}
            statusBarTranslucent={true}
          >
            <Pressable onPress={stopSong} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#E98C4F", justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity onPress={onPlayPausePressOne} style={{zIndex: 1}}>
                <Ionicons name={ play ? "play" : "pause"} size={70} color="#fff" style={{marginTop: 50}} />
              </TouchableOpacity>
              <View style={[styles.progressFirst, { width: `${getProgress()}%`}]} />
            </Pressable>
          </Modal>

          <Modal
            visible={second}
            animationType={"slide"}
            statusBarTranslucent={true}
          >
            <Pressable onPress={stopSongTwo} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#8576CC", justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity onPress={onPlayPausePressTwo} style={{zIndex: 1}}>
                <Ionicons name={playTwo ? "play" : "pause"} size={70} color="#fff" style={{marginTop: 50}} />
              </TouchableOpacity>
              <View style={[styles.progressSecond, { width: `${getProgressTwo()}%`}]} />
            </Pressable>
          </Modal>

          <Modal
            visible={third}
            animationType={"slide"}
            statusBarTranslucent={true}
          >
            <Pressable onPress={stopSongThree} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#A5A5A6", justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity onPress={onPlayPausePressThree} style={{zIndex: 1}}>
                <Ionicons name={playThree ? "play" : "pause"} size={70} color="#fff" style={{marginTop: 50}} />
              </TouchableOpacity>
              <View style={[styles.progressThird, { width: `${getProgressThree()}%`}]} />
            </Pressable>
          </Modal>

          <Modal
            visible={forth}
            animationType={"slide"}
            statusBarTranslucent={true}
          >
            <Pressable onPress={stopSongForth} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#8DB370", justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity onPress={onPlayPausePressFour} style={{zIndex: 1}}>
                <Ionicons name={playFour ? "play" : "pause"} size={70} color="#fff" style={{marginTop: 50}} />
              </TouchableOpacity>
              <View style={[styles.progressForth, { width: `${getProgressFour()}%`}]} />
            </Pressable>
          </Modal>
          <Modal
            visible={breath}
            animationType={"none"}
          >
            <View style={{alignItems: "center", backgroundColor: "#DBDFFF", flex: 1, position: "absolute", top: 0, width: Dimensions.get("screen").width, alignSelf: "center", height: Dimensions.get("screen").height , justifyContent: "center"}}>
                            
                            
                            <Text style={{position: "absolute", top: 180, fontSize: 30, fontWeight: "500"}}>{breathText}</Text>
                            
                            <Animated.View style={[styles.circle, taskAnimation]}></Animated.View>
                            
                            {
                                countDown ? (<CountdownCircleTimer
                                isPlaying={countDown}
                                duration={3}
                                strokeWidth={15}
                                size={220}
                                onComplete={() => backAnimation()}
                                
                                colors={"#FF8D8D"}
                            >
                                {({ remainingTime, animatedColor }) => (
                                <Animated.Text style={{ color: "white" }}>
                                    <Text style={{fontSize: 20}}>Hold</Text>
                                </Animated.Text>
                                )}
                            </CountdownCircleTimer>) : null
                            }
                            <Text style={{position: "absolute", bottom: 100, fontSize: 20}}></Text>
            </View>
          </Modal>
          <Modal
            visible={breathTwo}
            animationType={"none"}
          >
            <View style={{alignItems: "center", backgroundColor: "#FFEBEB", flex: 1, position: "absolute", top: 0, width: Dimensions.get("screen").width, alignSelf: "center", height: Dimensions.get("screen").height , justifyContent: "center"}}>
                            
                            
                            <Text style={{position: "absolute", top: 180, fontSize: 30, fontWeight: "500"}}>{breathText}</Text>
                            
                            <Animated.View style={[styles.circleTwo, taskAnimation]}></Animated.View>
                            
                            {
                                countDown ? (<CountdownCircleTimer
                                isPlaying={countDown}
                                duration={3}
                                strokeWidth={15}
                                size={220}
                                onComplete={() => backAnimationTwo()}
                                
                                colors={"#7381F3"}
                            >
                                {({ remainingTime, animatedColor }) => (
                                <Animated.Text style={{ color: "white" }}>
                                    <Text style={{fontSize: 20}}>Hold</Text>
                                </Animated.Text>
                                )}
                            </CountdownCircleTimer>) : null
                            }
                            <Text style={{position: "absolute", bottom: 100, fontSize: 20}}></Text>
            </View>
          </Modal>
        </View>
        

    )
}

export default MeditationPlay

const styles = StyleSheet.create({
  progressFirst: {
    height: Dimensions.get("screen").height,
    backgroundColor: "#ff9b61",
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0,
  },

  progressSecond: {
    height: Dimensions.get("screen").height,
    backgroundColor: "#bfb3ff",
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0,
  },

  progressThird: {
    height: Dimensions.get("screen").height,
    backgroundColor: "#dbdbdb",
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0,
  },

  progressForth: {
    height: Dimensions.get("screen").height,
    backgroundColor: "#b6e394",
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0,
  },

  circle: {
    backgroundColor: "#7381F3", 
    borderRadius: 200,
    position: "absolute"
  },

  circleTwo: {
    backgroundColor: "#FF8D8D", 
    borderRadius: 200,
    position: "absolute"
  },

  video: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    
},

videoTwo: {
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