import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { playSound } from "./Round1";


const Circle = ({ visible, onPress }) => {
  return visible ? (
    <TouchableOpacity
      className="rounded-full bg-white"
      style={style.size}
      onPress={onPress}
    ></TouchableOpacity>
  ) : (
    <View className="rounded-full bg-black" style={style.size} />
  );
};

const CircleGrid = ({ visibleIndex, onPress }) => {
  return (
    <View className="flex-1 justify-center items-center w-full h-1/2 p-1">
      {[...Array(5)].map((_, rowIndex) => (
        <View className="flex-row" key={rowIndex}>
          {[...Array(5)].map((_, colIndex) => {
            const index = rowIndex * 5 + colIndex + 1;
            return (
              <Circle
                key={index}
                visible={visibleIndex === index}
                onPress={onPress}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const Round4 = () => {
  const navigation = useNavigation();

  const [count_4, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isStart, setIsStart] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        // Add your custom back button handling logic here
        // Return 'true' if you want to prevent the default back button behavior
        removeScoreRecord();
        navigation.navigate("Home");
        return true;
      };
    let timer;
    if (isStart && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeIsUp();
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
    setCount(count_4 + 1);
    setRandomNumber(Math.floor(Math.random() * 25) + 1);
  };

  const handleTimeIsUp = () => {
    Alert.alert(
      "Time is up!",
      "Do you want to continue to Round 5?",
      [
        {
          text: "Yes",
          onPress: handleYes,
        },
        {
          text: "No",
          onPress: handleNo,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleYes = () => {
    navigation.replace("Round5");
    saveAndLogData();
  };

  const handleNo = () => {
    console.log("No pressed");
    navigation.replace("Round1");
    removeScoreRecord();
  };

  const saveAndLogData = () => {
    AsyncStorage.setItem("roundFour_score", count_4.toString())
      .then(() => {
        console.log("Data stored successfully!");
      })
      .catch((error) => {
        console.log("Error storing data:", error);
      });

    AsyncStorage.getAllKeys()
      .then((keys) => {
        console.log("All keys retrieved successfully:", keys);
      })
      .catch((error) => {
        console.log("Error retrieving keys:", error);
      });
    };

    const handleStart = () => {
    setTimeLeft(5);
    setIsStart(true);
    setCount(0);
    };

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
      <Text className="flex-row gap-5 items-center text-yellow-300 text-[25px]">
      Round 4
      </Text>
      <Text className="flex-row gap-5 items-center text-yellow-300 text-[25px] mt-1">
      Score: {count_4}
      </Text>
      <Text className="bg-yellow-50 opacity-0">
        Random Number: {randomNumber}
      </Text>
    </View>

    {isStart ? (
      <CircleGrid visibleIndex={randomNumber} onPress={clickButton} />
    ) : (
      <View />
    )}

    <View>
      {isStart ? (
        <Text className="text-white text-[30px] mb-2">Timer: {timeLeft}</Text>
      ) : (
        <View />
      )}
      {
          isStart === true ?
          <View/>
          :
          <TouchableOpacity className="rounded-lg w-28 h-16 bg-white items-center justify-center mt-3 mb-2" onPress={handleStart}>
          <Text className="text-[20px]">Start</Text>
          </TouchableOpacity>
        }
    </View>
</SafeAreaView>
);
};

const style = StyleSheet.create({
size: {
width: 70,
height: 70,
},
});

export default Round4;
    
