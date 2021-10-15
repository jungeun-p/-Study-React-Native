import React, {useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const PickerComponent = () => {
  const [country, setCountry] = useState('Canada');
  const [value, setValue] = useState(50);
  const sliderValueChange = value => {
    setValue(value);
  };
  return (
    <View style={styles.mainView}>
      <Slider
        style={{height: 40, width: 300}}
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={sliderValueChange}
        maximumTrackTintColor="red"
        minimumTrackTintColor="blue"
        step={1}
      />
      <Text style={styles.input}>{value}</Text>
      <ActivityIndicator
        style={{paddingTop: 200}}
        size="large"
        color="green"
        animating={false}
        // 서버를 필요로 할 때 자료를 받는 중. 자료 수순이 완료되면 false 처리.
      />
      <Picker
        style={{height: 50, width: 250}}
        selectedValue={country}
        onValueChange={(val, idx) => setCountry(val)}>
        <Picker.Item label="Korea" value="Korea" />
        <Picker.Item label="Canada" value="Canada" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 20,
    marginBottom: 200,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginTop: 20,
    fontSize: 25,
  },
});

export default PickerComponent;
