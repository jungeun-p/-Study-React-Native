import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import Ham from './assets/pics/Ham.jpeg';

const UserDrawer = ({navigation}) => {
  const drawerStyle = () => {
    navigation.setOptions({
      drawerIcon: () => <Image source={Ham} style={{width: 20, height: 20}} />,
    });
  };
  drawerStyle();
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

export default UserDrawer;
