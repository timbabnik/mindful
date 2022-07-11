import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Meditation from '../screens/Meditation';
import SignIn from '../screens/SignIn';
import Register from '../screens/Register';
import Invite from '../screens/Invite';
import MindfulRoom from '../screens/MindfulRoom';
import Rooms from '../screens/Rooms';
import RoomsTwo from "../screens/RoomsTwo"
import RoomsThree from "../screens/RoomsThree"
import RoomsFour from "../screens/RoomsFour"
import RoomsFive from "../screens/RoomsFive"
import RoomsSix from "../screens/RoomsSix"
import RoomsSeven from "../screens/RoomsSeven"
import RoomsEight from "../screens/RoomsEight"
import RoomsNine from "../screens/RoomsNine"


const Stack = createNativeStackNavigator();


const Router = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Register} options={{headerShown: true}} />
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, gestureEnabled: false}} />
            <Stack.Screen name="Meditation" component={Meditation} options={{headerShown: false}} />
            <Stack.Screen name="Invite" component={Invite} options={{headerShown: true}} />
            <Stack.Screen name="Room" component={MindfulRoom} options={{headerShown: false}} />
            <Stack.Screen name="Rooms" component={Rooms} options={{headerShown: false}} />
            <Stack.Screen name="RoomsTwo" component={RoomsTwo} options={{headerShown: false}} />
            <Stack.Screen name="RoomsThree" component={RoomsThree} options={{headerShown: false}} />
            <Stack.Screen name="RoomsFour" component={RoomsFour} options={{headerShown: false}} />
            <Stack.Screen name="RoomsFive" component={RoomsFive} options={{headerShown: false}} />
            <Stack.Screen name="RoomsSix" component={RoomsSix} options={{headerShown: false}} />
            <Stack.Screen name="RoomsSeven" component={RoomsSeven} options={{headerShown: false}} />
            <Stack.Screen name="RoomsEight" component={RoomsEight} options={{headerShown: false}} />
            <Stack.Screen name="RoomsNine" component={RoomsNine} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
