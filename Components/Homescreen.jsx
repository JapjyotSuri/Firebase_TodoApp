import { StyleSheet, Text, View, TextInput, Pressable, Alert, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import CheckBox from '@react-native-community/checkbox';
import AntDesign from 'react-native-vector-icons/AntDesign'
const Homescreen = ({ navigation }) => {

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [pending, setPending] = useState(0);
  const [completedTasks, setCompleted] = useState(0);
  const [allTasks, setAllTasks] = useState(0);
  async function handleTaskAdd() {
    const user = auth().currentUser;
    firestore().collection('users').doc(user.uid).collection('tasks').add({
      task: task,
      completed: false
    }).then(() => {
      setTask('')
      // Alert.alert('Task added');
    }).catch((error) => console.log(error))
  }
  function handleUpdate(id, value) {
    const user = auth().currentUser;
    firestore().collection('users').doc(user.uid).collection('tasks').doc(id).update({ task: value }).then(() => {
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isEditing: false, task: value };
        }
        return todo;
      });
      setTodos(updatedTodos);
      // Alert.alert('Task added');
    }).catch((error) => console.log(error))
  }
  useEffect(() => {
    //This is to render all the tasks that are present in firestore for a particular user everytime any change is made to the firestore data 
    const user = auth().currentUser;

    if (user) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('tasks')
        .onSnapshot(querySnapshot => {//we have used onSnapshot here so that we can get realtime updates when anything changes in the firestore
          if(querySnapshot && querySnapshot.exists){
          const tasksArray = [];
          querySnapshot.forEach(documentSnapshot => {//this is used to loop through each document in the collection
            tasksArray.push({
              ...documentSnapshot.data(),
              isEditing: false,
              id: documentSnapshot.id,
              editTask: documentSnapshot.data().task
            });
          });
          setTodos(tasksArray);
          setAllTasks(tasksArray.length)
          let pendingTasks = 0;
          tasksArray.map((task) => {
            if (!task.completed) {
              pendingTasks = pendingTasks + 1;
            }
          })
          setPending(pendingTasks);
          let completedTasks = tasksArray.length - pendingTasks;
          setCompleted(completedTasks)
        }
        });

      return () => unsubscribe();
    }
  }, [])

  async function handleToggle(id, status) {
    const user = auth().currentUser;
    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('tasks')
      .doc(id)
      .update({ completed: !status })//this is used to update the state of a task in firestore based on whether the checkbox is ticked or not
  }
  function handleDelete(id) {
    const user = auth().currentUser;
    firestore().collection('users').doc(user.uid).collection('tasks').doc(id).delete().then(() => {
      Alert.alert('Task deleted');
    })
  }

  return (

    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <TextInput style={styles.input} placeholder='Task description here.......' value={task} onChangeText={setTask} />
        <Pressable style={styles.btn} onPress={() => handleTaskAdd()}>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Add task</Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 10 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, marginBottom: 20, }}>
          <View style={styles.summary}><Text style={{ fontSize: 17, color: '#5D3FD3', fontWeight: 'bold' }}> All: {allTasks}</Text></View>
          <View style={styles.summary}><Text style={{ fontSize: 17, color: '#5D3FD3', fontWeight: 'bold' }}> Pending: {pending}</Text></View>
          <View style={styles.summary}><Text style={{ fontSize: 17, color: '#5D3FD3', fontWeight: 'bold' }}> Completed: {completedTasks}</Text></View>

        </View>
        <Text style={{ fontSize: 30, marginLeft: 10, color: '#5D3FD3', fontWeight: 'bold' }}>Todo List:</Text>
      </View>
      <FlatList data={todos}
        renderItem={({ item }) => (
          <View style={styles.card}>{
            item.isEditing ? (<View style={{ alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'space-between',paddingHorizontal: 0 }}>
              <TextInput style={[styles.input, { width: '72%', height: 40, marginTop: 0 }]} value={item.editTask} onChangeText={(text) => {
                const updateTodos = todos.map(todo => {
                  if (todo.id === item.id) {
                    return { ...todo, editTask: text };
                  }
                  return todo;
                })
                setTodos(updateTodos);
              }} />
              <Pressable style={[styles.btn, { width: '25%', marginTop: 0 }]} onPress={() => handleUpdate(item.id, item.editTask)}><Text style={{ color: 'white' }}>Edit</Text></Pressable></View>) :
              (<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                  <CheckBox value={item.completed}
                    onValueChange={() => handleToggle(item.id, item.completed)}
                    style={{ transform: [{ scale: 0.9 }] }}
                  />
                  <View style={{ width: 250 }}><Text style={[{ fontSize: 18, color: '#5D3FD3', fontWeight: 'bold' }, item.completed && styles.taskCompleted]}> {item.task}</Text></View>
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <AntDesign name='edit' style={{ color: 'red', fontSize: 27 }}
                    onPress={() => {
                      const updatedTodos = todos.map(todo => {
                        if (todo.id === item.id) {
                          return { ...todo, isEditing: true };
                        }
                        return todo;
                      });
                      setTodos(updatedTodos);
                    }
                    } />

                  <AntDesign name='delete' style={{ color: 'red', fontSize: 27 }} onPress={() => handleDelete(item.id)} />
                </View>
              </View>)
          }

          </View>
        )}

        keyExtractor={(item) => item.id}
      />
      <View style={{ alignItems: 'center', marginBottom: 17, borderRadius: 10 }}>
        <Pressable onPress={() => navigation.navigate('Login')}><Text style={{ fontSize: 20, marginLeft: 10, color: 'red', fontWeight: 'bold' }}>Logout</Text></Pressable>
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
    borderColor: '#5D3FD3',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10
  },
  card: {
    backgroundColor: '#f3f3ff',
    width: '92%',
    height: 'auto',
    margin: 13,
    
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.20)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  btn: {
    height: 40,
    width: 250,
    backgroundColor: '#5D3FD3',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },
  summary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3ff',
    paddingHorizontal: 15,
    height: 40,
    padding: 1,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  }
}
)