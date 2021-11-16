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
          <TouchableOpacity key={index}>
            <View style={styles.diaryContainer}>
              <View style={{height: 160}}>
                {item.data.imagePath ? (
                  <View style={styles.indexView}>
                    <Text style={styles.text}>#{index + 1}</Text>
                    <Text style={{fontSize: 14}}>🖼</Text>
                  </View>
                ) : (
                  <View style={styles.indexView}>
                    <Text style={styles.text}>#{index + 1}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))
      : null;

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
          backgroundColor: 'black',
          borderRadius: 50,
        }}
        onPress={() => {
          navigation.navigate('DiaryDocu', {
            newDiary: true,
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
  },
  indexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default DiaryComponent;
