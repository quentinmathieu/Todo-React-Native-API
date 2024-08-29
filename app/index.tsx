import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, StatusBar, Pressable, Alert} from 'react-native';
import axios from 'axios';
import TodoCard from '@/components/TodoCard';
import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';



type Task = {
  id: number;
  content: string;
}

type TaskList = {
  id: number;
  name: string;
  tasks: Array<Task>;
  color: number;
};

type TaskLists = Array<TaskList>;

const App = () => {
  const [data, setData] = useState<TaskLists>(
  );
  const [status, setStatus] = useState<number>(-1);

  const newTaskList = async () => {
    const body = "{\"name\":\"\", \"tasks\":[]}";
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/task_lists`, body, {
      headers: {
        'Content-Type': 'application/ld+json'
      }
  })
  .then(function (response) {
    const pathId: string = Object.values(response.data)[1] as string;
    const newId = Number(pathId.split('/')[pathId.split('/').length-1]);
    setStatus(newId)
    return newId;
    })
    .catch(function (error) {
      console.log(error);
      return -1;
    });
  }
  
  const getTaskList = async () => {
    try {
      // get datas from API platform
      const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/task_lists`
        );

      const taskLists: Array<TaskList> = [];

      // put each tasklist in the taskLists array
      response.data["hydra:member"].forEach((taskList: any) => {
        const pathId: string = Object.values(taskList)[0] as string;
        let tempTaskList:TaskList = {
          // ISSUE : can't get "@id" because of the '@'
          id: Number(pathId.split('/')[pathId.split('/').length-1]),
          name: taskList.name,
          tasks: [],
          color: Math.floor(Math.random() * 5)
        }
        taskList.tasks.forEach((task: any) => {
          // ISSUE : can't get "@id" because of the '@'
          const pathId: string = Object.values(task)[0] as string;
          const tempTask:Task = {
            id: Number(pathId.split('/')[pathId.split('/').length-1]),
            content: task.content,
          }
          tempTaskList.tasks.push(tempTask)
        })
        taskLists.push(tempTaskList)
      })
      setData(taskLists);
    } catch (error) {
     
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskList();
  }, [])

  Alert.alert(
    'Alert Title',
    'My Alert Msg', // <- this part is optional, you can pass an empty string
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );

  if (status != -1){
    return <Redirect href={`/details/${status}`}/>
  } 
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/>
          {data ? (
            <View style={styles.taskWrapper}>
              <Text style={styles.sectionTitle}>OPEN KEEP</Text>
                <View style={styles.items}>
                  {data.map(taskList=>
                  <TodoCard key={taskList.id} tasklist={taskList}/>
                  )
                  }
                
                </View>
                <Pressable  onPress={() => {newTaskList()}}>
                  <LinearGradient
                    colors={['#ffa69e', '#faf3dd']}
                    start={{x: 0.1, y: 0}}
                  
                    style={styles.addBtn}
                    >
                    <Text style={styles.addBtnText}>+</Text>
                  </LinearGradient>
                </Pressable>
                
            </View>
            
          ) :  (<ActivityIndicator size="large" color="rgb(244, 81, 30)" />
          ) }
      </ScrollView>
      );
};

const styles = StyleSheet.create({
  link: {
      flex: 1,
  },
  container: {
    marginBottom: 20,
  },
  taskWrapper: {
    paddingTop: 10,
    flex: 1,
    paddingHorizontal: 5,
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },
  items:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 4,
    alignContent: 'flex-start',
    flexGrow: 1, 
    justifyContent: 'center',
  },

  addBtn: {
    minWidth: 70,
    minHeight: 70,
    margin: 10,
    borderRadius: 40,
    flex: 1,
    textAlign: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 30,
    bottom: 10,
  },
  addBtnText:{
    color: "white",
    fontWeight: 'bold',
    fontSize: 25
  },
  
})



export default App;