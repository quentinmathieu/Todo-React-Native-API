import { Link } from "expo-router";
import React from "react";
import {  Text, StyleSheet } from 'react-native';

const TodoCard = (props: any) => {

    return (
            <Link style={styles.card} href={{
            pathname: '/details/[id]',
            params:  {id: props.id},
            }}>
                <Text>
                {props.name}
                </Text>
            </Link>       
    )
}

const styles = StyleSheet.create({
    card: {
        minWidth: 150,
        maxWidth: 150,
        height: 200,
        minHeight: 150,
        borderRadius: 5,
        flex: 1,
        backgroundColor: '#FCDC94',
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default TodoCard;