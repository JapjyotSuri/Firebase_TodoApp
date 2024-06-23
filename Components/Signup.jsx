

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
    <View  style={{width: '100%',justifyContent: 'center',alignItems:'center',height: '80%'}}>
      <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail}/>
      <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      <TextInput style={styles.input} placeholder='Confirm Password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Pressable style={styles.btn} onPress={signUpFunc}><Text style={{fontSize: 17,color: 'white'}}>Sign up</Text></Pressable>
      <View style={{flexDirection: 'row',marginTop: 10,justifyContent: 'flex-start'}}>
      <Text>Already have an account? </Text>
      <Pressable onPress={()=> navigation.navigate('Login')}><Text style={{color: 'blue'}}>Login</Text></Pressable>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
     width: 350,
      height: 50,
      borderColor:  'black',
      borderWidth: 1,
      borderRadius: 5,
     paddingLeft: 10

   },
   btn : {
    height: 50,
    width: 350,
    backgroundColor: 'darkblue',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
   }
})