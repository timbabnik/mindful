import { Dimensions, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Pressable, Platform } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from '@firebase/firestore';
import * as Clipboard from "expo-clipboard"


const Invite = ({navigation, route}) => {

  const [friends, setFriends] = useState("");
  const [request, setRequest] = useState([]);
  const [modal, setModal] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");
  const [reload, setReload] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
        title: "",
        headerStyle: { backgroundColor: "#005FA4" },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
        headerLeft: () => (
          <View style={{ marginLeft: 0 }}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: "row", alignItems: "center"}}>
              <Ionicons name="arrow-back" size={27} color="white" />
              <Text style={{marginLeft: 10, fontSize: 18, color: "#fff"}}>Mindful Place</Text>
             </TouchableOpacity>
          </View>
      ),
      headerRight: () => (
          <View>
              <TouchableOpacity onPress={logout} style={{}} >
                <MaterialIcons name="logout" size={24} color="white" />
              </TouchableOpacity>
          </View>
      )
    });
}, [navigation]);

  const logout = () => {
    signOut(auth).then(() => {
        navigation.navigate("SignIn")
    }).catch((error) => {
    // An error happened.
    });
}


const sendRequest = () => {
  addDoc(collection(db, "users", friends, "request"), {
    id: auth.currentUser.uid,
    name: auth.currentUser.displayName,
  })

  setFriends("");
  setReload(!reload)
}


useEffect(() => {
  onSnapshot(collection(db, "users", auth.currentUser.uid, "request"),
  
  (snapshot) => setRequest(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }))))

}, [reload]);

const acceptFriend = (index, ime, idd) => {
  setReload(!reload)

  addDoc(collection(db, "users", auth.currentUser.uid, "friends"), {
    id: index,
    name: ime,
  })

  addDoc(collection(db, "users", index, "friends"), {
    id: auth.currentUser.uid,
    name: auth.currentUser.displayName,
  })

  deleteDoc(doc(db, "users", auth.currentUser.uid, "request", idd))
}

const deleteRequest = (id) => {
  deleteDoc(doc(db, "users", auth.currentUser.uid, "request", id))

  setReload(!reload)
}



useEffect(() => {
  getDocs(collection(db, "users", auth.currentUser.uid, "request"))
  .then((querySnapshot) => {
      return setRequestNumber(querySnapshot.size)
  })

  console.log(requestNumber);
}, [reload])


const copyText = (text) => {
  Clipboard.setString(text)

  alert("Copied link");
}


  return (
    <View style={styles.container}>
     
      <View style={{alignItems: "center"}}>
        <Text style={{color: "#fff", fontSize: 30}}>Add your Friends:</Text>
        <View style={{alignItems: "center"}}>
          <TextInput autoCapitalize="none" value={friends} onChangeText={(text) => setFriends(text)} placeholderTextColor="#fff" style={{borderBottomWidth: 2, borderBottomColor: "#fff", paddingBottom: 5, fontSize: 15, marginTop: 20, width: Dimensions.get("screen").width - 50, color: "#fff"}} placeholder="Paste the code ..." />
          <View style={{flexDirection: "row"}}>
            <TouchableOpacity disabled={friends.length === 0} style={{height: 50, width: 100, backgroundColor: friends.length === 0 ? "lightgrey" : "#86CCFF", marginTop: 20, borderRadius: 5, justifyContent: "center", alignItems: "center", marginRight: 10}} onPress={sendRequest}>
              <MaterialIcons name="person-add-alt-1" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModal(true)} style={{height: 50, width: 100, backgroundColor: "#ff8686", marginTop: 20, borderRadius: 5, justifyContent: "center", alignItems: "center", marginLeft: 10}}>
              <Text style={{color: "#fff", textAlign: "center"}}>Your Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      

      <View style={{marginTop: 40, backgroundColor: "#fff", flex: 1}}>
        <View style={{borderBottomWidth: 1, borderBottomColor: "lightgrey", paddingBottom: 20}}>
          <Text style={{color: "black", fontSize: 20, marginLeft: 30, paddingTop: 20}}>Friend Request:</Text>
        </View>
        {
          requestNumber === 0 ? (
            <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
              <Image source={require("../assets/images/request.png")} style={{height: 150, width: 150}} />
              <Text style={{marginTop: 20, fontSize: 18, fontWeight: "300", color: "grey"}}>You don´t have requests</Text>
            </View>
          ) : (
            <ScrollView style={{marginTop: 0}}>
          {
            request.map(({id, data}) => {
              return <View key={id} id={id} style={{paddingVertical: 20, paddingHorizontal: 10,borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <View style={{flexDirection: "row", alignItems: "center", marginLeft: 10}}>
                          <Image source={require("../assets/images/noGroup.png")} style={{height: 60, width: 60}} />
                          <Text style={{marginLeft: 10}}>{data.name}</Text>
                        </View>
                        <View style={{alignItems: "center", flexDirection: "row"}}>
                          <TouchableOpacity onPress={() => acceptFriend(data.id, data.name, id)} style={{marginRight: 10}}>
                            <AntDesign name="checkcircle" size={35} color="green" />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => deleteRequest(id)} style={{height: 35, width: 35, backgroundColor: "red", justifyContent: "center", alignItems: "center", borderRadius: 30}}>
                            <AntDesign name="delete" size={24} color="white" />
                          </TouchableOpacity>
                        </View>
                     </View>
            })
          }
        </ScrollView>
          )
        }
        
      </View>

      <Modal
        visible={modal}
        animationType={"slide"}
        transparent={true}
      >
        <View style={{position: "absolute", bottom: 0, width: "100%", alignItems: "center"}}>
          <Pressable onPress={() => setModal(false)} style={{height: 300, width: "100%", backgroundColor: "#4F4F4F", justifyContent: "center", alignItems: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
            <Text style={{fontSize: 20, width: "70%", textAlign: "center", fontWeight: "500", color: "#fff"}}>Copy your code and send it to your friend:</Text>
            <View style={{flexDirection: "row", marginTop: 20}}>
              <View style={{backgroundColor: "#fff", borderRadius: 10, padding: 10, marginTop: 20, justifyContent: "center"}}>
                <Text style={{color: "#4F4F4F"}}>{auth.currentUser.uid}</Text>
              </View>
              <View style={{flexDirection: "row", alignItems: "center", marginTop: 15}}>
                <TouchableOpacity onPress={() => copyText(auth.currentUser.uid)} style={{marginLeft: 20, marginTop: 5, backgroundColor: "#fff", padding: 10, borderRadius: 10}}>
                  <AntDesign name="copy1" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
      
    </View>
  )
}

export default Invite

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 30,
    ...Platform.select({
      ios: {
        backgroundColor: "#005FA4", 
      },
      android: {
        backgroundColor: "#005FA4"
      }
    })
  }
})