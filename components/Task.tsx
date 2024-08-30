import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';
import axios from 'axios'


const Task = (props: any) => {

    const completeTask= async (id: number) => {
        if (props.data){

            await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/tasks/${id}`)
            .then(function () {
                console.log(props.data.tasks.length)
                const newArray = props.data.tasks.filter((task:any)=> (task.id != id));
                const newData = props.data;
                newData.tasks = newArray;
                console.log(newData.tasks.length)
                props.stateChanger(newData);
                Toast.show('Task completed !', {
                    duration: Toast.durations.LONG,
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
                <MaterialCommunityIcons name="drag" size={24} color="black" />
                
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
        padding: 15,
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
        width: 30,
        height: 30,
        backgroundColor: "#55BCF6",
        opacity: 0.4,
        borderRadius: 2,
        marginRight: 5,

    },
});

export default Task;