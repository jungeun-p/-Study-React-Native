import React from 'react';
import {Image, Text, View} from 'react-native';
import LogoImage from '../../assets/images/Logo.png';

const LogoComponent = () => {
  return (
    <View style={{alignItems: 'center', marginBottom: 30}}>
      <Image
        source={LogoImage}
        resizeMethod={'auto'}
        style={{width: 95, height: 90}}
      />
    </View>
  );
};

export default LogoComponent;
