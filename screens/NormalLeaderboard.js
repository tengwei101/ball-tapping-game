import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core'
import { useFocusEffect } from '@react-navigation/native';


const NormalLeaderboard = () => {
    const navigation = useNavigation();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  
  const fetchLeaderboardData = async () => {
    try {
      let data = await AsyncStorage.getItem('normal_leaderboard');
      if (data) {
        const parsedData = JSON.parse(data);
        const sortedData = parsedData.sort((a, b) => b.totalScore - a.totalScore);
        setLeaderboardData(sortedData);
      } 
      //comment the else statement if dont want to insert raw data
      //if no data then insert raw data
      // else {
      //   await insertSampleData();
      //   data = await AsyncStorage.getItem('normal_leaderboard');
      //   const parsedData = JSON.parse(data);
      //   const sortedData = parsedData.sort((a, b) => b.totalScore - a.totalScore);
      //   setLeaderboardData(sortedData);
      // }
    } catch (error) {
      console.log('Error fetching leaderboard data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        // Add your custom back button handling logic here
        // Return 'true' if you want to prevent the default back button behavior
        navigation.navigate("Home");
        return true;
      };
  
        // Add the event listener when the component mounts
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        // Clean up function
        return () => {
          // Remove the event listener when the component unmounts
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
      }, []),
    );

  useEffect(() => {
    fetchLeaderboardData();
  }, [refreshCount]);

  const insertSampleData = async () => {
    const names = [
      "Alice",
      "Bob",
      "Carol",
      "David",
      "Eva",
      "Frank",
      "Grace",
      "Hannah",
      "Ivan",
      "Jack",
      "Karen",
      "Leo",
      "Mona",
      "Nate",
      "Olivia",
      "Pete",
      "Quincy",
      "Rachel",
      "Sam",
      "Tina",
      "Uma",
      "Victor",
      "Wendy",
      "Xavier",
      "Yasmin",
    ];
  
    const leaderboardData = names.slice(0, 25).map((name) => ({
      name,
      totalScore: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
    }));
  
    await AsyncStorage.setItem('normal_leaderboard', JSON.stringify(leaderboardData));
  };
  
  

  const handleClear = () => {
    Alert.alert('Clear Records', 'Do you want to clear the normal leaderboard?', [
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('normal_leaderboard');
            setLeaderboardData([]); // Clear the list in the state
            setRefreshCount(refreshCount + 1);
  
            console.log('Normal leaderboard cleared!');
            Alert.alert('Success', 'The normal leaderboard has been cleared!');
          } catch (error) {
            console.log(error);
            Alert.alert('Error', error);
          }
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  const handleArcade = () =>{
    navigation.navigate('Leaderboard')
  }
  

  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.totalScore}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.listItem}>
        <Text style={styles.rank}>No</Text>
        <Text style={styles.name}>Player</Text>
        <Text style={styles.score}>Score</Text>
      </View>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Arcade" onPress={handleArcade} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginBottom: 10,
      width: '90%',
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      width: '100%',
      height: 40,
    },
    rank: {
      fontSize: 16,
      width: '10%',
      textAlign: 'center',
    },
    name: {
      fontSize: 16,
      width: '60%',
      textAlign: 'left',
    },
    score: {
      fontSize: 16,
      width: '30%',
      textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
      },
  });
  
export default NormalLeaderboard;
