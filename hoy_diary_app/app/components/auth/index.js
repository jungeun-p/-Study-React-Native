import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {getTokens, setTokens} from '../../utils/misc';
import AuthForm from './authForm';
import AuthLogo from './authLogo';
import {autoSignIn} from '../../store/actions/user_actions';
import {useDispatch, useSelector} from 'react-redux';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AuthComponent = ({navigation}) => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const user = useSelector(state => state.User);
  const {auth} = useSelector(state => state.User);

  const goWithoutLogin = () => {
    navigation.navigate('AppTabComponent');
  };

  useEffect(() => {
    // async-storeage에 저장된 token 불러오기.
    // 앱이 실행될 때마다 불러와야 로그인이 유지된다.
    /**
     *
     * value...
     *['@hoydiary_app@userId', '...'],
      '@hoydiary_app@token',
      '@hoydiary_app@refToken',
     */
    // useEffect를 통해서 자동으로 asyncStorage의 토큰을 출력
    getTokens(value => {
      // token값이 null이라면 로그인 화면으로 처리
      // => Login 정보가 없을 때로 변경.
      if (value[1][1] !== null) {
        // 자동 로그인 action 전달
        dispatch(autoSignIn(value[2][1]))
          .then(() => {
            // 현재 auth state에 토큰이 없다면
            // => token이 존재할 때로 변경.
            if (auth?.token) {
              // token 갱신 후 자동으로 로그인 처리
              setTokens(auth, () => goWithoutLogin());
            }
          })
          .catch(error => console.log(error));
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <AuthLogo />
        <AuthForm goWithoutLogin={goWithoutLogin} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 130,
    paddingTop: 130,
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default AuthComponent;
