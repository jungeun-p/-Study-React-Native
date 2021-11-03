import React from 'react';
import {Image, Text, View} from 'react-native';
import LogoImage from '../../assets/images/Logo.png';

const LogoComponent = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={LogoImage}
        resizeMethod={'contain'}
        style={{width: 80, height: 80}}
      />
    </View>
  );
};

export default LogoComponent;
