import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, TextInput, KeyboardAvoidingView, Animated, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import MindfulCard from '../components/MindfulCard';
import { addDoc, collection, deleteDoc, doc, documentId, getDoc, getDocs, onSnapshot, query, updateDoc, where } from '@firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import MindfulCardBonus from '../components/MindfulCardBonus';
import * as Linking from 'expo-linking';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import HyperLink from 'react-native-hyperlink';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Room from '../components/Room';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Sound } from "expo-av/build/Audio/Sound"


const HomeScreen = ({navigation, route}) => {

    const [modal, setModal] = useState(false);
    const [input, setInput] = useState("");
    const [clicked, setClicked] = useState(false);
    const [clickedTwo, setClickedTwo] = useState(false);
    const [linked, setLinked] = useState(false);
    const [cards, setCards] = useState([]);
    const [myCards, setMyCards] = useState([]);
    const [linkSend, setLinkSend] = useState(false);
    const [meditationPressed, setMeditationPressed] = useState(true);
    const [description, setDescription] = useState("");
    const [descriptionTwo, setDescriptionTwo] = useState("");
    const [descriptionThree, setDescriptionThree] = useState("");
    const [descriptionFour, setDescriptionFour] = useState("");
    const [modalTwo, setModalTwo] = useState(false);
    const [modalThree, setModalThree] = useState(false);
    const [modalFour, setModalFour] = useState(false);
    const [modalFive, setModalFive] = useState(false);
    const [modalSix, setModalSix] = useState(false);
    const [modalSeven, setModalSeven] = useState(false);
    const [timer, setTimer] = useState(false);
    const [countTimer, setCountTimer] = useState(false);
    const [countDown, setCountDown] = useState(null);
    const [breathText, setBreathText] = useState("Take a deep breath");
    const [reload, setReload] = useState(false);
    const [friends, setFriends] = useState([]);
    const [send, setSend] = useState(false);
    const [ime, setIme] = useState("");
    const [welcome, setWelcome] = useState("");
    const [daily, setDaily] = useState([]);
    const [modalDaily, setModalDaily] = useState(false);
    const [linkec, setLinkec] = useState("");
    const [linkecDva, setLinkecDva] = useState("");
    const [linkecTri, setLinkecTri] = useState("");
    const [date, setDate] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [rooms, setRooms] = useState([]);
    const [help, setHelp] = useState([]);
    const [stranger, setStranger] = useState(false);
    const [getId, setGetId] = useState("");
    const [getIdTwo, setGetIdTwo] = useState("");
    const [getIdThree, setGetIdThree] = useState("");
    const [getIdFour, setGetIdFour] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [disabledTwo, setDisabledTwo] = useState(false);
    const [disabledThree, setDisabledThree] = useState(false);
    const [disabledFour, setDisabledFour] = useState(false);
    const [explore, setExplore] = useState(false);
    const [nameOne, setNameOne] = useState(false);
    const [nameTwo, setNameTwo] = useState(false);
    const [nameThree, setNameThree] = useState(false);
    const [nameFour, setNameFour] = useState(false);

    const [one, setOne] = useState(1);
    const [getNumber, setGetNumber] = useState("");
    const [zero, setZero] = useState(0);
    const [link, setLink] = useState(false);

    const [image, setImage] = useState(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [sound, setSound] = useState(null);
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState(null);
    
    const [song, setSong] = useState("");
    const [songTwo, setSongTwo] = useState("");
    const [songThree, setSongThree] = useState("");
    const [songFour, setSongFour] = useState("");

    const [play, setPlay] = useState(false);

    const [loading, setLoading] = useState(false);

    const [modalVoice, setModalVoice] = useState(false);
    const [voiceColor, setVoiceColor] = useState(false);

    const colors = ["#ABD7FF", "#FFABAB", "#FFD3AB"]

    const addCard = () => {
        addDoc(collection(db, "users", auth.currentUser.uid, "myCards"), {
            color: colors[Math.floor(Math.random() * colors.length)],
            desc: input,
            image: "https://firebasestorage.googleapis.com/v0/b/mindfulfriend-9fe90.appspot.com/o/LogoMakr-8Og6r3.png?alt=media&token=a243013e-921c-4baf-abdb-6dc28b27d65d",
            meditate: true,
            ime: "Myself"
       });

       setReload(!reload);

       setInput(null);
       setModal(false);
       setLinked(false);
       setLinkSend(false);
       setClickedTwo(false);
       setMeditationPressed(false);
       setSend(false);
    }

    const modalSetting = () => {
        setModal(false);
        setLinked(false);
        setClicked(false);
        setClickedTwo(false);
        setLinkSend(false);
        
        setInput(null);
        setSend(false);
    }



    const getMessage = async (idd) => {
        setModalTwo(true);

        const message = doc(db, "users", auth.currentUser.uid, "myCards", idd);
        const messageSnap = await getDoc(message);
        
        setDescription(messageSnap.data().desc);
        setIme(messageSnap.data().ime)
        console.log(messageSnap.data().desc)

        const deleteMessage = await deleteDoc(doc(db, "users", auth.currentUser.uid, "myCards", idd));
    }

    const getLink = async (idd) => {
        const link = doc(db, "users", auth.currentUser.uid, "myCards", idd);
        const linkSnap = await getDoc(link);
        
        Linking.openURL(linkSnap.data().desc);
        console.log(linkSnap.data().desc)

        await deleteDoc(doc(db, "users", auth.currentUser.uid, "myCards", idd));
    }

    const getMeditation = async (idd) => {
        setCountTimer(true);
        setModalThree(true);
        setTimer(true);
        animateBall();
        setReload(!reload)

        const meditate = doc(db, "users", auth.currentUser.uid, "myCards", idd);
        const meditateGet = await getDoc(meditate);
        
        setDescription(meditateGet.data().desc);
        setIme(meditateGet.data().ime)
        console.log(meditateGet.data().desc)

        await deleteDoc(doc(db, "users", auth.currentUser.uid, "myCards", idd));
    }

    const getMessageTwo = async (id) => {
        setModalTwo(true);
        addDoc(collection(db, "users", auth.currentUser.uid, "looked"), {
            name: id
        })

        const message = doc(db, "cards", id);
        const messageGet = await getDoc(message);
        
        setDescription(messageGet.data().desc);
        setIme(messageGet.data().ime)
        setWelcome(messageGet.data().welcome)
        console.log(messageGet.data().desc)

        setReload(!reload)
    }

    const getLinkTwo = async (id) => {
        const link = doc(db, "cards", id);
        const linkGet = await getDoc(link);

        addDoc(collection(db, "users", auth.currentUser.uid, "looked"), {
            name: id
        })
        
        Linking.openURL(linkGet.data().desc);
        console.log(linkGet.data().desc)

        setReload(!reload)
    }

    const getMeditationTwo = async (id) => {
        setCountTimer(true);
        setModalThree(true);
        setTimer(true);
        animateBall();
        addDoc(collection(db, "users", auth.currentUser.uid, "looked"), {
            name: id
        })

        const meditate = doc(db, "cards", id);
        const meditateGet = await getDoc(meditate);
        
        setDescription(meditateGet.data().desc);
        setIme(meditateGet.data().ime)
        console.log(meditateGet.data().desc)

        setReload(!reload)
    }

    const getMeditationThree = async (id) => {
        setCountTimer(true);
        setModalDaily(true);
        setTimer(true);
        animateBall();
        

        const meditate = doc(db, "daily", id);
        const meditateGet = await getDoc(meditate);
        
        setDescription(meditateGet.data().desc);
        setDescriptionTwo(meditateGet.data().descTwo);
        setDescriptionThree(meditateGet.data().descThree);
        setDescriptionFour(meditateGet.data().descFour);
        setLinkec(meditateGet.data().link);
        setLinkecDva(meditateGet.data().linkTwo);
        setLinkecTri(meditateGet.data().linkThree);
        setIme(meditateGet.data().team)
        console.log(meditateGet.data().desc)

        setReload(!reload)
    }


    const taskAnimated = useRef(
        new Animated.Value(50),
        
    ).current;
    
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
            setTimer(false)
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


    useEffect(() => {
        let unsub;

        const fetchCards = async() => {
            const passes = await getDocs(collection(db, "users", auth.currentUser.uid, "looked")).then(
                (snapshot) => snapshot.docs.map((doc) => doc.data().name)
            );

            const passedUserIds = passes.length > 0 ? passes : ["test"];

            console.log([...passedUserIds]);

            unsub = onSnapshot(
                query(
                    collection(db, "cards"),
                    where(documentId(), "not-in", [...passedUserIds])
                ),
                (snapshot) => {
                    setCards(
                        snapshot.docs
                       
                        .map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    );
                }
            );
        };

        

        fetchCards();
        return unsub;
    }, [db, reload]);
    


    useEffect(
        () => 
        onSnapshot(collection(db, "users", auth.currentUser.uid, "myCards"),
        
        (snapshot) => setMyCards(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

    , [db, reload]);

    useEffect(
        () => 
        onSnapshot(collection(db, "users", auth.currentUser.uid, "friends"),
        
        (snapshot) => setFriends(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

    , []);

    
    useEffect(
        () => 
        onSnapshot(collection(db, "daily"),
        (snapshot) => setDaily(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

    , []);


    const sendToFriend = (index, name) => {
        addDoc(collection(db, "users", index, "myCards"), {
            meditate: true,
            desc: input,
            ime: auth.currentUser.displayName,
            color: colors[Math.floor(Math.random() * colors.length)],
        })

        setSend(name);
    }

    const goToInvite = () => {
        setModal(false);
        navigation.navigate("Invite");
    }

    const goToInviteTwo = () => {
        setModalTwo(false);
        navigation.navigate("Invite");
    }

    const goToMeditate = () => {
        setModalTwo(false);
        navigation.navigate("Meditation");
    }


    useEffect(
        () => 
        onSnapshot(collection(db, "rooms"),
        (snapshot) => setRooms(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

    , []);

    useEffect(
        () => 
        onSnapshot(collection(db, "users"),
        
        (snapshot) => setHelp(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

    , []);

    const imagess = ["https://firebasestorage.googleapis.com/v0/b/mindfulfriend-9fe90.appspot.com/o/grup.png?alt=media&token=73907862-447e-44e4-afa9-144bf4d0005e", "https://firebasestorage.googleapis.com/v0/b/mindfulfriend-9fe90.appspot.com/o/avatarGroup.png?alt=media&token=4dc7848e-850a-48fb-a734-8a31f4b78f4b"]

    const sendMindfulness = async () => {
        const meditate = doc(db, "stranger", "o1mWlrUg11JVWOtse6cK");
        const meditateGet = await getDoc(meditate);
        
        setGetId(meditateGet.data().id);
        setGetIdTwo(meditateGet.data().idTwo);
        setGetIdThree(meditateGet.data().idThree);
        setGetIdFour(meditateGet.data().idFour);
        setNameOne(meditateGet.data().name);
        setNameTwo(meditateGet.data().nameTwo);
        setNameThree(meditateGet.data().nameThree);
        setNameFour(meditateGet.data().nameFour);

        setModal(true);
    }

    const sendStranger = async() => {
        {/*const docRef = doc(db, "users", getId);
        const docSnap = await getDoc(docRef);

        if (docSnap.data().count) {
            updateDoc(doc(db, "users", getId), {
                count: docSnap.data().count + one
                });
        } else {
        // doc.data() will be undefined in this case
            updateDoc(doc(db, "users", getId), {
                    count: one
            });
        }

        

        // Set the "capital" field of the city 'DC'
        */}

        addDoc(collection(db, "users", getId, "love"), {
        });

       setDisabled(true);

       Alert.alert("You´ve sent a mindfulness reminder to a stranger. Thank you for being kind ❤️")
    }

    const sendStrangerTwo = () => {
        addDoc(collection(db, "users", getIdTwo, "love"), {
       });

       setDisabledTwo(true);

       Alert.alert("You´ve sent a mindfulness reminder to a stranger. Thank you for being kind ❤️")
    }

    const sendStrangerThree = () => {
        addDoc(collection(db, "users", getIdThree, "love"), {
        });

       setDisabledThree(true);

       Alert.alert("You´ve sent a mindfulness reminder to a stranger. Thank you for being kind ❤️")
    }

    const sendStrangerFour = () => {
        addDoc(collection(db, "users", getIdFour, "love"), {
        });

       setDisabledFour(true);

       Alert.alert("You´ve sent a mindfulness reminder to a stranger. Thank you for being kind ❤️")
    }


    


    const openMindfulness = () => {
        setCountTimer(true);
        setModalFour(true);
        setTimer(true);
        animateBall();
        setReload(!reload)

        
    }

    const selfImprove = () => {
        setModalFive(false);
        setLink(false);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }        
      };


    const exitPhoto = () => {
        setModalSix(false);
        setImage(null);
    }


    const uploadImage = () => {
        Alert.alert("Photo has been uploaded")

        setImage(null);
    }

    useEffect(() => {
        const querySnapshot = getDocs(collection(db, "users", auth.currentUser.uid, "love"))
        .then((querySnapshot) => {
            return setGetNumber(querySnapshot.size)
        })

        
    }, [])


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
            const meditate = doc(db, "stranger", "o1mWlrUg11JVWOtse6cK");
            const meditateGet = await getDoc(meditate);
            
            setGetId(meditateGet.data().id);
            setGetIdTwo(meditateGet.data().idTwo);
            setGetIdThree(meditateGet.data().idThree);
            setGetIdFour(meditateGet.data().idFour);
            setNameOne(meditateGet.data().name);
            setNameTwo(meditateGet.data().nameTwo);
            setNameThree(meditateGet.data().nameThree);
            setNameFour(meditateGet.data().nameFour);
        }
  
        blabla();
        
  
    }, [])

    

    const onPlaybackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying)
        setDuration(status.durationMillis)
        setPosition(status.positionMillis)
    }

    const playCurrentSong = async () => {
            setLoading(true);
  
           if (sound) {
               await sound.unloadAsync();
           }
  
           const { sound: newSound } = await Sound.createAsync(
              {uri: allSongs[Math.floor(Math.random() * allSongs.length)]},
               { shouldPlay: isPlaying },
               onPlaybackStatusUpdate
           )
  
           setSound(newSound)
           setModalSeven(true);
      }

      const stopSong = () => {
        setModalSeven(false);
        sound.stopAsync();
        setPlay(true);
        setLoading(false);
      }

    const allSongs = [song, songTwo, songThree, songFour]

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
    

    const getProgress = () => {
        if (sound === null || duration === null || position === null) {
          return 0;
        }
  
        return (position / duration) * 100;
      }

  return (
    <ImageBackground source={require("../assets/images/background.png")} style={{paddingTop: 40, paddingLeft: 0, flex: 1, paddingLeft: 0}} resizeMode="cover">
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 0.3, borderBottomColor: "#99caf7", paddingBottom: 15}}>
        <View style={{flexDirection: "row", alignItems: "center", paddingLeft: 30}}>
            <Image source={require("../assets/images/logo.png")} style={{height: 50, width: 55, marginLeft: 0}} />
            <Text style={{marginLeft: 10, color: "#fff", fontSize: 20}}>Mindful Place</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Invite")}> 
            <MaterialIcons name="group-add" size={30} color="white" style={{paddingRight: 30}} />
        </TouchableOpacity>
      </View>
      <View style={{height: "80%"}}>
        
        <ScrollView style={{marginTop: 0, paddingLeft: 30}}>
            <Text style={{marginTop: 20, color: "#fff", textTransform: "uppercase", fontWeight: "600", fontSize: 16}}>Mindful reminders</Text>
            <ScrollView horizontal style={{marginTop: 0, height: 110, width: "100%", marginTop: 10}} showsHorizontalScrollIndicator={false}>
                {
                    getNumber > 0 ? (
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity onPress={openMindfulness} style={{height: 80, width: 80, backgroundColor: "#ABD7FF", borderRadius: 40, marginTop: 0, flexDirection: "row", alignItems: "center", borderColor: "#499ae3", marginHorizontal: 10, justifyContent: "center"}}>
                                <Text style={{marginTop: 8, fontSize: 40}}>❤️</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
                
                {
                    cards.map(({id, data}) => {
                        return <MindfulCard onPress={() => getMessageTwo(id)} key={id} id={id} color={"#0088ff"} desc={"START HERE"} image={"https://firebasestorage.googleapis.com/v0/b/mindfulfriend-9fe90.appspot.com/o/LogoMakr-8Og6r3.png?alt=media&token=a243013e-921c-4baf-abdb-6dc28b27d65d"}/>
                    })
                }

                {
                    daily.map(({id, data}) => {
                        return <MindfulCard onPress={() => getMeditationThree(id)} key={id} id={id} color={"#ABD7FF"} desc={data.ime} image={"https://firebasestorage.googleapis.com/v0/b/mindfulfriend-9fe90.appspot.com/o/LogoMakr.png?alt=media&token=30b91252-92fa-400b-a1ed-ecfdb555da47"} />
                    })
                }
                
                {
                    myCards.map(({id, data}) => {
                        return <MindfulCard onPress={() => getMeditation(id)} key={id} id={id} color={"#ABD7FF"} desc={data.ime} image={"https://firebasestorage.googleapis.com/v0/b/mindfulfriend-9fe90.appspot.com/o/LogoMakr.png?alt=media&token=30b91252-92fa-400b-a1ed-ecfdb555da47"} />
                    })
                }
            </ScrollView>
            <Text style={{marginTop: 20, color: "#fff", fontWeight: "600", fontSize: 16}}>MINDFUL ROOMS</Text>
            

            
            {/*
            <Room onPress={sendMindfulness} color={"#FFABAB"} title={"Send mindfulness reminder to a stranger"} music={"EVERYBODY NEEDS A FRIEND ☺️"} />
            <Room onPress={() => setModalFive(true)} color={"#FFD3AB"} title={"Help with someone´s self-improvement"} music={"GROW TOGETHER 🌱"} />
            <Room onPress={() => setModalSix(true)} color={"#ABD7FF"} title={"Share mindful locations with others"} music={"EXPLORE RELAXING PLACES ❤️"} />
            <Room onPress={() => navigation.navigate("Rooms")} color={"#ABD7FF"} title={"Share mindful locations with others"} music={"EXPLORE RELAXING PLACES ❤️"} />
            */}
            
            {
                rooms.map(({id, data}) => {
                    return <Room onPress={() => navigation.navigate(data.screen, {id})} key={id} title={data.inner} color={data.color} music={data.music} />
                })
            }
            
            <View style={{height: 50}} />
        </ScrollView>
      </View>
      <View style={{position: "absolute", bottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", width: Dimensions.get("screen").width}}>
          <Pressable onPress={() => navigation.navigate("Meditation")} style={{backgroundColor: "#005FA4", height: 60, width: "70%", justifyContent: "center", alignItems: "center", borderRadius: 10, flexDirection: "row", alignItems: "center"}}>
            
                    {
                      loading ? (
                        <ActivityIndicator color={"#fff"} size="small" />
                      ) : (
                        <View style={{flexDirection: "row", alignItems: "center" }}>
                            <Image source={require("../assets/images/med.png")} style={{height: 30, width: 30}} />
                        </View>
                      )
                    }
          </Pressable>
          <TouchableOpacity onPress={() => setModal(true)} style={{height: 60, width: 60, backgroundColor: "#484848", borderRadius: 30, justifyContent: "center", alignItems: "center", marginLeft: 10}}>
            <FontAwesome name="heart" size={20} color="white" />
          </TouchableOpacity>
      </View>

      <Modal visible={modal} animationType="slide" statusBarTranslucent={true}>
          <Pressable onPress={modalSetting} >
            <View style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#005FA4", alignItems: "center", justifyContent: "center", paddingBottom: 180}}>
                <Text style={{color: "#fff", fontSize: 20, padding: 10, alignSelf: "center", textAlign: "center", width: "80%"}}>Click on the person you want to send mindfulness reminder</Text>
                <View>
                    
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                    {
                        disabled ? (
                            <AntDesign name="checkcircleo" size={100} color="white" style={{marginHorizontal: 10}} />
                        ) : <TouchableOpacity disabled={disabled} onPress={sendStranger}>
                                <Image source={require("../assets/images/person1.png")} style={{height: 90, width: 90, marginHorizontal: 15}} />
                                <Text style={{textAlign: "center", marginTop: 5, color: "#fff", fontSize: 15}}>{nameOne}</Text>
                            </TouchableOpacity>
                    }
                    
                    
                    {
                        disabledTwo ? (
                            <AntDesign name="checkcircleo" size={100} color="white" style={{marginHorizontal: 10}} />
                        ) : <TouchableOpacity disabled={disabledTwo} onPress={sendStrangerTwo}>
                                <Image source={require("../assets/images/person2.png")} style={{height: 90, width: 90, marginHorizontal: 15}} />
                                <Text style={{textAlign: "center", marginTop: 5, color: "#fff", fontSize: 15}}>{nameTwo}</Text>
                            </TouchableOpacity>
                    }
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                        {
                            disabledThree ? (
                                <AntDesign name="checkcircleo" size={100} color="white" style={{marginHorizontal: 10}} />
                            ) : <TouchableOpacity disabled={disabledThree} onPress={sendStrangerThree}>
                                    <Image source={require("../assets/images/person3.png")} style={{height: 90, width: 90, marginHorizontal: 15}} />
                                    <Text style={{textAlign: "center", marginTop: 5, color: "#fff", fontSize: 15}}>{nameThree}</Text>
                                </TouchableOpacity>
                        }
                        
                        {
                            disabledFour ? (
                                <AntDesign name="checkcircleo" size={100} color="white" style={{marginHorizontal: 10}} />
                            ) : <TouchableOpacity disabled={disabledFour} onPress={sendStrangerFour}>
                                    <Image source={require("../assets/images/person4.png")} style={{height: 90, width: 90, marginHorizontal: 15}} />
                                    <Text style={{textAlign: "center", marginTop: 5, color: "#fff", fontSize: 15}}>{nameFour}</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    
                </View>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"} style={{position: "absolute", bottom: 0, backgroundColor: "#005896", left: 0}}>
                <Text style={{color: "#fff", marginTop: 10, fontSize: 14, fontWeight: "500", marginLeft: 20}}>Click on your friend to send it:</Text>
                <ScrollView showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="always" horizontal style={{marginTop: 20, flexDirection: "row", width: Dimensions.get("screen").width, paddingBottom: 0}}>
                    <TouchableOpacity onPress={addCard} style={{marginHorizontal: 15}}>
                        <Image source={require("../assets/images/mysel.png")} style={{height: 70, width: 70}} />
                        <Text style={{color: "#fff", fontSize: 15, marginVertical: 10, marginLeft: 10}}>Myself</Text>
                    </TouchableOpacity>
                    {
                        friends.map(({id, data}) => {
                            return <TouchableOpacity key={id} id={id} onPress={() => sendToFriend(data.id, data.name)} style={{marginHorizontal: 5, alignItems: "center"}}>
                                        {
                                            send === data.name ? (
                                                <AntDesign name="checkcircleo" size={70} color="white" />
                                            ) : (
                                                <Image source={require("../assets/images/avatarGroup.png")} style={{height: 70, width: 70}} />
                                            )
                                        }
                                       
                                        <Text style={{color: "#fff", fontSize: 15, marginVertical: 10}}>{data.name}</Text>
                                    </TouchableOpacity>
                        })
                    }
                    <TouchableOpacity onPress={goToInvite} style={{marginHorizontal: 10}}>
                       
                        <AntDesign name="pluscircleo" size={70} color="#DDF1FF" />
                        <Text style={{color: "#fff", fontSize: 15, marginVertical: 10, marginLeft: 20}}>Add</Text>
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.inputText}>
                    
                    <TextInput placeholderTextColor={clickedTwo ? "black" : "grey"} placeholder={clickedTwo ? "Paste your link ..." : "Write your message ..."} value={input} onChangeText={(text) => setInput(text)} style={{height: 50, width: "90%", backgroundColor: "#fff", borderRadius: 30, borderColor: "black", borderWidth: clickedTwo ? 3 : 0, paddingHorizontal: 10, paddingTop: 0}} />
                </View>
                
            </KeyboardAvoidingView>
            
            
          </Pressable>
      </Modal>
      <Modal visible={modalTwo} animationType="slide">
            <SafeAreaView style={{justifyContent: "center", alignItems: "center", backgroundColor: "#fff", flexDirection: "row"}}>
                <Image source={require("../assets/images/grup.png")} style={{height: 80, width: 80}} />
                <Text style={{fontSize: 20, color: "black", marginLeft: 20}}>{ime}</Text>
                
            </SafeAreaView>
            <View style={{height: 20, width: "100%", backgroundColor: "#fff"}} />
            <Pressable onPress={() => setModalTwo(false)} style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#068DEB", flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "#fff", fontSize: 30, width: "80%", textAlign: "center", marginBottom: 50}}>Hi {auth.currentUser.displayName} 😊</Text>
                <HyperLink linkDefault={true} linkStyle={{textDecorationLine: "underline"}}>
                    <Text style={{color: "#fff", fontSize: 18, width: Dimensions.get("screen").width - 100, textAlign: "center"}}>Let´s make this place mindful - TOGETHER. Join mindful rooms to meditate and discuss different topics, find guided meditations, send mindfulness reminders to your friends and even strangers.</Text>
                </HyperLink>
                <View style={{flexDirection: "row", alignItems: "center", marginTop: 50}}>
                    <TouchableOpacity onPress={goToInviteTwo} style={{height: 50, width: 100, backgroundColor: "#ff8f8f", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 10}}>
                        <Text style={{color: "#fff"}}>Add Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToMeditate} style={{height: 50, width: 100, backgroundColor: "#94ccff", borderRadius: 10, justifyContent: "center", alignItems: "center", marginLeft: 10}}>
                        <Text style={{color: "#fff"}}>Meditate</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
      </Modal>
      <Modal visible={modalDaily} animationType="slide">
            <View style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, flex: 1, justifyContent: "center", alignItems: "center"}}>
                

                {
                        timer ? (
                        <View style={{alignItems: "center", backgroundColor: "#B5EDFF", flex: 1, position: "absolute", top: 0, width: Dimensions.get("screen").width, alignSelf: "center", height: Dimensions.get("screen").height , justifyContent: "center"}}>
                            
                            
                            <Text style={{position: "absolute", top: 180, fontSize: 30, fontWeight: "500"}}>{breathText}</Text>
                            
                            <Animated.View style={[styles.circle, taskAnimation]}></Animated.View>
                            
                            {
                                countDown ? (<CountdownCircleTimer
                                isPlaying={countDown}
                                duration={3}
                                strokeWidth={15}
                                size={220}
                                onComplete={() => backAnimation()}
                                
                                colors={"red"}
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
                        ) : 
                        <>
                            <SafeAreaView style={{justifyContent: "center", alignItems: "center", backgroundColor: "#fff", flexDirection: "row"}}>
                                <Image source={require("../assets/images/grup.png")} style={{height: 80, width: 80}} />
                                <Text style={{fontSize: 20, color: "black", marginLeft: 20}}>{ime}</Text>
                            </SafeAreaView>
                            <View style={{height: 20, width: "100%", backgroundColor: "#fff"}} />
                            <Pressable onPress={() => setModalDaily(false)} style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#068DEB", flex: 1, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "#fff", fontSize: 30, width: "80%", textAlign: "center", marginBottom: 40}}>Hi {auth.currentUser.displayName} 😊</Text>
                                
                                <Text style={{color: "#fff", fontSize: 20, width: Dimensions.get("screen").width, paddingHorizontal:20, textAlign: "center"}}>{description}</Text>
                                    
                                
                            </Pressable>
                        </>

                    } 
                
            </View>
      </Modal>
      
      <Modal visible={modalThree} animationType="slide">
            <View style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "blue", flex: 1, justifyContent: "center", alignItems: "center"}}>
                

                {
                        timer ? (
                        <View style={{alignItems: "center", backgroundColor: "lightblue", flex: 1, position: "absolute", top: 0, width: Dimensions.get("screen").width, alignSelf: "center", height: Dimensions.get("screen").height , justifyContent: "center"}}>
                            
                            
                            <Text style={{position: "absolute", top: 180, fontSize: 30, fontWeight: "500"}}>{breathText}</Text>
                            
                            <Animated.View style={[styles.circle, taskAnimation]}></Animated.View>
                            
                            {
                                countDown ? (<CountdownCircleTimer
                                isPlaying={countDown}
                                duration={3}
                                strokeWidth={15}
                                size={220}
                                onComplete={() => backAnimation()}
                                
                                colors={"red"}
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
                        ) : 
                        <>
                            <SafeAreaView style={{justifyContent: "center", alignItems: "center", backgroundColor: "#fff", flexDirection: "row", width: "100%"}}>
                                <Image source={require("../assets/images/grup.png")} style={{height: 80, width: 80}} />
                                <Text style={{fontSize: 20, color: "black", marginLeft: 20}}>{ime}</Text>
                                
                            </SafeAreaView>
                            <View style={{height: 20, width: "100%", backgroundColor: "#fff"}} />
                            <Pressable style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#068DEB"}} onPress={() => setModalThree(false)}>
                                <HyperLink linkDefault={true} linkStyle={{textDecorationLine: "underline"}}>
                                    {
                                        description === null ? (
                                            <Text style={{color: "white", fontSize: 80}}>❤️</Text>
                                        ) : (
                                            <Text style={{color: "#fff", fontSize: 20, width: Dimensions.get("screen").width - 100}}>{description}</Text>
                                        )
                                    }
                                    
                                </HyperLink>
                            </Pressable>
                        </>

                    } 
                
            </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={stranger}
      >
          <Pressable onPress={() => setStranger(false)} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#FFABAB", justifyContent: "center", alignItems: "center"}}>
           
            <Image source={require("../assets/images/test7.png")} style={{height: 200, width: 200}} />
            <Text style={{fontSize: 20, fontWeight: "600", marginTop: 10}}>EVERYBODY NEEDS A FRIEND</Text>
            <Text style={{color: "black", marginLeft: 0, fontSize: 15, marginTop: 16, textAlign: "center", width: "80%", fontWeight: "300"}}>Click on the person you want to send mindfulness reminder ❤️</Text>
            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                {
                    disabled ? (
                        <AntDesign name="checkcircleo" size={100} color="white" style={{marginHorizontal: 10}} />
                    ) : <TouchableOpacity disabled={disabled} onPress={sendStranger}>
                            <Image source={require("../assets/images/person1.png")} style={{height: 100, width: 100, marginHorizontal: 15}} />
                            <Text style={{textAlign: "center", marginTop: 5, color: "black", fontSize: 15}}>{nameOne}</Text>
                        </TouchableOpacity>
                }
                
                
                {
                    disabledTwo ? (
                        <AntDesign name="checkcircleo" size={100} color="white" style={{marginHorizontal: 10}} />
                    ) : <TouchableOpacity disabled={disabledTwo} onPress={sendStrangerTwo}>
                            <Image source={require("../assets/images/person2.png")} style={{height: 100, width: 100, marginHorizontal: 15}} />
                            <Text style={{textAlign: "center", marginTop: 5, color: "black", fontSize: 15}}>{nameTwo}</Text>
                        </TouchableOpacity>
                }
            </View>
            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                {
                    disabledThree ? (
                        <AntDesign name="checkcircleo" size={100} color="white" style={{marginHorizontal: 10}} />
                    ) : <TouchableOpacity disabled={disabledThree} onPress={sendStrangerThree}>
                            <Image source={require("../assets/images/person3.png")} style={{height: 100, width: 100, marginHorizontal: 15}} />
                            <Text style={{textAlign: "center", marginTop: 5, color: "black", fontSize: 15}}>{nameThree}</Text>
                        </TouchableOpacity>
                }
                
                {
                    disabledFour ? (
                        <AntDesign name="checkcircleo" size={100} color="white" style={{marginHorizontal: 10}} />
                    ) : <TouchableOpacity disabled={disabledFour} onPress={sendStrangerFour}>
                            <Image source={require("../assets/images/person4.png")} style={{height: 100, width: 100, marginHorizontal: 15}} />
                            <Text style={{textAlign: "center", marginTop: 5, color: "black", fontSize: 15}}>{nameFour}</Text>
                        </TouchableOpacity>
                }
            </View>
            
          </Pressable>
      </Modal>
      <Modal visible={modalFour} animationType="slide">
            <View style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#068DEB", flex: 1, justifyContent: "center", alignItems: "center"}}>
                

                {
                        timer ? (
                        <View style={{alignItems: "center", backgroundColor: "lightblue", flex: 1, position: "absolute", top: 0, width: Dimensions.get("screen").width, alignSelf: "center", height: Dimensions.get("screen").height , justifyContent: "center"}}>
                            
                            
                            <Text style={{position: "absolute", top: 180, fontSize: 30, fontWeight: "500"}}>{breathText}</Text>
                            
                            <Animated.View style={[styles.circle, taskAnimation]}></Animated.View>
                            
                            {
                                countDown ? (<CountdownCircleTimer
                                isPlaying={countDown}
                                duration={3}
                                strokeWidth={15}
                                size={220}
                                onComplete={() => backAnimation()}
                                
                                colors={"red"}
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
                        ) : 
                        <Pressable onPress={() => setModalFour(false)}>
                            <Text style={{fontSize: 100, textAlign: "center"}}>❤️</Text>
                            {
                                getNumber === 1 ? (
                                    <Text style={{color: "#fff", fontSize: 20, padding: 10, marginTop: 30}}>Random stranger is sending you love</Text>
                                ) : (
                                    <Text style={{color: "#fff", fontSize: 20, padding: 10, marginTop: 30}}>{getNumber} people are sending you love</Text>
                                )
                            }
                            
                        </Pressable>

                    } 
                
            </View>
      </Modal>
      <Modal
        visible={modalFive}
        animationType="slide"
      >
          {
              link ? (
                  <View style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#fff", flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Pressable onPress={selfImprove} style={{position: "absolute", top: 50, left: 30}}>
                        <AntDesign name="back" size={24} color="black" />
                    </Pressable>
                    <Text style={{fontSize: 17}}>Tim wants you to check out this link</Text> 
                    <Pressable onPress={() => Linking.openURL("https://www.youtube.com/watch?v=7lumWMaIsbU")} style={{height: 70, width: 70, borderRadius: 35, backgroundColor: "#FFD3AB", justifyContent: "center", alignItems: "center", marginTop: 30}}>
                        <Entypo name="leaf" size={24} color="white" />
                    </Pressable>     
                </View>
              ) : (
                <KeyboardAvoidingView style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#ffdfc2", flex: 1, justifyContent: "center", alignItems: "center"}} behavior={Platform.OS === "ios" ? "padding" : "padding"}>
                    <Pressable onPress={() => setModalFive(false)} style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#ffdfc2", flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Image source={require("../assets/images/test5.png")} style={{height: 200, width: 220}} />
                        <Text style={{fontSize: 25, color: "#3d3d3d", textAlign: "center", fontSize: 25, width: "90%"}}>HELP SOMEBODY GROW</Text>
                        <Text style={{width: "80%", textAlign: "center", color: "grey", fontWeight: "300", marginTop: 20}}>Paste the link of a video, book, blog, website that everyone needs to improve their life</Text>
                        
                        <TextInput placeholder="Paste the link . . ." style={{height: 50, width: "80%", borderWidth: 1, borderColor: "grey", color: "black", paddingLeft: 10, fontSize: 15, marginTop: 80, borderRadius: 30, backgroundColor: "#fff"}} placeholderTextColor="black" />
                        <TouchableOpacity onPress={() => setLink(true)} style={{height: 75, width: 75, backgroundColor: "#3d3d3d", borderRadius: 50, justifyContent: "center", alignItems: "center", marginTop: 20}}>
                            <Text style={{fontSize: 30}}>❤️</Text>
                        </TouchableOpacity>
                    </Pressable>
                </KeyboardAvoidingView>
              )
          }

           
      </Modal>
      <Modal
        visible={modalSix}
        animationType="slide"
      >
        <View onPress={() => setModalSix(false)} style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#ABD7FF", flex: 1, alignItems: "center"}}>
            <Pressable onPress={exitPhoto} style={{position: "absolute", top: 50, left: 30, zIndex: 1}}>
                        <AntDesign name="back" size={24} color="black" />
            </Pressable>
          <ScrollView showsVerticalScrollIndicator="false">
            <View style={{alignItems: "center", backgroundColor: "#fff", width: Dimensions.get("screen").width}}>
                <Image source={require("../assets/images/svet.png")} style={{height: 250, width: 290, alignSelf: "center", marginTop: 50}} />
                
                <Text style={{textAlign: "center", fontSize: 15, width: 300, color: "grey", marginTop: 10}}>Share a photo of a peaceful, quiet and beautiful locations so everybody can visit them.</Text>
                <TouchableOpacity onPress={pickImage} style={{marginTop: 20, height: 70, width: 70, borderRadius: 40, backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
                    <Feather name="camera" size={30} color="white" />
                </TouchableOpacity>
                {
                    image && 
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 30}}>
                            <Image source={{uri: image}} style={{width: 200, height: 200, marginTop: 20}} />
                            <View style={{marginLeft: 20, alignItems: "center"}}>
                                <Text>Upload</Text>
                                <TouchableOpacity onPress={uploadImage}>
                                    <AntDesign name="pluscircleo" size={40} color="black" style={{marginTop: 10}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                }
                <View style={{paddingBottom: 30}} />
            </View>
            <Text style={{marginTop: 10, fontSize: 20, textAlign: "center", color: "black", marginTop: 20}}>Explore relaxing places</Text>
            <AntDesign name="down" size={24} color="black" style={{alignSelf: "center", marginTop: 10}} />
            <ImageBackground imageStyle={{ borderRadius: 6}} source={require("../assets/images/place.jpg")} style={{height: 300, width: 350, marginTop: 20, alignSelf: "center"}}>
                <Text style={{color: "#fff", fontWeight: "bold", position: "absolute", bottom: 10, left: 10, fontSize: 20, alignSelf: "center"}}>Grumeti Reserves, Tanzania</Text>
            </ImageBackground>
            <ImageBackground imageStyle={{ borderRadius: 6}} source={require("../assets/images/place2.png")} style={{height: 300, width: 350, marginTop: 30, alignSelf: "center"}}>
                <Text style={{color: "#fff", fontWeight: "bold", position: "absolute", bottom: 10, left: 10, fontSize: 20, alignSelf: "center"}}>Lake Atitlan, Guatemala</Text>
            </ImageBackground>
            <ImageBackground imageStyle={{ borderRadius: 6}} source={require("../assets/images/place3.jpg")} style={{height: 300, width: 350, marginTop: 30, alignSelf: "center"}}>
                <Text style={{color: "#fff", fontWeight: "bold", position: "absolute", bottom: 10, left: 10, fontSize: 20, alignSelf: "center"}}>Tassajara Zen Mountain Center, California</Text>
            </ImageBackground>
            <ImageBackground imageStyle={{ borderRadius: 6}} source={require("../assets/images/place4.jpg")} style={{height: 300, width: 350, marginTop: 30, alignSelf: "center"}}>
                <Text style={{color: "#fff", fontWeight: "bold", position: "absolute", bottom: 10, left: 10, fontSize: 20, alignSelf: "center"}}>Halibut Cove, Alaska</Text>
            </ImageBackground>
            <View style={{height: 50}} />
          </ScrollView>
          
        </View>
      </Modal>
      <Modal
        visible={modalSeven}
        animationType="slide"
      >
          <View style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#ABD7FF", flex: 1, alignItems: "center", justifyContent: "center", alignItems: "center"}}>
            <Pressable onPress={stopSong} style={{position: "absolute", top: 50, left: 30, zIndex:1}}>
                        <AntDesign name="back" size={24} color="white" />
            </Pressable>
            <TouchableOpacity onPress={onPlayPausePressOne} style={{zIndex: 1}}>
                <Ionicons name={ play ? "play" : "pause"} size={70} color="#fff" style={{marginTop: 50}} />
              </TouchableOpacity>
              <View style={[styles.progressFirst, { width: `${getProgress()}%`}]} />
          </View>
      </Modal>
      <Modal
        visible={modalVoice}
        animationType="slide"
      >
          <Pressable onPress={() => setModalVoice(false)} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#005FA4", justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "#fff", fontSize: 30}}>I am grateful for ...</Text>
                <TouchableOpacity onPressIn={() => setVoiceColor(true)} onPressOut={() => setVoiceColor(false)} style={{height: 100, width: 100, backgroundColor: voiceColor ? "blue" : "lightblue", justifyContent: "center", alignItems: "center", borderRadius: 50, marginTop: 100}}>
                    <MaterialIcons name="keyboard-voice" size={50} color={voiceColor ? "white" : "black"} />
                </TouchableOpacity>
          </Pressable>
      </Modal>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    circle: { 
        backgroundColor: "blue", 
        borderRadius: 200,
        position: "absolute"
      },

      progressFirst: {
        height: Dimensions.get("screen").height,
        backgroundColor: "#8ac7ff",
        alignSelf: "flex-start",
        position: "absolute",
        bottom: 0,
      },

    inputText: {
        flexDirection: "row", 
        alignItems: "center", 
        width: "100%", 
        padding: 5, 
        justifyContent: "center",
        ...Platform.select({
            ios: {
                paddingBottom: 20,
            },
            android: {
                paddingBottom: 50,
            }
          })
        
    }
});
