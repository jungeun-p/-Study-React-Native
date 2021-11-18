import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const DiaryDocu = ({...props}) => {
  const [diary, setDiary] = useState({
    newDiary: null,
    index: null,
    diaryData: {
      date: null,
      description: null,
      id: null,
      imagePath: null,
      title: null,
    },
  });
  // 화면에서 넘겨준 parameter = params.newDiary
  const params = props.route.params;
  useEffect(() => {
    if (!params.newDiary) {
      setDiary({
        ...diary,
        newDiary: params.newDiary,
        index: params.index,
        diaryData: params.diaryData.data,
      });
    } else {
      setDiary({
        ...diary,
        newDiary: true,
        index: params.index,
        diaryData: {id: params.id},
      });
    }
    console.log(diary);
  }, [diary.newDiary]);

  const onChangeInput = (item, value) => {
    if (item === 'date') {
      setDiary({...diary, diaryData: {...diary.diaryData, date: value}});
    } else if (item === 'title') {
      setDiary({...diary, diaryData: {...diary.diaryData, title: value}});
    } else if (item === 'description') {
      setDiary({...diary, diaryData: {...diary.diaryData, description: value}});
    }
  };

  return (
    <View style={styles.diaryContainer}>
      <View style={styles.indexView}>
        <Text style={styles.indexText}>#{diary.index + 1}</Text>
      </View>
      <View style={styles.dateView}>
        <Text style={styles.dateText}>Date</Text>
        <View style={styles.dateInputView}>
          {diary.newDiary ? (
            <TextInput
              value={diary.diaryData.date}
              style={{fontSize: 20, paddingTop: 0, paddingBottom: 0}}
              placeholder="date"
              placeholderTextColor="#777"
              onChangeText={value => onChangeInput('date', value)}
              editable={true}
            />
          ) : (
            <TextInput
              value={diary.diaryData.date}
              style={{
                fontSize: 20,
                paddingTop: 0,
                paddingBottom: 0,
                color: 'gray',
              }}
              editable={false}
            />
          )}
        </View>
      </View>
      <View style={styles.dateView}>
        <Text style={styles.dateText}>Title</Text>
        <View style={styles.dateInputView}>
          {diary.newDiary ? (
            <TextInput
              value={diary.diaryData.title}
              style={{fontSize: 20, paddingTop: 0, paddingBottom: 0}}
              placeholder="title"
              placeholderTextColor="#777"
              onChangeText={value => onChangeInput('title', value)}
              editable={true}
            />
          ) : (
            <TextInput
              value={diary.diaryData.title}
              style={{
                fontSize: 20,
                paddingTop: 0,
                paddingBottom: 0,
                color: 'gray',
              }}
              editable={false}
            />
          )}
        </View>
      </View>
      <View style={styles.descriptionView}>
        <Text style={styles.dateText}>Description</Text>
        <View style={[styles.dateInputView, styles.descriptionInputView]}>
          <ScrollView>
            {diary.newDiary ? (
              <TextInput
                value={diary.diaryData.description}
                style={{fontSize: 20, paddingTop: 0, paddingBottom: 0}}
                placeholder="description"
                placeholderTextColor="#777"
                onChangeText={value => onChangeInput('description', value)}
                editable={true}
                multiline={true}
              />
            ) : (
              <TextInput
                value={diary.diaryData.description}
                style={{
                  fontSize: 20,
                  paddingTop: 0,
                  paddingBottom: 0,
                  color: 'gray',
                }}
                placeholder="description"
                editable={false}
                multiline={true}
              />
            )}
          </ScrollView>
        </View>
      </View>
      <View style={{flex: 4, borderBottomWidth: 0.5}}>
        <Text>Image</Text>
      </View>
      <View style={{flex: 1.5, borderBottomWidth: 0.5}}>
        <Text>Button</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    flexDirection: 'column',
    // 큰 view의 값을 100% 처리 후 하위의 view는 비율만큼 가져가기.
    height: '100%',
    padding: 20,
  },
  indexView: {
    flex: 1,
    paddingLeft: 10,
    marginTop: 10,
  },
  indexText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dateText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  dateInputView: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 1,
    borderRadius: 1,
  },
  descriptionView: {
    flex: 7,
  },
  descriptionInputView: {
    flex: 0.95,
    marginTop: 5,
  },
});

export default DiaryDocu;
