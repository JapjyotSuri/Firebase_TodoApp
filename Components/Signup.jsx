

import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'

const Signup = ({navigation}) => {
    const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  function signUpFunc(){
      auth().createUserWithEmailAndPassword(email,password).then(()=> {
        Alert.alert("user created" + email,password)
        setEmail("");
        setPassword("");
       navigation.navigate('Login')
  }).catch((error) =>{
    console.log(error)
    Alert.alert(error.nativeErrorMessage)
  }
)
  
  }
  return (
    <View>
      <TextInput placeholder='Email' value={email} onChangeText={setEmail}/>
      <TextInput placeholder='Password' value={password} onChangeText={setPassword}/>
      <Pressable onPress={signUpFunc}><Text>Sign up</Text></Pressable>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({})