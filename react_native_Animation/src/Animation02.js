import React, {useEffect, useState} from 'react';
import {Easing, Animated, StyleSheet, Text, View, Button} from 'react-native';

const AniTwo = () => {
  const [square, setSquare] = useState({
    red: new Animated.Value(1),
    green: new Animated.ValueXY(0, 0),
    blue: new Animated.ValueXY(0, 0),
  });
  const runAnimation = () => {
    Animated.sequence([
      Animated.timing(square.red, {
        toValue: 0,
      }),
      Animated.parallel([
        Animated.spring(square.green, {
          toValue: {x: 200, y: 0},
        }),
        Animated.spring(square.blue, {
          toValue: {x: 200, y: 400},
        }),
      ]),
      //   Animated.spring(square.green, {
      //     toValue: {x: 200, y: 0},
      //   }),
      //   Animated.spring(square.blue, {
      //     toValue: {x: 200, y: 400},
      //   }),
    ]).start();
  };

  return (
    <View>
      <Animated.View
        style={{
          opacity: square.red,
        }}>
        <View style={styles.red}></View>
      </Animated.View>
      <Animated.View style={square.green.getLayout()}>
        <View style={styles.green}></View>
      </Animated.View>
      <Animated.View style={square.blue.getLayout()}>
        <View style={styles.blue}></View>
      </Animated.View>
      <Button title="Animation Start" onPress={runAnimation} />
      <Button
        title="Check the console"
        onPress={() => console.log('Buttton Touched!')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  red: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  green: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
  blue: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default AniTwo;
