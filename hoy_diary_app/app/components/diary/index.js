import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDiaries} from '../../store/actions/diary_actions';

const DiaryComponent = ({navigation}) => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const Diaries = useSelector(state => state.Diary);

  useEffect(() => {
    dispatch(getDiaries());
  }, []);

  // jsx 반환
  const renderDiary = Diaries =>
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
                  <View style={{paddingTop: 10}}>
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

  return (
    <View>
      <ScrollView style={{backgroundColor: 'white'}}>
        {renderDiary(Diaries)}
      </ScrollView>
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
          });
        }}>
        <Text
          style={{
            fontSize: 25,
          }}>
          ✏️
        </Text>
      </TouchableOpacity>
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
