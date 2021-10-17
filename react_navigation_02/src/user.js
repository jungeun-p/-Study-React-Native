import React from 'react';
import 'react-native-gesture-handler';
import {Text, View, Button} from 'react-native';

const UserScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>User Screen</Text>
      <Button
        title="To Home Screen"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default UserScreen;
