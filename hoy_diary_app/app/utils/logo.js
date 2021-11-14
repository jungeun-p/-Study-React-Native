import React from 'react';
import {Image} from 'react-native';

const LogoTitle = () => {
  return (
    <Image
      source={require('../assets/images/Logo.png')}
      style={{width: 120, height: 30}}
      resizeMode="contain"
    />
  );
};
export default LogoTitle;
