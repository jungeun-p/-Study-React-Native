import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// jsx 컴포넌트를 return할 때 소괄호 () 사용.
const header = props => (
  <TouchableOpacity
    style={styles.header}
    onPressIn={() => alert('hello, world')}>
    <View>
      <Text>{props.name}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'pink',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default header;
