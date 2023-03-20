import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveScore, removeScore } from './Game';
import { useFocusEffect } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core'


const getScore = async () => {
  try {
    const score = await AsyncStorage.getItem('totalScore');
    return score ? parseInt(score) : 0;
  } catch (error) {
    console.log('Error getting score:', error);
    return 0;
  }
};

const NormalResult = () => {
  const navigation = useNavigation();


  const [score, setScore] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        // Add your custom back button handling logic here
        // Return 'true' if you want to prevent the default back button behavior
        removeScore();
        navigation.replace("Home");
        return true;
      };
  
    // Add the event listener when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    const fetchScore = async () => {
      const totalScore = await getScore();
      setScore(totalScore);
    };

    fetchScore();

    return () => {
      // Remove the event listener when the component unmounts
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Score</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default NormalResult;
