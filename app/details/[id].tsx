import { View, Text, StyleSheet, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import Task from '../../components/Task'
import Ionicons from '@expo/vector-icons/Ionicons';
import DeleteCross from '@/components/DeleteCross';

import axios from 'axios';


type Task = {
  id: number;
  content: string;
}

type TaskList = {
  id: number;
  name: string;
  tasks: Array<Task>;
};


export default function DetailsScreen(){

  const { id } = useLocalSearchParams();
  const [data, setData] = useState<TaskList>(
  );

  const getTaskList = async () => {
    try {
      // get datas from API platform
      const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/task_lists/${id}`
        );

      const tasks: Array<Task> = [];

      // put each task in the tasks array
      response.data.tasks.forEach((task: any) => {
        // ISSUE : can't get "@id" because of the '@'
        const pathId: string = Object.values(task)[0] as string;
        const tempTask:Task = {
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
    getTaskList();
  }, [])
  
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff"  />
      { data != undefined && data.id == -1 ? (<Redirect href={"/"}></Redirect>) : ("")}
      {data ? (
        <View style={styles.taskWrapper}>
          <>
          
          <Text style={styles.sectionTitle}><Link href={{
                    pathname: '/',
                    }}  >
                      <Ionicons name="arrow-back-circle-sharp" size={28} color="black" style={{verticalAlign: 'bottom', marginRight: 10}}/>
          </Link>{data.name}</Text> <DeleteCross tasklist={data}/></>
          <View style={styles.items}>
          {data.tasks.map(task=><Task key={task.id} text={task.content}/>)}
          </View>
        </View>
      ) :  (<View style={styles.taskWrapper}><ActivityIndicator size="large" color="rgb(244, 81, 30)" /></View>
      ) }
        
    </ScrollView>
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
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  items:{

  }
});