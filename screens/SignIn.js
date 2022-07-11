import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const SignIn = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            navigation.navigate("Home");
        }
        });
    }, [])

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message)
        });
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
      <Image source={require("../assets/images/logo.png")} style={{height: 182, width: 200}} />
      <Text style={{fontSize: 30, color: "black", fontWeight: "400", marginTop: 30, width: "60%", textAlign: "center"}}>Welcome to Mindful Place</Text>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Your email" style={{width: 300, borderBottomColor: "grey", borderBottomWidth: 1, paddingVertical: 10, marginTop: 60, fontSize: 16}} />
      <TextInput onSubmitEditing={signIn} secureTextEntry value={password} onChangeText={(text) => setPassword(text)} placeholder="Your password" style={{width: 300, borderBottomColor: "grey", borderBottomWidth: 1, paddingVertical: 10, marginTop: 50, fontSize: 16}}/>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Pressable onPress={signIn} style={{marginTop: 50, height: 50, width: 100, backgroundColor: "#00A3FF", borderRadius: 5, justifyContent: "center", alignItems: "center", marginRight: 10}}>
            <Text style={{color: "#fff"}}>Sign In</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Register")} style={{marginTop: 50, height: 50, width: 100, borderWidth: 2, borderColor: "#00A3FF", borderRadius: 5, justifyContent: "center", alignItems: "center", marginLeft: 10}}>
            <Text style={{color: "#00A3FF"}}>Register</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
