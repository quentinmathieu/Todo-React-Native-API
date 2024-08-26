import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, StatusBar} from 'react-native';



import axios from 'axios';
import TodoCard from '@/components/TodoCard';



type TaskList={
  id:number,
  name: string
}

type TaskLists = Array<TaskList>;

const App = () => {
  const [data, setData] = useState<TaskLists>(
  );



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
  

  return (

    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/>

          {data ? (
            <View style={styles.taskWrapper}>
              <Text style={styles.sectionTitle}>OPEN KEEP</Text>
                <View style={styles.items}>
                  {data.map(taskList=>
                  <TodoCard key={taskList.id} id={taskList.id} name={taskList.name}/>
                  )
                  }
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
    backgroundColor: 'white',
    marginBottom: 20,
  },
  taskWrapper: {
    paddingTop: 0,
    flex: 1,
    paddingHorizontal: 5,
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  items:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 4,
    alignContent: 'flex-start',
    flexGrow: 1, 
    justifyContent: 'center',
  },
  
})



export default App;