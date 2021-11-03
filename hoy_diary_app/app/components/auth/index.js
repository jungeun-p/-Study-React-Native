import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AuthForm from './authForm';
import AuthLogo from './authLogo';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AuthComponent = () => {
  const [loading, setLoading] = useState(false);
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
            <AuthForm />
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
    paddingTop: 300,
    color: 'white',
  },
});

export default AuthComponent;
