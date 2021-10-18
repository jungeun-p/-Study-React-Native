import React from 'react';
import {Image} from 'react-native';
import HomeIcon from '../src/assets/pics/home.png';

const LogoTitle = () => {
  return (
    <Image
      source={HomeIcon}
      style={{
        width: 30,
        height: 30,
      }}
    />
  );
};

export default LogoTitle;
