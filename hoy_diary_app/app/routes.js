import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignIn from './components/auth';
import Diary from './components/diary';
import News from './components/news';

const AuthStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();

const isLooggedIn = false;

const AppTabComponent = () => {
  return (
    <MainScreenTab.Navigator>
      <MainScreenTab.Screen
        options={{headerShown: false}}
        name="Diary"
        component={Diary}
      />
      <MainScreenTab.Screen
        options={{headerShown: false}}
        name="News"
        component={News}
      />
    </MainScreenTab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <AuthStack.Navigator>
      {isLooggedIn ? (
        <AuthStack.Screen name="Main" component={AppTabComponent} />
      ) : (
        <AuthStack.Screen name="Sign In" component={SignIn} />
      )}
    </AuthStack.Navigator>
  );
};
