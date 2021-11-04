import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const InputCommon = props => {
  return <TextInput {...props} style={styles.input} />;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    fontSize: 13,
    padding: 5,
    marginTop: 15,
    color: '#fff',
  },
});
export default InputCommon;
