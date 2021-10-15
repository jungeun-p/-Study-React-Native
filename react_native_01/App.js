/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  ScrollView,
  Text,
} from 'react-native';
import Header from './src/header';
import Generator from './src/generator';
import NumList from './src/numlist';
import Input from './src/input';
import PickerComponent from './src/picker';

const App = () => {
  // state = {
  //   appName: 'My First App',
  // };
  // const [num, setNum] = useState([43, 25]);
  const [text, setText] = useState({
    myTextInput: '',
    alphabet: ['a', 'b', 'c', 'd'],
  });

  const onChangeInput = e => {
    // event라는 인자를 받아와, textInput 값을 업데이트.
    setText(state => ({...state, myTextInput: e}));
  };

  // const onAddRandomNum = () => {
  //   const randomNum = Math.floor(Math.random() * 100) + 1;
  //   setNum(state => [...state, randomNum]);
  // };

  // const onNumDelete = position => {
  //   const newArray = num.filter((num, index) => position !== index);
  //   setNum(newArray);
  // };

  const onAddTextInput = () => {
    setText(state => ({
      myTextInput: '',
      alphabet: [...state.alphabet, state.myTextInput],
    }));
    // setText(state => ({
    //   ...state,
    //   myTextInput: '',
    //   alphabet: [...state.alphabet, state.myTextInput],
    // }));
  };

  return (
    <View style={styles.mainView}>
      <PickerComponent />
      {/* <Header name={this.state.appName} />
      <View>
        <Text style={styles.mainText} onPress={() => alert('text touch event')}>
          HelloWorld
        </Text>
      </View>s
      <Generator onAddRandomNum={onAddRandomNum} />
      <ScrollView
        style={{width: '100%'}}
        // onMomentumScrollBegin={() => alert('begin')}
        // onMomentumScrollEnd={() => alert('end')}
        // onScroll={() => alert('Scrolling')}
        // onContentSizeChange={(width, height) => alert(height)}
        bounces={true}>
        <NumList num={num} onNumDelete={onNumDelete} />
      </ScrollView> */}
      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeInput}
        value={text.myTextInput}
        name="myTextInput"
        multiline={true}
        // maxLength={10}
      />
      <Button title="Add Text Input" onPress={onAddTextInput} />
      <ScrollView style={{width: '100%'}}>
        {text.alphabet.map((item, idx) => (
          <Text key={idx} style={styles.mainText}>
            {item}
          </Text>
        ))}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  subView: {
    backgroundColor: 'yellow',
    marginBottom: 10,
  },
  anotherSubView: {
    flex: 2,
    backgroundColor: 'yellow',
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // view에 속해있기 때문에 view Style을 따르게 된다.
  mainText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'red',
    padding: 20,
    margin: 20,
    backgroundColor: 'pink',
  },
  input: {
    width: '100%',
    backgroundColor: '#cecece',
    marginTop: 20,
    fontSize: 25,
    padding: 10,
  },
});

export default App;
