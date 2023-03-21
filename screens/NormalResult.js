import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler, Alert, TextInput, Button } from 'react-native';
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
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // Save the leaderboard data
const saveLeaderboardData = async (name, totalScore) => {
  try {
    const leaderboardData = await AsyncStorage.getItem('normal_leaderboard');
    const currentData = leaderboardData ? JSON.parse(leaderboardData) : [];

    currentData.push({ name, totalScore });
    currentData.sort((a, b) => b.totalScore - a.totalScore);
    const updatedData = currentData.slice(0, 25);

    await AsyncStorage.setItem('normal_leaderboard', JSON.stringify(updatedData));
  } catch (error) {
    console.log('Error saving leaderboard data:', error);
  }
};

// Remove the leaderboard data
const removeLeaderboardData = async () => {
  try {
    await AsyncStorage.removeItem('normal_leaderboard');
  } catch (error) {
    console.log('Error removing leaderboard data:', error);
  }
};

// Get the leaderboard data
const getLeaderboardData = async () => {
  try {
    const leaderboardData = await AsyncStorage.getItem('normal_leaderboard');
    return leaderboardData ? JSON.parse(leaderboardData) : [];
  } catch (error) {
    console.log('Error getting leaderboard data:', error);
    return [];
  }
};

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

  useEffect(() => {
    const checkLeaderboard = async () => {
      const leaderboardData = await getLeaderboardData();
  
      if (leaderboardData.length < 25) {
        Alert.alert('Congratulation', 'You are in the Top 25, please enter your name.');
        setShowNameInput(true);
      } else {
        const isInTop25 = leaderboardData.some((entry, index) => {
          if (index < 25 && score > entry.totalScore) {
            return true;
          }
          return false;
        });
  
        if (isInTop25) {
          Alert.alert('Congratulation', 'You are in the Top 25 list, please enter your name.');
          setShowNameInput(true);
        }
        else{
          Alert.alert('Sorry', 'Your score is not in the top 25.');
        }
      }
    };
  
    if (score > 0) {
      checkLeaderboard();
    }
  }, [score]);
  

  const handleNameSubmit = async () => {
    if (playerName.trim()) {
      await saveLeaderboardData(playerName, score);
      Alert.alert('Success', 'Your name and score have been saved.');
      removeScore();
      navigation.navigate('NormalLeaderboard')
      setShowNameInput(false);
    } else {
      Alert.alert('Error', 'Please enter a valid name.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Score</Text>
      <Text style={styles.score}>{score}</Text>
      {showNameInput && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={playerName}
            onChangeText={setPlayerName}
          />
          <Button title="Submit" onPress={handleNameSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:10,
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 200,
    },
});

export default NormalResult;
