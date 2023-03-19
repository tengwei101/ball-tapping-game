import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Circle_5 = ({ isLit, onPress }) => (
  <TouchableOpacity
    className="rounded-full"
    style={[styles.circle, isLit ? styles.lit : styles.unlit]}
    onPress={onPress}
  />
);

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
  },
  lit: {
    backgroundColor: 'yellow',
  },
  unlit: {
    backgroundColor: 'gray',
  },
});


export default Circle_5;
