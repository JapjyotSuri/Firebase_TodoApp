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
    <View style={{width: '100%',justifyContent: 'center',alignItems:'center',height: '80%'}}>
       <View >
      <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} />
      <TextInput style={styles.input}  placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Pressable style={styles.btn} onPress={loginfunc}><Text style={{fontSize: 17,color: 'white'}}>Login</Text></Pressable>
      <View style={{flexDirection: 'row',marginTop: 10}}>
      <Text>Don't have an account? </Text>
      <Pressable onPress={()=> navigation.navigate('Signup')}><Text style={{color: 'blue'}}>Signup</Text></Pressable>
      </View>
     
    </View>
    </View>
  )
}

export default Login

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
    backgroundColor: 'darkblue',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
   }
})