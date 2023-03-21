import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert, BackHandler } from 'react-native';
import Circle from '../components/Circle_3';
import {useNavigation} from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveScore, removeScore, playSound } from './Game';
import { useFocusEffect } from '@react-navigation/native';


const Game_3 = () => {
  const navigation = useNavigation();


  const [circles, setCircles] = useState(Array(16).fill(false));
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(5);
  const [clickedCircles, setClickedCircles] = useState(Array(16).fill(false));
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        // Add your custom back button handling logic here
        // Return 'true' if you want to prevent the default back button behavior
        removeScore();
        navigation.navigate("Home");
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
            navigation.navigate("Home");
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setIsLevelCompleted(false);
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
      <Text style={{fontSize: 20, marginTop: 10}}>Score: {score}</Text>

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
