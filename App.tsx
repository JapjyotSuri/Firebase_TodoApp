
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
  return (
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Signup' component={Signup}></Stack.Screen>
      <Stack.Screen name='Login' component={Login}></Stack.Screen>
      <Stack.Screen name='Todos' component={Homescreen}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App


