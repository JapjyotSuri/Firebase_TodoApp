import { StyleSheet, Text, View,TextInput, Pressable, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const Homescreen = () => {
const [task,setTask]=useState('');
const [todos,setTodos]=useState([]);

  async function handleTaskAdd(){
  firestore().collection('Todo').add({
    task: task,
    completed: false
  }).then(() => {
    setTask('')
    Alert.alert('Task added');
  }).catch((error) => console.log(error))
  }
  const [myData,setMyData]=useState('null');
  useEffect(()=> {
    const unsubscribe = firestore()
    .collection('Todo')
    .onSnapshot(querySnapshot => {
      const todosArray = [];
      querySnapshot.forEach(documentSnapshot => {
        todosArray.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        });
        console.log(documentSnapshot.data())
      });
     
      setTodos(todosArray);
    });
    return () => unsubscribe();
  },[])
  async function getData(){
    const data=await firestore().collection("Todo").get();
    // setMyData(data);
    console.log(data);
  }
  function handleDelete(id){
    firestore().collection('Todo').doc(id).delete().then(()=> {
      Alert.alert('Task deleted');
    })
  }
  
  return (
    <View style={{flex: 1}}>
         <View style={{alignItems: 'center'}}>
          <TextInput placeholder='task'  value={task}  onChangeText={setTask}/>
          <Pressable onPress={()=> handleTaskAdd()}><Text>Add task</Text></Pressable>
         </View>
         <View>
          <FlatList data={todos}
           renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
             
              <Text> {item.task}</Text>
              <Pressable onPress={()=> handleDelete(item.id)}><Text>Delete</Text></Pressable>
            </View>
           )}

           keyExtractor={(item) => item.id}
          />
         </View> 
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({

})