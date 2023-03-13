import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, {useState, useEffect} from "react"
import {useNavigation} from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Round3 = () => {
  const navigation = useNavigation();

  const [count_3, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isStart, setIsStart] = useState(false)

  useEffect(() => {
    let timer;
    if (isStart && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      Alert.alert(
        'Time is up!',
        'Do you want to continue to Round 4?',
        [
          {
            text: 'Yes',
            onPress: () => {
              navigation.replace("Round4");
              AsyncStorage.setItem('roundThree_score', count_3.toString())
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
                navigation.replace("Round1")
            },
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
      setIsStart(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isStart]);



  const clickButton = () => {
    setCount(count_3 + 1);
    setRandomNumber(Math.floor(Math.random() * 16) + 1);
  }

  const handleStart = () => {
    setTimeLeft(5);
    setIsStart(true);
    setCount(0)
  }


  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <View className="mt-12 items-center justify-center">
        <Text className="flex-row gap-5 items-center text-yellow-300 text-[25px]">Round 3</Text>
        <Text className="flex-row gap-5 items-center text-yellow-300 text-[25px] mt-1">Score: {count_3}</Text>

        <Text className="bg-yellow-50 opacity-0">Random Number: {randomNumber}</Text>
      </View>

      {
        isStart === true ?
      <View className="flex-1 justify-center items-center w-full h-1/2 p-1">
        
        <View className="flex-row">
          {
            randomNumber === 1 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
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
          {
            randomNumber === 4 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
          }
        </View>

        <View className="flex-row">
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
        </View>

        <View className="flex-row">
          {
            randomNumber === 9 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
          }
          {
            randomNumber === 10 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
          }
          {
            randomNumber === 11 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
          }
          {
            randomNumber === 12 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
          }
        </View>  

        <View className="flex-row">
          {
            randomNumber === 13 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
          }
          {
            randomNumber === 14 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
          }
          {
            randomNumber === 15 ?
            <TouchableOpacity className="rounded-full bg-white" style={style.size} onPress={clickButton}></TouchableOpacity>
              :
              <View className="rounded-full bg-black" style={style.size}/>
          }
          {
            randomNumber === 16 ?
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
    width: 90,
    height: 90,
  }
})

export default Round3