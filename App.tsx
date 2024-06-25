
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import {NavigationContainer} from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Homescreen from './Components/Homescreen'
import { Alert, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const App = () => {
  const Stack=createNativeStackNavigator();
  return (
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' >
      <Stack.Screen name='Signup' component={Signup} options={ ({navigation}) => ({ headerLeft: () => <></>})}></Stack.Screen>
      <Stack.Screen name='Login' component={Login}></Stack.Screen>
      <Stack.Screen name='Todos' component={Homescreen} 
      options={ ({navigation}) => ({ headerLeft: () => <></>,
      headerRight: ()=> <AntDesign name='logout' style={{color: 'red', fontSize: 27}} onPress={()=> navigation.navigate('Login')}/>})} ></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App


