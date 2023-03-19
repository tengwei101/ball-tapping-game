import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import Circle from '../components/Circle_3';
import {useNavigation} from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveScore = async (score) => {
  try {
    const currentScore = await AsyncStorage.getItem('totalScore');
    const newScore = currentScore ? parseInt(currentScore) + score : score;
    await AsyncStorage.setItem('totalScore', newScore.toString());
  } catch (error) {
    console.log('Error saving score:', error);
  }
};


const Game_3 = () => {
  const navigation = useNavigation();


  const [circles, setCircles] = useState(Array(16).fill(false));
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (gameStarted) {
      const timerId = setInterval(() => setTimer((t) => t - 1), 1000);
      if (timer === 0) {
        showNextLevelAlert();
      }
      return () => clearInterval(timerId);
    }
  }, [gameStarted, timer]);

  const resetGame = () => {
    setGameStarted(false);
    setCircles(Array(16).fill(false));
    setScore(0);
    setTimer(5);
  };

  const showNextLevelAlert = () => {
    Alert.alert(
      'Level Completed',
      'Do you want to proceed to the next level?',
      [
        {
          text: 'No',
          onPress: () => {
            navigation.replace("Game");
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await saveScore(score);
            navigation.replace("Game_4");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const startGame = () => {
    setGameStarted(true);
    setCircles(Array(16).fill(false));
    setScore(0);
    lightUpRandomCircle();
  };

  const lightUpRandomCircle = () => {
    const unlitCircles = circles
      .map((circle, index) => (circle ? null : index))
      .filter((index) => index !== null);
  
    if (unlitCircles.length === 0) {
      return;
    }
  
    const index = unlitCircles[Math.floor(Math.random() * unlitCircles.length)];
    const newCircles = [...circles];
    newCircles[index] = true;
    setCircles(newCircles);
  };
  

  const onCirclePress = (index) => {
    const newCircles = [...circles];
    newCircles[index] = true;
    setCircles(newCircles);
    setScore(score + 1);

    if (newCircles.every((circle) => circle)) {
      setGameStarted(false);
      showNextLevelAlert();
    } else {
      lightUpRandomCircle();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {circles.map((circle, index) => (
          <Circle
            key={index}
            isLit={circle}
            onPress={() => gameStarted && onCirclePress(index)}
          />
        ))}
      </View>
      <Text>Score: {score}</Text>
      {gameStarted ? (
        <Text>Time remaining: {timer} seconds</Text>
      ) : (
        <Button title="Start" onPress={startGame} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
     // Adjust this value based on the size of the circles
  },
});


export default Game_3;
