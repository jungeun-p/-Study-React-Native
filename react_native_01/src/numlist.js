import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Numlist = ({num, onNumDelete}) => {
  return num.map((item, index) => (
    <TouchableOpacity
      style={styles.numList}
      key={index}
      onPress={() => onNumDelete(index)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  numList: {
    backgroundColor: '#cecece',
    alignItems: 'center',
    padding: 5,
    width: '100%',
    marginTop: 5,
  },
});
export default Numlist;
