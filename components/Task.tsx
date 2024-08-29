import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Task = (props: any) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Pressable style={styles.square}></Pressable>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View><MaterialCommunityIcons name="drag" size={24} color="black" />
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
        width: 24,
        height: 24,
        backgroundColor: "#55BCF6",
        opacity: 0.4,
        borderRadius: 22,
        marginRight: 15,

    },
});

export default Task;