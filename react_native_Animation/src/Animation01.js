import React, {useEffect, useState} from 'react';
import {Easing, Animated, StyleSheet, Text, View, Button} from 'react-native';

const AniOne = () => {
  const [square, setSquare] = useState(new Animated.Value(1));

  const runAnimation = () => {
    Animated.timing(square, {
      toValue: 0,
      duration: 2000,
      delay: 1500,
      //   easing: Easing.elastic(3),
    }).start();
  };

  //   useEffect(() => {
  //     Animated.timing(square, {
  //       toValue: {x: 50, y: 300},
  //       duration: 2000,
  //       delay: 1500,
  //       easing: Easing.elastic(3),
  //     }).start();
  //   }, [square]);

  return (
    <View>
      <Animated.View
        style={{
          opacity: square,
          transform: [
            {
              rotateX: square.interpolate({
                // starting, ending point
                // 작은 숫자부터 써 주어야 한다.
                inputRange: [0, 0.5, 1],
                // 0보다 큰 요소, 0
                // property를 top(y축 좌표)로 잡았기 때문에 endingpoint, startpoint
                // outputRange: [700, 0],
                outputRange: ['0deg', '180deg', '360deg'],
              }),
            },
            {
              translateX: square.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [300, 150, 0],
              }),
            },
          ],
          //   top: square.interpolate({
          //     // starting, ending point
          //     // 작은 숫자부터 써 주어야 한다.
          //     inputRange: [0, 1],
          //     // 0보다 큰 요소, 0
          //     // property를 top(y축 좌표)로 잡았기 때문에 endingpoint, startpoint
          //     outputRange: [700, 0],
          //   }),
        }}>
        <View style={styles.square}></View>
      </Animated.View>
      <Animated.Text
        style={{
          fontSize: square.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [40, 30, 20],
          }),
          color: square.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['red', 'green', 'purple'],
          }),
        }}>
        <Text>Animation Effects</Text>
      </Animated.Text>
      <Button title="animation start" onPress={runAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
  },
});

export default AniOne;
