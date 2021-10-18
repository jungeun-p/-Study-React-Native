import React from 'react';
import 'react-native-gesture-handler';
import {View, Text, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>home screen</Text>
      <Button
        title="To User Screen"
        onPress={() => {
          navigation.navigate('User', {
            userIdx: 100,
            userName: 'Seokjin',
            userLastName: 'Kim',
          });
        }}
      />
      <Button
        title="Change the Title"
        onPress={() => {
          navigation.setOptions({
            title: 'Changed!!!',
            headerStyle: {
              backgroundColor: 'pink',
            },
            headerTintColor: 'red',
          });
        }}
      />
    </View>
  );
};

export default HomeScreen;
