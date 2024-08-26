import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import { Link } from 'expo-router';


import axios from 'axios';


const App = () => {
    const id = 17;

  

  return (
    <View style={{flex: 1, padding: 24}}>
      <Text>Yeeaaay</Text>
      <Link style={styles.link} href={{
              pathname: '/details/[id]',
              params: {id},
            }}> test
            </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
  },})

export default App;