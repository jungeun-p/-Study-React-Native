import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const Generator = ({onAddRandomNum}) => {
  return (
    <View style={styles.generator}>
      <Button title="Add Number" onPress={onAddRandomNum} />
    </View>
  );
};

const styles = StyleSheet.create({
  generator: {
    backgroundColor: '#D197CF',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default Generator;
