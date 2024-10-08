import { Link } from "expo-router";
import React, {  } from "react";
import {  Text, StyleSheet, View } from 'react-native';
import DeleteCross from '@/components/DeleteCross';


const colors = [
    "#5288c7",
    "#2a9d8f",
    "#e9c46a",
    "#f4a261",
    "#e76f51",
    "#ef476f",

]

type Task = {
    id: number;
    content: string;
  }
const TodoCard = (props: any) => {
    let tempTasks = props.tasklist.tasks.slice(0,3)
    
    return (
            <View style={styles(props).card}>
                <View style={styles(props).header}>
                    <Link href={{
                    pathname: '/details/[id]',
                    params:  {id: props.tasklist.id},
                    }}>
                        <Text style={styles(props).headerText}>
                        {props.tasklist.name ? props.tasklist.name : " "}
                        </Text>
                    </Link>
                    <DeleteCross key={`${props.tasklist.id}deleteCross`} style={styles(props).headerText} tasklist={props.tasklist} stateChanger={props.stateChanger} data={props.data}/>
                </View>
                <Link  href={{
                pathname: '/details/[id]',
                params:  {id: props.tasklist.id},
                }}>
                    <View  style={styles(props).body}>

                    {tempTasks.map((task:Task)=>
                        <Text key={task.id} style={styles(props).bodyText}>• {task.content}</Text>
                    )
                  }
                 {(props.tasklist.tasks.length > 3) ?<Text style={styles(props).bodyText}>• ...</Text>: <></>}  
                    </View>
                 </Link>
                 
            </View>
             
    )
}

const styles =  (props: any) =>  StyleSheet.create({
    card: {
        minWidth: 150,
        maxWidth: 150,
        minHeight: 50,
        borderRadius: 10,
        flex: 1,
        borderColor: colors[props.tasklist.color],
        borderWidth: 2,
        overflow: 'hidden',
        backgroundColor: 'transparent'

    },
    header:{
        backgroundColor: colors[props.tasklist.color],
        width: 150,
        height: 35,
        overflow: "hidden",
        paddingTop: 5,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText:{
        fontWeight: "bold",
        flexWrap: "nowrap",
        overflow: "hidden",
        height : 35,
        lineHeight: 25,
        // minwidth doesnt work !!
        minWidth: 100,
        paddingLeft: 10,
    } ,
    body:{
        minHeight: 70,
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    bodyText:{
        color: "gray",

    },
});

export default TodoCard;