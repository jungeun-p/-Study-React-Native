import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import AniOne from './src/Animation01';
import AniTwo from './src/Animation02';

const App = () => {
  return (
    <View style={styles.mainView}>
      {/* <AniOne /> */}
      <AniTwo />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});

export default App;
