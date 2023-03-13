import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

const CIRCLE_COUNT = 4;

const TestGame = () => {
  const [timer, setTimer] = useState(5);
  const [highlightedCircleIndex, setHighlightedCircleIndex] = useState(null);
  const [disabledCircles, setDisabledCircles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);



  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else if (highlightedCircleIndex === null) {
      const nextHighlightedCircleIndex = Math.floor(
        Math.random() * CIRCLE_COUNT
      );
      setHighlightedCircleIndex(nextHighlightedCircleIndex);
    } else {
      setGameOver(true);
    }
  }, [timer]);

  const handleStartPress = () => {
    setCountdown(5);
    const countdownInterval = setInterval(() => {
    setCountdown((countdown) => countdown - 1);
    }, 1000);

    setTimer(5);
    setHighlightedCircleIndex(null);
    setDisabledCircles([]);
    setGameOver(false);
    console.log("Start Button CLicked")

    setTimeout(() => {
        clearInterval(countdownInterval);
        setCountdown(null);
        setGameStarted(true);
      }, 5 * 1000);
    
  };

  const handleCirclePress = (index) => {
    if (index === highlightedCircleIndex) {
      const newDisabledCircles = [...disabledCircles, index];
      setDisabledCircles(newDisabledCircles);
      const nextHighlightedCircleIndex = (highlightedCircleIndex + 1) % CIRCLE_COUNT;
      setHighlightedCircleIndex(nextHighlightedCircleIndex);
    } else {
      setGameOver(true);
    }
  };

  const renderCircle = (index) => {
    const isHighlighted = index === highlightedCircleIndex;
    const isDisabled = disabledCircles.includes(index);
    const circleStyle = [
      styles.circle,
      isHighlighted && styles.highlightedCircle,
      isDisabled && styles.disabledCircle,
    ];
    return (
      <TouchableOpacity
        key={index}
        style={circleStyle}
        onPress={() => handleCirclePress(index)}
        disabled={isDisabled}
      />
    );
  };

  useEffect(() => {
    if (gameOver) {
      showGameOverAlert();
    }
  }, [gameOver]);

  const showGameOverAlert = () => {
    Alert.alert(
      'Game Over',
      'You lost the game!',
      [
        {
          text: 'OK',
          onPress: handleStartPress,
        },
      ],
      { cancelable: false }
    );
  };

  const showCongratulationsAlert = () => {
    Alert.alert(
      'Congratulations!',
      'You won the game!',
      [
        {
          text: 'OK',
          onPress: handleStartPress,
        },
      ],
      { cancelable: false }
    );
  };

  const renderGameScreen = () => {
    const circles = Array(CIRCLE_COUNT)
      .fill(0)
      .map((_, index) => renderCircle(index));
    
    if(!gameStarted){
        return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Click the highlighted circle!</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
        <View style={styles.circleContainer}>{circles}</View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
    <View style={styles.gameOverContainer}>
      <Text style={styles.gameOverText}>Game Over!</Text>
      <TouchableOpacity
        style={styles.restartButton}
        onPress={handleStartPress}
      >
        <Text style={styles.restartButtonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  ) : highlightedCircleIndex === null ? (
    <TouchableOpacity
      style={styles.startButton}
      onPress={handleStartPress}
    >
      <Text style={styles.startButtonText}>Start</Text>
    </TouchableOpacity>
  ) : disabledCircles.length === CIRCLE_COUNT ? (
    <View style={styles.gameOverContainer}>
      <Text style={styles.gameOverText}>Congratulations, you won!</Text>
      <TouchableOpacity
        style={styles.restartButton}
        onPress={handleStartPress}
      >
        <Text style={styles.restartButtonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  ) : (
    renderGameScreen()
  )}
</View>
);
};

    const CIRCLE_SIZE = 80;
    const CIRCLE_MARGIN = 16;

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    },
    timerContainer: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 32,
    },
    timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    },
    circleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    },
    circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#ddd',
    margin: CIRCLE_MARGIN,
    },
    highlightedCircle: {
    backgroundColor: 'orange',
    },
    disabledCircle: {
    backgroundColor: '#999',
    },
    startButton: {
    backgroundColor: 'blue',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    },
    startButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    },
    gameOverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    },
    gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    },
    restartButton: {
    backgroundColor: 'blue',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    },
    restartButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    },
    });

export default TestGame;

