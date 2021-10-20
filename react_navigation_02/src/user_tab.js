import React from 'react';
import {Text, View} from 'react-native';

const UserTab = ({route}) => {
  console.warn(route);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>UserScreen</Text>
    </View>
  );
};

export default UserTab;
