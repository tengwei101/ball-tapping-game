import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert, BackHandler } from 'react-native';
import Circle from '../components/Circle';
import {useNavigation} from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export const saveScore = async (score) => {
  try {
    const currentScore = await AsyncStorage.getItem('totalScore');
    const newScore = currentScore ? parseInt(currentScore) + score : score;
    await AsyncStorage.setItem('totalScore', newScore.toString());
  } catch (error) {
    console.log('Error saving score:', error);
  }
};

export const removeScore = async () => {
  try {
    await AsyncStorage.removeItem('totalScore');
  } catch (error) {
    console.log('Error removing score:', error);
  }
};


const Game = () => {
  const navigation = useNavigation();

  const [isLevelCompleted, setIsLevelCompleted] = useState(false);


  const [circles, setCircles] = useState([false, false, false, false]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(5);
  const [clickedCircles, setClickedCircles] = useState([
    false,
    false,
    false,
    false,
  ]);

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
  
      if (gameStarted) {
        const timerId = setInterval(() => setTimer((t) => t - 1), 1000);
        if (timer === 0) {
          setGameStarted(false);
          showNextLevelAlert();
        }
        return () => {
          clearInterval(timerId);
          // Remove the event listener when the component unmounts
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
      }
      return () => {
        // Remove the event listener when the component unmounts
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, [gameStarted, timer, navigation])
  );


  

  const resetGame = () => {
    setGameStarted(false);
    setCircles([false, false, false, false]);
    setScore(0);
    setTimer(5);
    setClickedCircles([
      false,
      false,
      false,
      false,
    ]);
    
  };

  const showNextLevelAlert = () => {
    Alert.alert(
      'Level Completed',
      'Do you want to proceed to the next level?',
      [
        {
          text: 'No',
          onPress: () => {
            setIsLevelCompleted(false);
            removeScore();
            resetGame();
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setIsLevelCompleted(false);
            await saveScore(score);
            navigation.replace("Game_2");
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  const startGame = () => {
    setGameStarted(true);
    setCircles([false, false, false, false]);
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
    if (clickedCircles[index]) {
      return;
    }

    const newCircles = [...circles];
    newCircles[index] = true;
    setCircles(newCircles);

    const newClickedCircles = [...clickedCircles];
    newClickedCircles[index] = true;
    setClickedCircles(newClickedCircles);

    setScore((prevScore) => prevScore + 1);

    if (newCircles.every((circle) => circle)) {
      setGameStarted(false);
      setIsLevelCompleted(true);
    } else {
      lightUpRandomCircle();
    }
  };

  useEffect(() => {
    if (isLevelCompleted) {
      showNextLevelAlert();
    }
  }, [isLevelCompleted]);
  

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {circles.map((circle, index) => (
          <Circle
            key={index}
            isLit={circle}
            isClicked={clickedCircles[index]}
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
    width: '70%',
  },
});

export default Game;
