import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {getTokens} from '../../utils/misc';
import AuthForm from './authForm';
import AuthLogo from './authLogo';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AuthComponent = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const goWithoutLogin = () => {
    navigation.navigate('AppTabComponent');
  };

  useEffect(() => {
    // async-storeage에 저장된 token 불러오기.
    // 앱이 실행될 때마다 불러와야 로그인이 유지된다.
    getTokens();
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View>
            <AuthLogo />
            <AuthForm goWithoutLogin={goWithoutLogin} />
          </View>
        </ScrollView>
      )}
    </>
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
