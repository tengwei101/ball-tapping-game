import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchScore = async () => {
      const totalScore = await getScore();
      setScore(totalScore);
    };

    fetchScore();
  }, []);

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
