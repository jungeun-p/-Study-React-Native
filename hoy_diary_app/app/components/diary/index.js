import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getDiaries} from '../../store/actions/diary_actions';
import {autoSignIn} from '../../store/actions/user_actions';
import {getTokens, setTokens} from '../../utils/misc';

const DiaryComponent = ({navigation}) => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const Diaries = useSelector(state => state.Diary);
  const User = useSelector(state => state.User);
  const [isAuth, setIsAuth] = useState(true);

  const manageState = isAuth => {
    // state 갱신
    setIsAuth(isAuth);
  };

  useEffect(() => {
    // dispatch(getDiaries());
    getTokens(value => {
      // token값이 null이라면 로그인 화면으로 처리
      if (value[1][1] === null) {
        manageState(false);
      } else {
        // 자동 로그인 action 전달
        dispatch(autoSignIn(value[2][1]))
          .then(() => {
            // 현재 auth state에 토큰이 없다면
            if (!User.auth?.token) {
              manageState(false);
            } else {
              // token 갱신 후 자동으로 로그인 처리
              setTokens(
                User.auth,
                manageState(true),
                dispatch(getDiaries(User)),
              );
            }
          })
          .catch(error => console.log(error));
      }
    });
  }, []);

  // jsx 반환
  const renderDiary = (Diaries, User) =>
    Diaries.documents
      ? Diaries.documents.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.push('DiaryDocu', {
                newDiary: false,
                diaryData: item,
                index: index,
                id: item.data.id,
                userId: User.auth.userId,
              });
            }}>
            <View style={styles.diaryContainer}>
              <View>
                {item.data.imagePath ? (
                  <View style={styles.indexView}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      #{index + 1}
                    </Text>
                    <Text style={{fontSize: 14}}>🖼</Text>
                  </View>
                ) : (
                  <View style={styles.indexView}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      #{index + 1}
                    </Text>
                  </View>
                )}
                {item.data.date ? (
                  <View style={styles.dateView}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      {` ${item.data.date}`}
                    </Text>
                  </View>
                ) : null}
                {item.data.title ? (
                  <View style={styles.dateView}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      {` ${item.data.title}`}
                    </Text>
                  </View>
                ) : null}
                {item.data.description ? (
                  <View style={{paddingLeft: 4, paddingTop: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>
                      {item.data.description}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        ))
      : null;

  const checkNextId = Diaries => {
    // Diaries의 list가 있을 때.
    if (Diaries.documents.length > 0) {
      let numOfArrElements = Diaries.documents.length;
      let lastDiaryIdx = Number(numOfArrElements) - 1;
      // 마지막 다이어리의 id
      let nextDiaryID = Diaries.documents[lastDiaryIdx].data.id + 1;
      return nextDiaryID;
    } else {
      return 0;
    }
  };

  console.log(`diaries`, Diaries);
  return (
    <View>
      {isAuth ? (
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={{flexDirection: 'column-reverse'}}>
            {renderDiary(Diaries, User)}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            height: '100%',
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="emoticon-sad-outline" size={100} />
          <Text
            name
            style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            You need to Login
          </Text>
          <Button
            title="Login/SignUP"
            color="gray"
            onPress={() => {
              navigation.navigate('Sign In');
            }}
          />
        </View>
      )}
      {isAuth ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: screenWidth * 0.8,
            top: screenHeight * 0.7,
            padding: 15,
            backgroundColor: 'gray',
            borderRadius: 50,
          }}
          onPress={() => {
            navigation.push('DiaryDocu', {
              newDiary: true,
              // index: 변경 가능
              index: Diaries.documents.length,
              // id: 고유 index
              id: checkNextId(Diaries),
              // user 식별자 추가 -> 폴더 구조 때문에
              userId: User.auth.userId,
            });
          }}>
          <Text
            style={{
              fontSize: 25,
            }}>
            ✏️
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    backgroundColor: 'black',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    shadowColor: '#cccccc',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 12,
    padding: 20,
  },
  indexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingTop: 5,
  },
});

export default DiaryComponent;
