import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, StatusBar, Pressable} from 'react-native';
import axios from 'axios';
import TodoCard from '@/components/TodoCard';
import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';



type TaskList={
  id:number,
  name: string
}

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
        const tempTask:TaskList = {
          // ISSUE : can't get "@id" because of the '@'
          id: Number(pathId.split('/')[pathId.split('/').length-1]),
          name: taskList.name,
        }
        taskLists.push(tempTask)
      })
      setData(taskLists);
    } catch (error) {
     
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskList();
  }, [])

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
                <Pressable  onPress={() => {newTaskList()}}>
                  <LinearGradient
                    colors={['#fcd2af', '#e5d0e3']}
                    start={{x: 0.7, y: 0}}
                    end={{x: 0, y: 1}}
                  
                    style={styles.addBtn}
                    >
                    <Text style={styles.addBtnText}>+</Text>
                  </LinearGradient>
                </Pressable>
                  {data.map(taskList=>
                  <TodoCard key={taskList.id} id={taskList.id} name={taskList.name}/>
                  )
                  }
                <Pressable  onPress={() => {newTaskList()}}>
                  <LinearGradient
                    colors={['#fcd2af', '#e5d0e3']}
                    start={{x: 0.7, y: 0}}
                    end={{x: 0, y: 1}}
                  
                    style={styles.addBtn}
                    >
                    <Text style={styles.addBtnText}>+</Text>
                  </LinearGradient>
                </Pressable>
                
                </View>
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
    flex: 1,
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
    zIndex: 999
  },

  addBtn: {
    minWidth: 150,
    maxWidth: 150,
    minHeight: 50,
    borderRadius: 10,
    flex: 1,
    textAlign: 'center',
    overflow: 'hidden',
    
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  addBtnText:{
    color: "#5e5e5e",
    fontWeight: 'bold'
  },
  
})



export default App;