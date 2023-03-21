
import React, {useState, useEffect} from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Round1 from './extraScreens/Round1';
import Round2 from './extraScreens/Round2';
import Round3 from './extraScreens/Round3';
import Result from './extraScreens/Result';
import Leaderboard from './extraScreens/Leaderboard';
import Round4 from './extraScreens/Round4';
import Round5 from './extraScreens/Round5';
import Game from "./screens/Game";
import Home from "./screens/Home";
import Game_2 from "./screens/Game_2";
import Game_3 from "./screens/Game_3";
import Game_4 from "./screens/Game_4";
import Game_5 from "./screens/Game_5";
import NormalResult from "./screens/NormalResult";
import NormalLeaderboard from "./screens/NormalLeaderboard";

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown : false}}>
        <Stack.Screen name='Home' component={Home}/>


        <Stack.Screen name='Game' component={Game}/>
        <Stack.Screen name='Game_2' component={Game_2}/>
        <Stack.Screen name='Game_3' component={Game_3}/>
        <Stack.Screen name='Game_4' component={Game_4}/>
        <Stack.Screen name='Game_5' component={Game_5}/>
        <Stack.Screen name='NormalResult' component={NormalResult}/>
        <Stack.Screen name='NormalLeaderboard' component={NormalLeaderboard}/>



        <Stack.Screen name='Round1' component={Round1}/>
        <Stack.Screen name='Round2' component={Round2}/>
        <Stack.Screen name='Round3' component={Round3}/>
        <Stack.Screen name='Round4' component={Round4}/>
        <Stack.Screen name='Round5' component={Round5}/>

        <Stack.Screen name='Result' component={Result}/>
        <Stack.Screen name='Leaderboard' component={Leaderboard}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
