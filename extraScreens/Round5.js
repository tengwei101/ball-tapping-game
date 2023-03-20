import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, {useState, useEffect} from "react"
import {useNavigation} from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';


const Circle = ({ isActive, onPress }) => (
  isActive ?
    <TouchableOpacity className="rounded-full bg-white" style={styles.size} onPress={onPress} />
    :
    <View className="rounded-full bg-black" style={styles.size} />
);


const Round5 = () => {
  const navigation = useNavigation();

  const [count_5, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isStart, setIsStart] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        // Add your custom back button handling logic here
        // Return 'true' if you want to prevent the default back button behavior
        removeScoreRecord();
        navigation.replace("Home");
        return true;
      };
  
    // Add the event listener when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    let timer;
    if (isStart && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      Alert.alert(
        'Time is up!',
        'Want to see the result?',
        [
          {
            text: 'Yes',
            onPress: () => {
              navigation.replace("Result");
              AsyncStorage.setItem('roundFive_score', count_5.toString())
                .then(() => {
                  console.log('Data stored successfully!');
                })
                .catch((error) => {
                  console.log('Error storing data:', error);
                });

                AsyncStorage.getAllKeys()
                .then((keys) => {
                  console.log('All keys retrieved successfully:', keys);
                })
                .catch((error) => {
                  console.log('Error retrieving keys:', error);
                });
            }
          },
          {
            text: 'No',
            onPress: () => {
                console.log('No pressed'),
                removeScoreRecord();
                navigation.replace("Round1")
            },
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
      setIsStart(false);
    }
        // Clean up function
        return () => {
          // Remove the event listener when the component unmounts
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
          clearTimeout(timer);
        };
      }, [timeLeft, isStart]),
    );

  const clickButton = () => {
    setCount(count_5 + 1);
    setRandomNumber(Math.floor(Math.random() * 36) + 1);
  }

  const handleStart = () => {
    setTimeLeft(5);
    setIsStart(true);
    setCount(0)
  }

  const removeScoreRecord = async() => {
    await AsyncStorage.multiRemove(['roundOne_score', 'roundTwo_score', 'roundThree_score', 'roundFour_score', 'roundFive_score'])
      .then(() => {
        console.log(`Keys removed successfully!`);
      })
      .catch((error) => {
        console.log(`Error removing keys:`, error);
      });
  }


  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <View className="mt-12 items-center justify-center">
        <Text className="flex-row gap-5 items-center text-yellow-300 text-[25px]">Round 5</Text>
        <Text className="flex-row gap-5 items-center text-yellow-300 text-[25px] mt-1">Score: {count_5}</Text>


        <Text className="bg-yellow-50 opacity-0">Random Number: {randomNumber}</Text>
      </View>

      {
        isStart ?
        <View className="flex-1 justify-center items-center w-full h-1/2 p-1">
          {
            [0, 1, 2, 3, 4, 5].map((row) => (
              <View key={row} className="flex-row">
                {
                  [1, 2, 3, 4, 5, 6].map((col) => {
                    const circleNumber = row * 6 + col;
                    return (
                      <Circle
                        key={circleNumber}
                        isActive={randomNumber === circleNumber}
                        onPress={clickButton}
                      />
                    );
                  })
                }
              </View>
            ))
          }
        </View>
        :
        <View />
        }
      <View>
        {
          isStart === true ?
          <Text className="text-white text-[30px]">Timer: {timeLeft}</Text>
          :
          <View></View>

        }
        <TouchableOpacity className="rounded-lg w-28 h-16 bg-white items-center justify-center mt-3 mb-2" onPress={handleStart}>
          <Text className="text-[20px]">Start</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  size: {
    width: 50,
    height: 50,
  }
})

export default Round5