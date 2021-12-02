import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignIn from './components/auth';
import Diary from './components/diary';
import News from './components/news';

import DiaryDocu from './components/diary/diaryDocu';
import Logo from './utils/logo';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from './components/auth/Loading';

const AuthStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();
const DiaryStack = createStackNavigator();
const NewsStack = createStackNavigator();

const headerConfig = {
  headerTitle: () => <Logo />,
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
    color: '#fff',
  },
};
// const isLooggedIn = false;

const TabBarIcon = (focused, name) => {
  let iconName, iconSize, iconColor;
  if (name === 'Diarys') {
    iconName = 'notebook';
  } else if (name === 'News') {
    iconName = 'newspaper-variant-multiple';
  }
  iconSize = focused ? 28 : 25;
  iconColor = focused ? '#fff' : 'darkgray';
  return <Icon name={iconName} size={iconSize} color={iconColor} />;
};

//notebook
//newspaper-variant-multiple

const DiaryStackComponent = () => {
  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen
        name="Diary"
        component={Diary}
        options={headerConfig}
      />
      <DiaryStack.Screen
        name="DiaryDocu"
        component={DiaryDocu}
        options={headerConfig}
      />
    </DiaryStack.Navigator>
  );
};

const NewsStackComponent = () => {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="NewsDocu"
        component={News}
        options={headerConfig}
      />
    </NewsStack.Navigator>
  );
};

const AppTabComponent = () => {
  return (
    <MainScreenTab.Navigator
      initialRouteName="Diarys"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarActiveBackgroundColor: '#fff',
        // tabBarInactiveBackgroundColor: 'black',
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: 'black',
        },
        // Android에서 keyboard 설정시 TabBar를 숨겨준다.
        tabBarHideOnKeyboard: true,
      })}>
      <MainScreenTab.Screen name="Diarys" component={DiaryStackComponent} />
      <MainScreenTab.Screen name="News" component={NewsStackComponent} />
    </MainScreenTab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Loading" component={Loading} />
      <AuthStack.Screen name="Main" component={AppTabComponent} />
      <AuthStack.Screen name="AppTabComponent" component={AppTabComponent} />
      <AuthStack.Screen name="Sign In" component={SignIn} />
    </AuthStack.Navigator>
  );
};
