/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from './src/header';

const App = () => {
  state = {
    appName: 'My First App',
  };
  return (
    <View style={styles.mainView}>
      {/* <Header name={this.state.appName} /> */}
      <Text style={styles.mainText} onPress={() => alert('text touch event')}>
        HelloWorld
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subView: {
    backgroundColor: 'yellow',
    marginBottom: 10,
  },
  anotherSubView: {
    flex: 2,
    backgroundColor: 'yellow',
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // view에 속해있기 때문에 view Style을 따르게 된다.
  mainText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'red',
    padding: 20,
  },
});

export default App;
