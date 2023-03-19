import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core'


const Leaderboard = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [refreshCount, setRefreshCount] = useState(0);


    useEffect(() => {
        const getData = async () => {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            const data = await AsyncStorage.multiGet(allKeys);
            const parsedData = data.map(([key, value]) => ({
                name: JSON.parse(value).name,
                total_score: JSON.parse(value).total_score,
            }));

        const sortedData = parsedData.sort((a, b) => b.total_score - a.total_score);
        setData(sortedData); // set state with the sorted data
        } catch (error) {
            console.log(error);
        }
        };
        getData();
    }, [refreshCount]);
    

  const renderItem = ({ item, index }) => {
    return (
      <View className="flex-row items-center justify-between p-[10] border-b-2 w-full border-b-yellow-500">
        <Text className="text-[18px] font-bold text-white">{index + 1}</Text>
        <Text className="text-[18px] font-bold text-white">{item.name}</Text>
        <Text className="text-[18px] text-white">{item.total_score}</Text>
      </View>
    );
  };

  // only show top 25 players
  const limitData = data.slice(0, 25);

  const handleBack = () => {
    navigation.replace("Home")
  }

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <View className="items-center justify-center p-10 flex-row gap-7">
            <View style={{width: 100, height: 100, borderRadius: 50, overflow: 'hidden'}}>
                <Image style={{width: 100, height: 100, borderRadius: 50}}
                    source={require('../assets/leaderboard-symbol-svg.gif')}/>
            </View>
            <View>
                <Text className="text-[25px] font-semibold text-white">Leaderboard</Text>
            </View>
        </View>

        <View className="flex-row items-center justify-between p-[10] border-b-2 w-full border-b-yellow-500">
        <Text className="text-[18px] font-bold text-white">No</Text>
        <Text className="text-[18px] font-bold text-white">Player</Text>
        <Text className="text-[18px] text-white">Score</Text>
      </View>

      <FlatList
        data={limitData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name + index}
        style={{ width: '100%' }}
      />
    <View className="flex-row items-center justify-center h-48 gap-8">
    <TouchableOpacity className="bg-cyan-400 rounded-lg h-12 items-center justify-center w-28" onPress={handleBack}>
        <Text className="text-[16px]">Back</Text>
    </TouchableOpacity>

    <TouchableOpacity className="bg-cyan-400 rounded-lg h-12 items-center justify-center w-28" onPress={handleRefresh}>
        <Text className="text-[16px]">Refresh</Text>
    </TouchableOpacity>
    </View>

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width: '100%',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    total_score: {
      fontSize: 18,
    },
  });

export default Leaderboard;
