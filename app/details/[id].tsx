import { View, Text, StyleSheet, ActivityIndicator, StatusBar, ScrollView, KeyboardAvoidingView, Platform, TextInput, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import Task from '../../components/Task'
import Ionicons from '@expo/vector-icons/Ionicons';
import DeleteCross from '@/components/DeleteCross';
import { RootSiblingParent } from 'react-native-root-siblings';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-root-toast';



import axios from 'axios';


type TaskData = {
  id: number;
  content: string;
}

type TaskList = {
  id: number;
  name: string;
  tasks: Array<TaskData>;
};



export default function DetailsScreen(){

  const { id } = useLocalSearchParams();
  const [data, setData] = useState<TaskList>();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    if (data){
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/tasks`
      );
      const body = `{\"${newTask}\":\"\", \"taskList\":\"/api/task_lists/${data.id}\"}`;
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/tasks`, body, {
        headers: {
          'Content-Type': 'application/ld+json'
        }
    })
    .then(function (response) {
      const pathId: string = Object.values(response.data)[1] as string;
      const newId = Number(pathId.split('/')[pathId.split('/').length-1]);
      // let arrayTasks = data.tasks;
      // const newTaskData:TaskData = {
      //   id: newId,
      //   content: newTask
      // }
      // arrayTasks.push();
      // data.tasks = arrayTasks;
      // setData(data);
      console.log(newId)

      Toast.show('Task added', {
        duration: Toast.durations.SHORT,
      });
      return newId;
      })
      .catch(function (error) {
        Toast.show('Add failed', {
          duration: Toast.durations.LONG,
        });
        console.log(error);
        return -1;
      });
    }
   
  }

  const getTasks = async () => {
    try {
      // get datas from API platform
      const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/task_lists/${id}`
        );

      const tasks: Array<TaskData> = [];

      // put each task in the tasks array
      response.data.tasks.forEach((task: any) => {
        // ISSUE : can't get "@id" because of the '@'
        const pathId: string = Object.values(task)[0] as string;
        const tempTask:TaskData = {
          id: Number(pathId.split('/')[pathId.split('/').length-1]),
          content: task.content,
        }
        tasks.push(tempTask)
      })
      // declare the tasklist with the tasks array as attribute
      const taskList : TaskList = {
        id: Number(id),
        name: response.data.name,
        tasks: tasks
      }     
      setData(taskList);
    } catch (error) {
      const taskList : TaskList = {
        id: -1,
        name: "",
        tasks: []
      }
      setData(taskList);
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [])
  
  
  return (
    <RootSiblingParent>
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff"  />
      { data != undefined && data.id == -1 ? (<Redirect href={"/"}></Redirect>) : ("")}
      {data ? (
        <View style={styles.taskWrapper}>          
          <View style={styles.sectionTitle}><Link href={{
                    pathname: '/',
          }}>
            <Ionicons name="arrow-back-circle-sharp" size={28} color="black" style={{verticalAlign: 'bottom', marginRight: 10}}/>
          </Link><Text style={styles.title}>{data.name}</Text><DeleteCross tasklist={data}/></View>
          <View style={styles.items}>
          {data.tasks.map(task=><Task key={task.id} text={task.content} data={data} id={task.id} stateChanger={setData}/>)}
          </View>
        </View>
      ) :  (<View style={styles.taskWrapper}><ActivityIndicator size="large" color="rgb(244, 81, 30)" /></View>
      ) }
        
    </ScrollView>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
        
      >
    <LinearGradient
        // Button Linear Gradient
        colors={['rgba(255,255,255,0)','rgba(255,255,255,0.5)','rgba(255,255,255,1)', 'rgba(255,255,255,1)']} style={styles.writeTaskWrapper}
        >
          
        <TextInput style={styles.input} placeholder={"Write a task"} onChangeText={text => setNewTask(text)} value={newTask} >

        </TextInput>
        <Pressable onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Add</Text>
            </View>
        </Pressable>
      </LinearGradient>
      
      
    </KeyboardAvoidingView>
    </RootSiblingParent>

  );
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    marginBottom: 150
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  items:{

  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  writeTaskWrapper :{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 50,
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    width: 220,
    maxWidth: '70%',
    borderRadius: 100,
    borderTopColor: '#dbd9d9',
    borderLeftColor: '#dbd9d9',
    borderBottomColor: '#6e6e6e',
    borderRightColor: '#6e6e6e',
    borderWidth: 3
  },
  addWrapper:{
    backgroundColor: '#f3f3f3',
    borderWidth: 3,
    borderTopColor: '#dbd9d9',
    borderLeftColor: '#dbd9d9',
    borderBottomColor: '#6e6e6e',
    borderRightColor: '#6e6e6e',
    minWidth: 60,
    minHeight: 60,
    maxHeight: 60,
    flex: 1,
    textAlign: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 100
  },
  addText:{},
});