
import React, {useState, useEffect} from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Round1 from './screens/Round1';
import Round2 from './screens/Round2';
import Round3 from './screens/Round3';
import Result from './screens/Result';
import Leaderboard from './screens/Leaderboard';
import TestGame from './screens/TestGame';
import Round4 from './screens/Round4';
import Round5 from './screens/Round5';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown : false}}>
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
