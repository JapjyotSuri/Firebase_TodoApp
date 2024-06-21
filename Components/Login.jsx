import { Pressable, StyleSheet, Text, View ,TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
const Login = ({navigation}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    function loginfunc(){
        auth().signInWithEmailAndPassword(email,password).then((res)=> {
            console.log(res)
            Alert.alert("logged in succesfully")
            setEmail('');
            setPassword('');
            navigation.navigate('Home');
        }).catch((error)=> {
            console.log(error)
            Alert.alert(error.nativeErrorMessage)
        })
    }
  return (
    <View>
       <View>
      <TextInput placeholder='Email' value={email} onChangeText={setEmail}/>
      <TextInput placeholder='Password' value={password} onChangeText={setPassword}/>
      <Pressable onPress={loginfunc}><Text>Login</Text></Pressable>
    </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})