import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const InputCommon = props => {
  let template = null;
  switch (props.type) {
    case 'textInput':
      template = <TextInput {...props} style={styles.input} />;
      break;
    case 'textInputRevised':
      template = <TextInput {...props} style={styles.inputRevised} />;
      break;
    default:
      return template;
  }
  return template;
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
  inputRevised: {
    width: '100%',
    borderBottomWidth: 3,
    borderBottomColor: 'red',
    fontSize: 13,
    padding: 5,
    marginTop: 15,
    color: '#fff',
  },
});
export default InputCommon;
