import { Link } from "expo-router";
import React, {  } from "react";
import {  Text, StyleSheet, View } from 'react-native';


const TodoCard = (props: any) => {

    return (
            <Link style={styles.card} href={{
            pathname: '/details/[id]',
            params:  {id: props.id},
            }}>
                <View style={styles.header}>
                <Text style={styles.headerText}>
                {props.name ? props.name : " "}
                </Text>
                </View>
                
            </Link>
             
    )
}

const styles = StyleSheet.create({
    card: {
        minWidth: 150,
        maxWidth: 150,
        minHeight: 50,
        borderRadius: 10,
        flex: 1,
        textAlign: 'center',
        borderColor: '#FDEECC',
        borderWidth: 2,
        overflow: 'hidden',
        backgroundColor: 'transparent'

    },
    header:{
        backgroundColor: '#FDEECC',
        minWidth: 150,
        maxWidth: 150,
        minHeight: 35,
        maxHeight: 35,
        overflow: "hidden",
        paddingTop: 5,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,

    },
    headerText:{
        flex: 1,
        fontWeight: "bold",
        flexWrap: "nowrap",
        overflow: "hidden",
        maxHeight : 35,
        lineHeight: 25,
        textAlign: 'center'

    }  
});

export default TodoCard;