import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const Input = () => {
  const [textInput, setTextInput] = useState('asdf');

  const onChange = e => {
    // event라는 인자를 받아와, textInput 값을 업데이트.
    setTextInput({textInput: e});
  };
  return (
    <View style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={textInput}
        multiline={true}
        maxLength={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: '#cecece',
    marginTop: 20,
    fontSize: 25,
    padding: 10,
  },
});

export default Input;
