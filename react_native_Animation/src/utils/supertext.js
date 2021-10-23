import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Supertext = props => {
  return (
    <Text
      // {...props}
      // style={styles.supertext}
      //styles.supertext를 기본으로 하되, props로 전달된 style을 적용.
      style={[styles.supertext, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  supertext: {
    backgroundColor: 'skyblue',
    fontSize: 25,
    color: 'blue',
    padding: 15,
    width: 300,
  },
});

export default Supertext;
