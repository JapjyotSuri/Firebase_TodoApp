
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import {NavigationContainer} from '@react-navigation/native'

import Signup from './Components/Signup'
import Login from './Components/Login'
import Homescreen from './Components/Homescreen'
import { Alert, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const App = () => {
  const Stack=createNativeStackNavigator();
//   const [email,setEmail]=useState('');
//   const [password,setPassword]=useState('')
//   function signUpFunc(){
//       auth().createUserWithEmailAndPassword(email,password).then(()=> {
//         Alert.alert("user created" + email,password)
//         setEmail("");
//         setPassword("");
       
//   }).catch((error) =>{
//     console.log(error)
//     Alert.alert(error.nativeErrorMessage)
//   }
// ) }
  return (
    // <SafeAreaView>
    // <View>
    //  <View>
    //   <TextInput placeholder='Email' value={email} onChangeText={setEmail}/>
    //   <TextInput placeholder='Password' value={password} onChangeText={setPassword}/>
    //   <Pressable onPress={signUpFunc}><Text>Sign up</Text></Pressable>
    // </View>
    //   </View>
    //   </SafeAreaView>
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Signup' component={Signup}></Stack.Screen>
      <Stack.Screen name='Login' component={Login}></Stack.Screen>
      <Stack.Screen name='Home' component={Homescreen}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App


