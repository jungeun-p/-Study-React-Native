import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Logo from './assets/pics/Ham.jpeg';

const MyDrawer = props => {
  const navigateToScreen = route => () => {
    props.navigation.dispatch(
      CommonActions.navigate({
        name: route,
        params: {},
      }),
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.imagecontainer}>
            <Image source={Logo} style={{width: 40, height: 40}} />
          </View>
          <Text style={styles.sectionHeading}>Section 1</Text>
          <View style={styles.navSectionStyle}>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Home')}>
              Home
            </Text>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('User')}>
              User
            </Text>
            <Text style={styles.navItemStyle} onPress={() => alert('Info')}>
              Info
            </Text>
            <Text style={styles.navItemStyle} onPress={() => alert('Help')}>
              Help
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{paddingLeft: 20, paddingBottom: 30}}>
        <Text>Copyright @ Je, 2020.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  imagecontainer: {
    alignItems: 'center',
    padding: 50,
  },
  sectionHeading: {
    color: '#fff',
    backgroundColor: '#ef9de4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
  navSectionStyle: {
    backgroundColor: '#04b6ff',
  },
  navItemStyle: {
    padding: 10,
    color: '#fff',
  },
});

export default MyDrawer;
