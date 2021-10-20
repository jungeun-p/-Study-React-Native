import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text, View, Button} from 'react-native';

const HomeTab = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Home Stack Screen"
        onPress={() => {
          navigation.navigate('Home_Stack');
        }}
      />
    </View>
  );
};

export default HomeTab;
