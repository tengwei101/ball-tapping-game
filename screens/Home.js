import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const Home = ({ navigation }) => {
  const onNormalGamePress = () => {
    // Navigate to the Normal Game screen
    navigation.navigate('Game');
  };

  const onExtraGamePress = () => {
    // Navigate to the Extra Game screen
    navigation.navigate('Round1');
  };

  const onLeaderboardPress = () => {
    // Navigate to the Leaderboard screen
    navigation.navigate('Leaderboard');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/gameHomelogo.gif')} // Replace this with the path to your game logo
      />
      <TouchableOpacity style={styles.button} onPress={onNormalGamePress}>
        <Text style={styles.buttonText}>Normal Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onExtraGamePress}>
        <Text style={styles.buttonText}>Arcade Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onLeaderboardPress}>
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6A68BE",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#CAA7DD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default Home;
