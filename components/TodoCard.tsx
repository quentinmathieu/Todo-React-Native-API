import { Link } from "expo-router";
import React from "react";
import {  Text, StyleSheet, Pressable } from 'react-native';

const TodoCard = (props: any) => {

    return (
        <Pressable style={styles.card}>
            <Link  href={{
            pathname: '/details/[id]',
            params:  {id: props.id},
            }}>
                
                    <Text>
                    {props.name}
                    </Text>
                
            </Link>
        </Pressable>

            
    )
}

const styles = StyleSheet.create({
    card: {
        minWidth: 150,
        maxWidth: 150,
        height: 200,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d8e2dc',
    }
});

export default TodoCard;