import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Circle = ({ isLit, onPress }) => (
  <TouchableOpacity
    style={[styles.circle, isLit ? styles.lit : styles.unlit]}
    onPress={onPress}
  />
);

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  lit: {
    backgroundColor: 'yellow',
  },
  unlit: {
    backgroundColor: 'gray',
  },
});

export default Circle;
