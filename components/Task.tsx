import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Task = (props: any) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Pressable style={styles.square}></Pressable>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circular}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
         flexDirection : 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         marginBottom: 10,
         

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
        width: 24,
        height: 24,
        backgroundColor: "#55BCF6",
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
});

export default Task;