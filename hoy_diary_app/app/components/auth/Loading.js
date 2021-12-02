import React, {useState} from 'react';
import {View, Animated} from 'react-native';
import {auth} from '../../utils/misc';
import LogoImage from '../../assets/images/Logo.png';
import {onAuthStateChanged} from 'firebase/auth';

const Loading = ({navigation}) => {
  const [animation, setAnimation] = useState({
    xValue: new Animated.Value(60),
    opacity: new Animated.Value(0),
  });

  const onLoad = () => {
    Animated.timing(animation.opacity, {
      toValue: 1,
      duration: 2500,
    }).start(() => {
      // main or login
      onComplete();
    });
  };

  const onComplete = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('AppTabComponent');
      } else {
        navigation.navigate('Sign In');
      }
    });
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Image
        source={LogoImage}
        style={{
          width: 80,
          height: 88,
          opacity: animation.opacity,
          left: animation.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [60, 0],
          }),
        }}
        onLoad={onLoad}
        // onLoad={() => onLoad()}
      />
    </View>
  );
};

export default Loading;
