import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';


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
      console.log(taskList)
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
    <View style={styles.container}>
        <div>
          { data != undefined && data.id == -1 ? (<Redirect href={"/"}></Redirect>) : ("")}
          {data ? (
            <Text>Details of : {data.name}</Text>
          ) :  (<ActivityIndicator size="large" color="rgb(244, 81, 30)" />
          ) }
        </div>
      </View>
  );
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});