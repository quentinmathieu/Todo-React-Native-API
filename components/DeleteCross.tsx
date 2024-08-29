import {  Text, StyleSheet,  Pressable } from 'react-native';
import alert from './../hooks/alert'
import axios from 'axios'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';




const DeleteCross = (props: any) => {
    const [status, setStatus] = useState<number>(0);
    const route = useRoute();

    const deleteTaskList = async (id: number)  =>{
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/task_lists/${id}`)
        .then(function () {
            if (route.name.includes("details")){
                setStatus(1);
                return 2;
            }

            // update the current tasklists container
            const newArray = props.data.filter((taskList:any)=> (taskList.id != id))
            props.stateChanger(newArray)
            return 1;
        })
        .catch(function (error) {
            console.log(error);
            return -1;
        });
          
    }
    const confirmDelete = () =>
        {
          alert(
            'Delete a list',
            '',
            [
              {text: 'Delete', onPress: () => deleteTaskList(props.tasklist.id)},
            ],
            {cancelable: true},
          );
        }

    if(status == 1){
        return (<Redirect href={'/'} />)
    }
      

    return(
        <Pressable onPress={() => {confirmDelete()}}>
            <Text key={props.tasklist.id} style={styles.headerText}><Ionicons name="trash" size={20} color="black" /></Text>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    headerText:{
        flex: 1,
        fontWeight: "bold",
        flexWrap: "nowrap",
        overflow: "hidden",
        maxHeight : 35,
        lineHeight: 25,
    } 
});



export default DeleteCross;