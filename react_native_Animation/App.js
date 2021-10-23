import React from 'react';

import {Dimensions, Platform, StyleSheet, View, Text} from 'react-native';
import AniOne from './src/Animation01';
import AniTwo from './src/Animation02';
import Supertext from './src/utils/supertext';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  const checkSupport = () => {
    if (Platform.OS === 'ios') {
      if (Platform.Version > 10.0) {
        return false;
      }
    } else {
      if (Platform.Version < 27) {
        return false;
      }
    }
    return true;
  };
  const A = () => {
    if (Dimensions.get('window').fontScale === 1) {
      console.warn('good');
    } else {
      console.warn('Error!');
    }
  };
  // console.warn(Dimensions.get('screen'));
  // console.warn(Dimensions.get('window'));
  console.warn(DeviceInfo.isTablet());
  return (
    <View style={styles.mainView}>
      {
        // checkSupport() ? (
        //   <Supertext style={styles.div}>
        //     {/* This is my template */}
        //     {Platform.OS === 'ios'
        //       ? 'This is my iOS phone'
        //       : 'This is my Android phone'}
        //   </Supertext>
        // ) : (
        //   <Text>Sorry, your phone is not being supported by the app</Text>
        // )
      }
      {A()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    ...Platform.select({
      ios: {
        backgroundColor: 'yellow',
      },
      android: {
        backgroundColor: 'red',
      },
    }),
  },
});

export default App;
