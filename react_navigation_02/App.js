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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, Image, Button, Linking} from 'react-native';
import HomeScreen from './src/home';
import UserScreen from './src/user';
import LogoTitle from './src/logo';
import HomeDrawer from './src/home_drawer';
import UserDrawer from './src/user_drawer';
import Ham from './src/assets/pics/Ham.jpeg';
import Home from './src/assets/pics/home.png';
import Coffee from './src/assets/pics/coffee.jpeg';
import MyDrawer from './src/my_drawer';
import HomeTab from './src/home_tab';
import UserTab from './src/user_tab';
import MessageTab from './src/message_tab';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const Stack = createStackNavigator();
// navigation prop을 각각의 Screen 컴포넌트에 전달.
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabBarIcon = (focused, name) => {
  //let iconImagePath;
  let iconName;
  if (name === 'Home') {
    iconName = 'home-outline';
    //iconImagePath = Home;
  } else if (name === 'User') {
    iconName = 'people-outline';
    //iconImagePath = Ham;
  } else if (name === 'Message') {
    iconName = 'mail';
    //iconImagePath = Coffee;
  }
  let iconSize = focused ? 30 : 20;
  return (
    // <Image
    //   style={{width: focused ? 24 : 20, height: focused ? 24 : 20}}
    //   source={iconImagePath}
    // />
    <Ionicons name={iconName} size={iconSize} />
  );
};

const App = () => {
  // const CustomDrawerContent = props => {
  //   return (
  //     <DrawerContentScrollView {...props}>
  //       <DrawerItemList {...props} />
  //       <DrawerItem
  //         label="Help"
  //         onPress={() => Linking.openURL('http://www.google.com')}
  //         icon={() => <LogoTitle />}
  //       />
  //       <DrawerItem label="Info" onPress={() => alert('Info Window')} />
  //     </DrawerContentScrollView>
  //   );
  // };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        // screenOptions={{
        //   tabBarActiveBackgroundColor: 'skyblue',
        // }}
        screenOptions={({route}) => ({
          tabBarLabel: route.name,
          tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
          tabBarActiveBackgroundColor: 'skyblue',
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#c6cbef',
          },
          tabBarLabelPosition: 'below-icon',
        })}>
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="User" component={UserTab} />
        <Tab.Screen name="Message" component={MessageTab} />
      </Tab.Navigator>
    </NavigationContainer>
    // Drawer
    // <NavigationContainer>
    //   <Drawer.Navigator
    //     initialRouteName="Home"
    //     screenOptions={{
    //       drawerType: 'front',
    //       drawerPosition: 'left',
    //       drawerStyle: {
    //         backgroundColor: '#c6cbef',
    //         width: 200,
    //       },
    //       drawerActiveTintColor: 'red',
    //       drawerActiveBackgroundColor: 'blue',
    //     }}
    //     // drawerContent를 렌더링하기 위핸 리액트 요소를 반환.
    //     drawerContent={props => (
    //       //<CustomDrawerContent {...props} />
    //       <MyDrawer {...props} />
    //     )}>
    //     <Drawer.Screen
    //       name="Home"
    //       component={HomeDrawer}
    //       options={{
    //         drawerIcon: () => (
    //           <Image source={Ham} style={{width: 20, height: 20}} />
    //         ),
    //       }}
    //     />
    //     <Drawer.Screen name="User" component={UserDrawer} />
    //   </Drawer.Navigator>
    // </NavigationContainer>
    // Stack
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Home"
    //     screenOptions={{
    //       headerStyle: {
    //         backgroundColor: '#cecece',
    //       },
    //       headerTintColor: '#fff',
    //       headerTitleStyle: {
    //         fontWeight: 'bold',
    //         color: '#f3d612',
    //       },
    //     }}>
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{
    //         title: 'Home Screen',
    //         headerTitle: () => <LogoTitle />,
    //         headerRight: () => (
    //           <Button
    //             title="Info"
    //             onPress={() => alert('I am a button')}
    //             color="orange"
    //           />
    //         ),
    //       }}
    //     />
    //     <Stack.Screen
    //       name="User"
    //       component={UserScreen}
    //       options={{
    //         title: 'User Screen',
    //         headerStyle: {
    //           backgroundColor: 'pink',
    //         },
    //         headerTintColor: 'red',
    //         headerTitleStyle: {
    //           fontWeight: 'bold',
    //           // color: 'purple',
    //         },
    //       }}
    //       initialParams={{
    //         userIdx: 40,
    //         userName: 'Namjoon',
    //         userLastName: 'Kim',
    //       }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
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
