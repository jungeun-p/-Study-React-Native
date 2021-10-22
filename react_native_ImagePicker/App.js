import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [avatar, setAvatar] = useState('');

  const addImage = () => {
    launchImageLibrary({}, response => {
      setAvatar(response.assets[0].uri);
    });
  };
  return (
    <View style={styles.mainView}>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <Button title="Add on Image" onPress={() => addImage()} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4ab26',
  },
  avatar: {
    width: '100%',
    height: 400,
  },
});

export default App;
