import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button, Platform} from 'react-native';
import InputCommon from '../../utils/forms/input';
import validationRules from '../../utils/forms/validationRules';

import {useDispatch, useSelector} from 'react-redux';
import {signIn, signUp} from '../../store/actions/user_actions';
import {setTokens} from '../../utils/misc';

const AuthForm = ({goWithoutLogin}) => {
  const dispatch = useDispatch();
  const [types, setTypes] = useState({
    type: 'Login', // 로그인 / 등록
    action: 'Login', // 로그인 / 등록
    actionMode: 'New Register', // 회원가입 / 로그인
    hasErrors: false,
    form: {
      email: {
        value: '',
        type: 'textInput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        type: 'textInput',
        rules: {
          isRequired: true,
          minLength: 6,
        },
        valid: false,
      },
      confirmPassword: {
        value: '',
        type: 'textInput',
        rules: {
          confirmPassword: 'password',
        },
        valid: false,
      },
    },
  });

  // onchange
  const updateInput = (name, value) => {
    let formCopy = types.form;
    formCopy[name].value = value;

    // rules
    let rules = formCopy[name].rules;
    let valid = validationRules(value, rules, formCopy);
    formCopy[name].valid = valid;

    setTypes({...types, hasErrors: false, form: formCopy});
    // console.warn(types.form);
  };

  // jsx 반환
  const confirmPassword = () =>
    types.type !== 'Login' ? (
      <InputCommon
        value={types.form.confirmPassword.value}
        type={types.form.confirmPassword.type}
        secureTextEntry={true}
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

  // login, register form 타입 변경
  const changeForm = () => {
    setTypes({
      ...types,
      type: types.type === 'Login' ? 'Register' : 'Login',
      action: types.type === 'Login' ? 'Register' : 'Login',
      actionMode: types.type === 'Login' ? 'Go to Login' : 'Register',
    });
  };

  const submitUser = () => {
    // Init.
    let isFormValid = true;
    let submittedForm = {};
    const formCopy = types.form;
    // const {signIn, signUp} = this.props;

    for (let key in formCopy) {
      if (types.type === 'Login') {
        // login, password
        if (key !== 'confirmPassword') {
          // 모두 true일 때 전송.
          isFormValid = isFormValid && formCopy[key].valid;
          // 입력된 값 저장
          submittedForm[key] = formCopy[key].value;
        }
      } else {
        // login, password, passwordcheck
        isFormValid = isFormValid && formCopy[key].valid;
        // 입력된 값 저장
        submittedForm[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      //type = login
      if (types.type === 'Login') {
        dispatch(signIn(submittedForm))
          .then(() => {
            auth.userId && setTokens(auth, goWithoutLogin);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        dispatch(signUp(submittedForm));
      }
    } else {
      setTypes({hasErrors: true});
    }
  };

  const {auth} = useSelector(state => state.User);
  //dispatch action 콜백 함수.

  // const manageAccess = () => {
  //   auth?.userId
  //     ? setTokens(auth, goWithoutLogin)
  //     : setTypes({hasErrors: true});
  // };

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
        placeholder={'password'}
        placeholderTextColor="#ddd"
        onChangeText={value => updateInput('password', value)}
      />
      {confirmPassword()}
      {formHasErrors()}

      <View style={{marginTop: 40}}>
        <View style={styles.button}>
          <Button title={types.action} color="#48567f" onPress={submitUser} />
        </View>
        <View style={styles.button}>
          <Button
            title={types.actionMode}
            color="#48567f"
            onPress={changeForm}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'비회원 로그인'}
            onPress={goWithoutLogin}
            color="#48567f"
          />
        </View>
      </View>
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
  button: {
    ...Platform.select({
      ios: {marginTop: 15},
      android: {marginTop: 15, marginBottom: 15},
    }),
  },
});

// function mapStateToProps(state) {
//   return {
//     // React Native props : redux.store
//     User: state.User,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({signIn, signUp}, dispatch);
// }

export default AuthForm;
