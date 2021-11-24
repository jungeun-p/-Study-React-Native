import {getDownloadURL, ref} from 'firebase/storage';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {storage} from '../../utils/misc';

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
    image: null,
  });
  // 화면에서 넘겨준 parameter = params.newDiary
  const params = props.route.params;

  const getImage = () => {
    getDownloadURL(ref(storage, `diaryImage/index${diary.diaryData.id}.jpg`))
      .then(url => {
        setDiary({...diary, image: url});
      })
      .catch(error => console.log(error));
  };

  const selectImage = () => {
    let imageDir = `diaryImage/index${diary.diaryData.id}`;
    launchImageLibrary(
      {
        noData: true,
      },
      response => {
        setDiary({
          ...diary,
          image: response.assets[0].uri,
          diaryData: {imagePath: imageDir},
        });
      },
    ).catch(error => {
      console.log(error);
    });
    // image path => imageDir로 업데이트 .
  };

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
    // newDiary false && imagePath true
    !params.newDiary && params.diaryData.data.imagePath ? getImage() : null;
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
      {/** Image View */}
      <View style={styles.imageView}>
        <View style={{flex: 10, marginTop: 15}}>
          <View style={[styles.imageDisplayView]}>
            {diary.diaryData.imagePath ? (
              <Image
                source={{uri: diary.image}}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            ) : null}
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        {diary.newDiary ? (
          <TouchableOpacity onPress={() => selectImage()}>
            <Text style={{fontSize: 14}}>📸</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{fontSize: 14, opacity: 0.2}}>📸</Text>
        )}
      </View>
      {/** date View */}
      <View style={styles.dateView}>
        <Text style={styles.dateText}>Date</Text>
        <View style={styles.dateInputView}>
          {diary.newDiary ? (
            <TextInput
              value={diary.diaryData.date}
              style={{fontSize: 14, paddingTop: 0, paddingBottom: 0}}
              placeholder="date"
              placeholderTextColor="#777"
              onChangeText={value => onChangeInput('date', value)}
              editable={true}
            />
          ) : (
            <TextInput
              value={diary.diaryData.date}
              style={{
                fontSize: 14,
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
              style={{fontSize: 14, paddingTop: 0, paddingBottom: 0}}
              placeholder="title"
              placeholderTextColor="#777"
              onChangeText={value => onChangeInput('title', value)}
              editable={true}
            />
          ) : (
            <TextInput
              value={diary.diaryData.title}
              style={{
                fontSize: 14,
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
        <View style={[styles.descriptionInputView]}>
          <ScrollView>
            {diary.newDiary ? (
              <TextInput
                value={diary.diaryData.description}
                style={{fontSize: 14, paddingTop: 0, paddingBottom: 0}}
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
                  fontSize: 14,
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
    flex: 0.5,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateInputView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1.4,
  },
  descriptionView: {
    flex: 3,
    marginTop: 10,
  },
  descriptionInputView: {
    flex: 0.95,
    marginTop: 5,
  },
  imageView: {
    flex: 7,
    // paddingTop: 4,
  },
  imageDisplayView: {
    flex: 0.9,
    // marginTop: 10,
  },
});

export default DiaryDocu;
