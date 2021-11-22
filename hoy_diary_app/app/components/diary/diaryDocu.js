import {getDownloadURL, ref} from 'firebase/storage';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
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
    getDownloadURL(
      ref(storage, `diaryImage/index${diary.diaryData.id}/image.jpg`),
    )
      .then(url => {
        console.log(url);
        setDiary({...diary, image: url});
      })
      .catch(error => console.log(error));
    // getDownloadURL(storageRef)
    //   .then(res => {
    //     console.log(res);
    //     setDiary({...diary, image: res});
    //   })
    //   .catch(error => console.log(error));
    // storage
    //   .ref('diaryImage')
    //   .child(`index${diary.diaryData.id}/image.jpg`)
    //   .getDownloadURL()
    //   .then(url => setDiary({...diary, image: url}));
    // getDownloadURL(ref(storage, `index${cdiary.diaryData.id}/image.jpg`)).then(
    //   url => {
    //     setDiary({...diary, image: url});
    //   },
    // );
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
    console.log(diary.image);
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
      <View style={styles.imageView}>
        <View style={{flex: 10, paddingRight: 15}}>
          <Text style={styles.dateText}>Image </Text>
          <View style={[styles.dateInputView, styles.imageDisplayView]}>
            {diary.diaryData.imagePath ? (
              <Image
                source={{uri: diary.image}}
                style={{height: '100%', width: '100%'}}
              />
            ) : null}
          </View>
        </View>
        <View style={{flex: 1, pddingTop: 30, paddingRight: 10}}></View>
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
  imageView: {
    flex: 4,
    paddiingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
  },
  imageDisplayView: {
    flex: 0.9,
    marginTop: 5,
  },
});

export default DiaryDocu;
