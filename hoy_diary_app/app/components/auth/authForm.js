import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import InputCommon from '../../utils/forms/input';

const AuthForm = () => {
  const [types, setTypes] = useState({
    type: 'Login',
    action: 'Login',
    actionMode: 'register',
    hasErrors: true,
    form: {
      email: {
        value: '',
        type: 'textInput',
        rules: {},
      },
      password: {
        value: '',
        type: 'textInput',
        rules: {},
        valid: false,
      },
      confirmPassword: {
        value: '',
        type: 'textInput',
        rules: {},
        valid: false,
      },
    },
  });

  const updateInput = (name, value) => {
    setTypes({hasErrors: false});
    let formCopy = types.form;
    formCopy[name].value = value;
    setTypes({form: formCopy});
    console.warn(types.form);
  };

  // jsx 반환
  const conformPassword = () =>
    types.type !== 'Login' ? (
      <InputCommon
        value={types.form.confirmPassword.value}
        type={types.form.confirmPassword.type}
        secureTextEntry={true}
        keyboardType={'email-address'}
        placeholder={'password check'}
        placeholderTextColor="#ddd"
        onChangeText={value => updateInput('confirmPassword', value)}
      />
    ) : null;

  // jsx 반환
  const formHasErrors = () =>
    types.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>check the information of Login</Text>
      </View>
    ) : null;

  return (
    <View>
      <InputCommon
        value={types.form.email.value}
        type={types.form.email.type}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        placeholder={'email address'}
        placeholderTextColor="#ddd"
        onChangeText={value => updateInput('email', value)}
      />
      <InputCommon
        value={types.form.password.value}
        type={types.form.password.type}
        secureTextEntry={true}
        keyboardType={'email-address'}
        placeholder={'password'}
        placeholderTextColor="#ddd"
        onChangeText={value => updateInput('password', value)}
      />
      {conformPassword()}
      {formHasErrors()}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ee3344',
  },
  errorLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlignVertical: 'cneter',
    textAlign: 'center',
  },
});

export default AuthForm;
