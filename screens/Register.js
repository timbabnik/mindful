import { Dimensions, ImageBackground, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons';

const Register = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    useLayoutEffect(() => {
      navigation.setOptions({
          title: "",
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { color: "black" },
          headerTintColor: "black",
          headerLeft: () => (
              <View style={{ marginLeft: 0 }}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: "row", alignItems: "center"}}>
                    <Ionicons name="arrow-back" size={22} color="black" />
                      <Text style={{color: "black", fontSize: 17, marginLeft: 8}}>Back</Text>
                  </TouchableOpacity>
              </View>
          ),
          
      });
  }, [navigation]);


    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name
            })
            // ...
        }).then(() => navigation.navigate("Home"))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message)
            // ..
        });
    }


  return (
    <ImageBackground source={require("../assets/images/backregister.png")} style={{justifyContent: "center", alignItems: "center", width: Dimensions.get("screen").width, height: "100%"}}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Text style={{fontSize: 30}}>Create your Account</Text>
        <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Full Name" style={{width: 300, borderBottomColor: "black", borderBottomWidth: 1, paddingVertical: 10, marginTop: 50, fontSize: 18}} />
        <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={{width: 300, borderBottomColor: "black", borderBottomWidth: 1, paddingVertical: 10, marginTop: 50, fontSize: 18}} />
        <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholder="Password" style={{width: 300, borderBottomColor: "black", borderBottomWidth: 1, paddingVertical: 10, marginTop: 50, fontSize: 18}} />
          <TouchableOpacity disabled={name < 1} onPress={register} style={{marginTop: 50, height: 50, width: 100, backgroundColor: name < 1 ? "grey" : "#00A3FF", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 10}}>
              <Text style={{color: "#fff"}}>Register</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({});
