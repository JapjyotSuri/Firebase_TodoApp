import { StyleSheet, Text, View,TextInput, Pressable, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
const Homescreen = () => {
const [task,setTask]=useState('');
const [todos,setTodos]=useState([]);

  async function handleTaskAdd(){
    const user = auth().currentUser;
  firestore().collection('users').doc(user.uid).collection('tasks').add({
    task: task,
    completed: false
  }).then(() => {
    setTask('')
    Alert.alert('Task added');
  }).catch((error) => console.log(error))
  }
  const [myData,setMyData]=useState('null');
  useEffect(()=> {
    const user = auth().currentUser;

    if (user) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('tasks')
        .onSnapshot(querySnapshot => {
          const tasksArray = [];
          querySnapshot.forEach(documentSnapshot => {
            tasksArray.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setTodos(tasksArray);
        });

      // Clean up listener on unmount
      return () => unsubscribe();
    }
  },[])
  async function getData(){
    const data=await firestore().collection("Todo").get();
    // setMyData(data);
    console.log(data);
  }
  function handleDelete(id){
    const user = auth().currentUser;
    firestore().collection('users').doc(user.uid).collection('tasks').doc(id).delete().then(()=> {
      Alert.alert('Task deleted');
    })
  }
  
  return (
    <View style={{flex: 1}}>
         <View style={{alignItems: 'center'}}>
          <TextInput style={styles.input} placeholder='task.......'  value={task}  onChangeText={setTask}/>
          <Pressable style={styles.btn} onPress={()=> handleTaskAdd()}>
            <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>Add task</Text>
            </Pressable>
         </View>
         <View style={{marginTop: 40}}>
          <Text style={{fontSize: 30,marginLeft: 10}}>Todo List:</Text>
          <FlatList data={todos}
           renderItem={({item}) => (
            <View style={styles.card}>
            <View style={{width: '100%' ,alignItems: 'center',flexDirection: 'row',gap: 4,justifyContent: 'space-between'}}>
             
              <Text style={{fontSize: 20}}> {item.task}</Text>
              <Pressable onPress={()=> handleDelete(item.id)}><Text>Delete</Text></Pressable>
            </View>
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
     input: {
      marginTop: 10,
     width: 350,
      height: 50,
      borderColor:  'black',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10



     },
     card: {
      backgroundColor: '#DAE0E2',
      width: 350,
      height: 50,
      margin: 16,
      paddingLeft: 16,
      paddingRight: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderRadius: 10,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 5,
     },
     btn: {
      height: 50,
      width:250,
      backgroundColor: 'darkblue',
      marginTop: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
     },
     }
)