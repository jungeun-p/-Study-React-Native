import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import AuthForm from './authForm';
import AuthLogo from './authLogo';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AuthComponent = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const goWithoutLogin = () => {
    navigation.navigate('AppTabComponent');
  };

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
