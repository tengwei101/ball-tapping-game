import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/core'


const Result = () => {

  const navigation = useNavigation();

  const [roundOne_score, setRoundOneScore] = useState('');
  const [roundTwo_score, setRoundTwoScore] = useState('');
  const [roundThree_score, setRoundThreeScore] = useState('');
  const [roundFour_score, setRoundFourScore] = useState('');
  const [roundFive_score, setRoundFiveScore] = useState('');

  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // const [data, setData] = useState([]);

  const total_score = parseInt(roundOne_score) + parseInt(roundTwo_score) + parseInt(roundThree_score) + parseInt(roundFour_score) + parseInt(roundFive_score)

  AsyncStorage.getItem('roundOne_score')
  .then((value) => {
    setRoundOneScore(value)
    console.log('Data retrieved successfully:', roundOne_score);
  })
  .catch((error) => {
    console.log('Error retrieving data:', error);
  });

  AsyncStorage.getItem('roundTwo_score')
    .then((value) => {
      setRoundTwoScore(value)
      console.log('Data retrieved successfully:', roundTwo_score);
    })
    .catch((error) => {
      console.log('Error retrieving data:', error);
    });

  AsyncStorage.getItem('roundThree_score')
    .then((value) => {
      setRoundThreeScore(value)
      console.log('Data retrieved successfully:', roundThree_score);
    })
    .catch((error) => {
      console.log('Error retrieving data:', error);
    });

  AsyncStorage.getItem('roundFour_score')
    .then((value) => {
      setRoundFourScore(value)
      console.log('Data retrieved successfully:', roundFour_score);
    })
    .catch((error) => {
      console.log('Error retrieving data:', error);
    });

  AsyncStorage.getItem('roundFive_score')
    .then((value) => {
      setRoundFiveScore(value)
      console.log('Data retrieved successfully:', roundFive_score);
    })
    .catch((error) => {
      console.log('Error retrieving data:', error);
    });

  AsyncStorage.multiGet(['roundOne_score', 'roundTwo_score', 'roundThree_score', 'roundFour_score', 'roundFive_score'])
    .then((value) => {
      console.log(value);
    })
    .catch((error) => {
      console.log('Error retrieving data:', error);
    });

    

  const userData = { 
    name, 
    total_score,
  }; // Create an object with the user data

  const key = `@MySuperStore:${name}`; // Create a unique key for the user

  const removeScoreRecord = async() => {
    await AsyncStorage.multiRemove(['roundOne_score', 'roundTwo_score', 'roundThree_score', 'roundFour_score', 'roundFive_score'])
      .then(() => {
        console.log(`Keys removed successfully!`);
      })
      .catch((error) => {
        console.log(`Error removing keys:`, error);
      });
  }

  const handleSave = async() => {
    if (name.trim() === ''){
      Alert.alert('Error', 'Please Enter Your Name.')
      return;
    }
    
    await AsyncStorage.setItem(key, JSON.stringify(userData))
    .then(() => {
      Alert.alert('Success', `Data for ${name} saved successfully!`, [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Leaderboard');
          },
        },
      ]);
    })
    .catch((error) => {
      console.log(`Error saving data for ${name}:`, error);
    });

    removeScoreRecord();
    
    await AsyncStorage.getAllKeys()
      .then((keys) => {
        console.log('All keys retrieved successfully:', keys);
      })
      .catch((error) => {
        console.log('Error retrieving keys:', error);
      });
  }

  const checkTop25 = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(allKeys);
      const parsedData = data.map(([key, value]) => ({
        name: JSON.parse(value).name,
        total_score: JSON.parse(value).total_score,
      }));
  
      const sortedData = parsedData.sort((a, b) => b.total_score - a.total_score);
      const top25 = sortedData.slice(0, 25);
  
      if (total_score > top25[24]?.total_score || top25.length < 25) {
        Alert.alert('Congratulations!', 'You are in the top 25. Please enter your name.');
        setShowNameInput(true);
      } else {
        Alert.alert('Sorry!', 'Your score is not in the top 25.');
        setShowNameInput(false);
      }
    } catch (error) {
      console.log('Error checking top 25:', error);
    }
  };

  useEffect(() => {
    checkTop25();
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const allKeys = await AsyncStorage.getAllKeys();
  //       const data = await AsyncStorage.multiGet(allKeys);
  //       setData(data); // set state with the retrieved data
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, []);


  const handleBack = async() => {
    removeScoreRecord();
    navigation.replace("Home")
  }

  const handleLeaderboard = async() => {
    removeScoreRecord();
    navigation.replace("Leaderboard")
  }


  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <View className="items-center justify-center">
        {showNameInput && (
          <TextInput
            className="rounded-lg bg-white/90 w-48 pb-3 pt-3 pl-3 mb-3"
            placeholder="Name"
            value={name}
            maxLength={15}
            onChangeText={(text) => setName(text)}
          />
        )}
            <Text className="text-white text-[30px]">Result</Text>
            <Text className="text-white text-[30px]">Round 1: {roundOne_score}</Text>
            <Text className="text-white text-[30px]">Round 2: {roundTwo_score}</Text>
            <Text className="text-white text-[30px]">Round 3: {roundThree_score}</Text>
            <Text className="text-white text-[30px]">Round 4: {roundFour_score}</Text>
            <Text className="text-white text-[30px]">Round 5: {roundFive_score}</Text>

            <Text className="text-white text-[30px]">Total: { total_score }</Text>
        </View>

        <View className="flex-row items-center justify-center h-48 gap-8">
          <TouchableOpacity className="bg-cyan-400 rounded-lg h-12 items-center justify-center w-28" onPress={handleSave}>
                <Text className="text-[16px]">Save Record</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-cyan-400 rounded-lg h-12 items-center justify-center w-28" onPress={handleLeaderboard}>
                <Text className="text-[16px]">Leaderboard</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center h-10 gap-8">
          

          <TouchableOpacity className="bg-cyan-400 rounded-lg h-12 items-center justify-center w-28" onPress={handleBack}>
                <Text className="text-[16px]">Back</Text>
          </TouchableOpacity>
        </View>

        

    </SafeAreaView>
  )
}

export default Result