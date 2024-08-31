import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';
import axios from 'axios'


type TaskData = {
    id: number;
    content: string;
  }

type TaskList = {
    id: number;
    name: string;
    tasks: Array<TaskData>;
  };

const Task = (props: any) => {

    const completeTask= async (id: number) => {
        if (props.data){

            await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/tasks/${id}`)
            .then(function () {
                const newData:TaskList = {
                    id: props.data.id,
                    name: props.data.name,
                    tasks: props.data.tasks
                }
                newData.tasks = props.data.tasks.filter((task:any)=> (task.id != id));
                props.stateChanger(newData);
                Toast.show('Task completed !', {
                    duration: Toast.durations.SHORT,
                });
                return 1;
            })
            .catch(function (error) {
                Toast.show('Error', {
                    duration: Toast.durations.LONG,
                });
                console.log(error);
                return -1;
            });

        }
      }

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <MaterialCommunityIcons name="drag" size={35} color="black" />
                
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View>
            <Pressable style={styles.square} onPress={() => {completeTask(props.id)}}></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: 'white',
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomColor: "#5288c7",
        borderRightColor: "#5288c7",
        borderTopColor: "gray",
        borderLeftColor: "gray",
        borderWidth: 3

    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    circular:{
        width: 12,
        height: 12,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#55BCF6",
    },
    itemText:{
        maxWidth: "80%"
    },
    square:{
        width: 25,
        height: 25,
        backgroundColor: "#5288c7",
        borderRadius: 2,
        marginRight: 5,

    },
});

export default Task;