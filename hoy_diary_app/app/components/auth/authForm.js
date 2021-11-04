import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import InputCommon from '../../utils/forms/input';

const AuthForm = () => {
  const [myTextInput, setmyTestInput] = useState('');
  return (
    <View>
      <InputCommon
        value={myTextInput}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        placeholder={'email address'}
        placeholderTextColor="#ddd"
      />
      <InputCommon
        value={myTextInput}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        placeholder={'password'}
        placeholderTextColor="#ddd"
      />
      <InputCommon
        value={myTextInput}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        placeholder={'password check'}
        placeholderTextColor="#ddd"
      />
    </View>
  );
};

export default AuthForm;
