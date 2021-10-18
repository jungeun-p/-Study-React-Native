import React from 'react';
import 'react-native-gesture-handler';
import {Text, View, Button} from 'react-native';

const UserScreen = ({navigation, route}) => {
  const HeaderStyle = () => {
    navigation.setOptions({
      title: 'Customizing',
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: 'yellow',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'green',
      },
      headerBackTitle: 'BACK',
      headerRight: () => (
        <Button
          title="Go Back"
          onPress={() => {
            navigation.navigate('Home');
          }}
          color="orange"
        />
      ),
    });
  };
  HeaderStyle();
  const {params} = route;
  const userIdx = params ? params.userIdx : null;
  const userName = params ? params.userName : null;
  const userLastName = params ? params.userLastName : null;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>User Screen</Text>
      <Button
        title="To Home Screen"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <Text>User Idx:{JSON.stringify(userIdx)}</Text>
      <Text>User userName:{JSON.stringify(userName)}</Text>
      <Text>User userLastName:{JSON.stringify(userLastName)}</Text>
    </View>
  );
};

export default UserScreen;
