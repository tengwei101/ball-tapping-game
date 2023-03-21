import { StyleSheet, Text, TouchableOpacity, View, Alert, BackHandler } from 'react-native';
import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';
import { playSound } from './Round1';


const Round2 = () => {
    const navigation = useNavigation();

    const [count_2, setCount] = useState(0);
    const [randomNumber, setRandomNumber] = useState(1);
    const [timeLeft, setTimeLeft] = useState(5);
    const [isStart, setIsStart] = useState(false)

    useFocusEffect(
      React.useCallback(() => {
        const handleBackButton = () => {
          // Add your custom back button handling logic here
          // Return 'true' if you want to prevent the default back button behavior
          removeScoreRecord();
          navigation.navigate("Home");
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
            'Do you want to continue to Round 3?',
            [
              {
                text: 'Yes',
                onPress: () => {
                  navigation.replace("Round3");
                  AsyncStorage.setItem('roundTwo_score', count_2.toString())
                    .then(() => {
                      console.log('Data stored successfully!');
                    })
                    .catch((error) => {
                      console.log('Error storing data:', error);
                    });
                },
              },
              {
                text: 'No',
                onPress: () => {
                  console.log('No pressed');
                  navigation.replace('Round1');
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
      setCount(count_2 + 1);
      setRandomNumber(Math.floor(Math.random() * 9) + 1);
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
          <Text className="flex-row gap-5 items-center text-yellow-300 text-[25px]">Round 2</Text>
          <Text className="flex-row gap-5 items-center text-yellow-300 text-[25px] mt-1">Score: {count_2}</Text>
  
  
          <Text className="bg-yellow-50 opacity-0">Random Number: {randomNumber}</Text>
        </View>
  
        {
          isStart === true ?
        <View className="flex-1 justify-center items-center">
          
          <View className="flex-row">
            {
              randomNumber === 1 ?
              <TouchableOpacity className="rounded-full bg-white w" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
            {
              randomNumber === 2 ?
              <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
            {
              randomNumber === 3 ?
              <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
          </View>
  
          <View className="flex-row">
            {
              randomNumber === 4 ?
              <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
            {
              randomNumber === 5 ?
              <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
            {
              randomNumber === 6 ?
              <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
          </View>
  
          <View className="flex-row">
            {
              randomNumber === 7 ?
              <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
            {
              randomNumber === 8 ?
              <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
            {
              randomNumber === 9 ?
              <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
            }
          </View>
    
          </View> :
          <View></View>
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

const style = StyleSheet.create({
  size: {
    width: 125,
    height: 125,
  }
})

export default Round2