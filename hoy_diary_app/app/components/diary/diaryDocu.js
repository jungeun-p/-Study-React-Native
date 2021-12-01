import {set, ref as dbRef} from 'firebase/database';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {database, storage} from '../../utils/misc';

const DiaryDocu = ({...props}) => {
  const [diary, setDiary] = useState({
    newDiary: null,
    isLoading: false,
    index: null,
    diaryData: {
      date: null,
      description: null,
      id: null,
      imagePath: null,
      title: null,
    },
    image: null,
    userId: null,
  });
  // 화면에서 넘겨준 parameter = params.newDiary
  const params = props.route.params;

  // 이미지 가져오기
  const getImage = () => {
    getDownloadURL(
      ref(
        storage,
        `diaryImage/${diary.userId}/${diary.diaryData.imagePath}/image.jpg`,
      ),
    )
      .then(url => {
        setDiary({...diary, image: url});
      })
      .catch(error => console.log(error));
  };

  // 이미지 선택
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
          diaryData: {...diary.diaryData, imagePath: imageDir},
        });
      },
    ).catch(error => {
      console.log(error);
    });
    // image path => imageDir로 업데이트 .
  };

  const updateData = () => {
    setDiary({...diary, newDiary: true});
  };
  const deleteData = async () => {
    const id = diary.diaryData.id;
    const databaseDirectory = `diary/${id}`;
    const storageDirectory = `diaryImage/index${id}.jpg`;
    const databaseRef = dbRef(database, databaseDirectory);
    const storageRef = ref(storage, storageDirectory);

    try {
      await set(databaseRef, null);
      await deleteObject(storageRef)
        .then(() => {
          props.navigation.push('Diary');
        })
        .catch(() => {
          props.navigation.push('Diary');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadData = async () => {
    setDiary({...diary, isLoading: true});
    const data = diary.diaryData;
    const id = data.id;
    // firebase 객체의 이름과 맞춰서 data
    const dataBaseDirectory = `diary/${id}`;
    const storageDirectory = `diaryImage/index${id}.jpg`;
    try {
      // dataBase를 사용
      await set(dbRef(database, dataBaseDirectory), {data});
      // upload 완료시 image upload 함수 실행
      uploadImage(storageDirectory);
    } catch (e) {
      setDiary({...diary, isLoading: false});
      alert('저장 실패' + e);
    }
  };

  const uploadImage = async imageDirectory => {
    if (diary.image) {
      // fetch : promise 타입의 객체를 반환.
      // await을 적용해서 response로 받아낸다.
      const response = await fetch(diary.image);
      // image나 영상을 담아 형식을 변형.
      const blob = await response.blob();
      try {
        // image 디렉토리 전달.
        // put을 통해서 이미지 전달.
        await uploadBytes(ref(storage, imageDirectory), blob).then(() => {
          setDiary({...diary, isLoading: false});
          props.navigation.push('Diary');
        });
      } catch (e) {
        setDiary({isLoading: false});
        alert('저장 실패' + e.message);
      }
    } else {
      setDiary({isLoading: false});
      // push : 컴포넌트가 새로 마운트
      // navigate : 이전 화면이 stack에 쌓임.
      props.navigation.push('/Diary');
    }
  };

  useEffect(() => {
    if (!params.newDiary) {
      setDiary({
        ...diary,
        newDiary: params.newDiary,
        index: params.index,
        diaryData: params.diaryData.data,
        userId: params.userId,
      });
    } else {
      setDiary({
        ...diary,
        newDiary: true,
        index: params.index,
        diaryData: {id: params.id},
        userId: params.userId,
      });
    }
    // newDiary false && imagePath true
    !params.newDiary && params.diaryData.data.imagePath ? getImage() : null;
  }, [diary.diaryData.id]);

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
    <KeyboardAvoidingView
      style={{flex: 1}}
      // positon, padding, height 제공
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <View style={styles.buttonView}>
            {/* {!diary.newDiary ? ( */}
            {/* <> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{fontSize: 15, padding: 5}}
                onPress={deleteData}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{fontSize: 15, padding: 5}}
                onPress={updateData}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Update</Text>
              </TouchableOpacity>
            </View>
            {/* </>
            ) : ( */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{fontSize: 15, padding: 5}}
                onPress={uploadData}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Upload</Text>
              </TouchableOpacity>
            </View>
            {/* )} */}
          </View>
          <Spinner
            visible={diary.isLoading}
            textContent={'Loading...'}
            overlayColor={'rgba(0,0,0,0,0.6)'}
            textStyle={{color: '#fff'}}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    // flex: 1,
    height: 40,
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
  buttonView: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 90,
    height: 40,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 12,
    fontWeight: 'bold',
  },
});

export default DiaryDocu;
