import React, { useState } from "react";
import {  Text, StyleSheet, View, Pressable } from 'react-native';
import alert from './../hooks/alert'
import axios from 'axios'
import Ionicons from '@expo/vector-icons/Ionicons';


const DeleteCross = (props: any) => {

    const deleteTaskList = async (id: number)  =>{
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/task_lists/${id}`)
        .then(function (response) {
            console.log('deleted')
            const newArray = props.data.filter((taskList:any)=> (taskList.id != id))
            props.stateChanger(newArray)
        })
        .catch(function (error) {
            console.log(error);
            return -1;
        });
          
    }
    const confirmDelete = () =>
        {
          alert(
            'Add a task list',
            '',
            [
              {text: 'Add', onPress: () => deleteTaskList(props.tasklist.id)},
            ],
            {cancelable: true},
          );
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