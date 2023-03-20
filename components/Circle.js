import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

const Circle = ({ isLit, onPress, isClicked }) => {
  if (isClicked) {
    return <View style={[styles.circle, styles.clicked]} />;
  }

  if (isLit) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.circle, styles.lit]}
      />
    );
  }

  return <View style={[styles.circle, styles.unlit]} />;
};

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
  clicked: {
    backgroundColor: 'green',
  }
});

export default Circle;
