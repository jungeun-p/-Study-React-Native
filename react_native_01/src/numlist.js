import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const Numlist = ({random}) => {
  return (
    <View style={styles.numList} key={idx}>
      <Text>{random}</Text>
    </View>
  );
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
