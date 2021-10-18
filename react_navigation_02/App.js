/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, Image, Button} from 'react-native';
import HomeScreen from './src/home';
import UserScreen from './src/user';
import LogoTitle from './src/logo';

const Stack = createStackNavigator();
// navigation prop을 각각의 Screen 컴포넌트에 전달.
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#cecece',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#f3d612',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home Screen',
            headerTitle: () => <LogoTitle />,
            headerRight: () => (
              <Button
                title="Info"
                onPress={() => alert('I am a button')}
                color="orange"
              />
            ),
          }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            title: 'User Screen',
            headerStyle: {
              backgroundColor: 'pink',
            },
            headerTintColor: 'red',
            headerTitleStyle: {
              fontWeight: 'bold',
              // color: 'purple',
            },
          }}
          initialParams={{
            userIdx: 40,
            userName: 'Namjoon',
            userLastName: 'Kim',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
