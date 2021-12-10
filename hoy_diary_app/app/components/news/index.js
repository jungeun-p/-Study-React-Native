import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Good from '../../assets/images/very_good.png';
import {requestCovid, requestDust} from '../../store/actions/news_actions';

const NewsComponent = () => {
  const [news, setNews] = useState({
    covid: {
      dateTime: '',
      confirmed: 0,
      confirmedDailyChange: 0,
      deceased: 0,
      decesedDailyChange: 0,
      inProgress: 0,
      inProgressDailyChange: 0,
    },
    dust: {
      place: '서울',
      dateTime: '',
      fineDust: 0,
      fineDustLevel: '',
      ultraFineDust: 0,
      ultraFineDustLevel: '',
      nitrogenDioxide: 0,
      nitrogenDioxideLevel: '',
    },
  });
  const dispatch = useDispatch();
  const {covid, dust} = useSelector(state => state.News);

  const formatDate = () => {
    let todayDate = new Date();
    let today = calculateDate(todayDate);
    let yesterdayDate = new Date(Date.now() - 86400000);
    let yesterday = calculateDate(yesterdayDate);
    let dateData = {
      today,
      yesterday,
    };
    return dateData;
  };

  const calculateDate = date => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    let finalDate = `${year}${month}${day}`;

    return finalDate;
  };

  useEffect(() => {
    let today = formatDate().today;
    let yesterday = formatDate().yesterday;
    dispatch(requestCovid(today, yesterday));
    dispatch(requestDust());

    covid && makeCovidData(covid);
    dust && makeDustData(dust.dustData, dust.item);

    console.log(news);
  }, [news.covid.dateTime, news.dust.dateTime]);

  const makeCovidData = covid => {
    let covidData;
    for (let key in covid) {
      covidData = covid[key];
    }
    let currData = covidData.body.items.item[0];
    let prevData = covidData.body.items.item[1];

    let covidCopy = news.covid;
    covidCopy.dateTime = currData.createDt;
    covidCopy.confirmed = addComma(currData.decideCnt); // 확진환자
    covidCopy.deceased = addComma(currData.deathCnt); // 사망자
    covidCopy.inProgress = addComma(currData.accExamCnt); // 검사진행

    covidCopy.confirmedDailyChange = currData.decideCnt - prevData.decideCnt;
    covidCopy.decesedDailyChange = currData.deathCnt - prevData.deathCnt;
    covidCopy.inProgressDailyChange = currData.accExamCnt - prevData.accExamCnt;

    setNews({...news, covid: covidCopy});
  };

  const addComma = data => {
    let regExp = /\B(?=(\d{3})+(?!\d))/g;
    return data.toString().replace(regExp, ',');
  };

  const makeDustData = (data, item) => {
    let dustData;
    let level;
    for (let key in data) dustData = data[key];
    const value = dustData.body?.items[0].seoul;
    if (value) {
      if (item === 'PM10') {
        if (value <= 30) {
          level = '좋음';
        } else if (value > 30 && value <= 50) {
          level = '보통';
        } else if (value > 51 && value <= 100) {
          level = '나쁨';
        } else if (value > 101) {
          level = '매우나쁨';
        }
        setNews({
          ...news,
          dust: {
            dateTime: dustData.body.items[0].dataTime,
            fineDust: value,
            fineDustLevel: level,
          },
        });
      } else if (item === 'PM25') {
        if (value <= 15) {
          level = '좋음';
        } else if (value > 15 && value <= 25) {
          level = '보통';
        } else if (value > 25 && value <= 50) {
          level = '나쁨';
        } else if (value > 51) {
          level = '매우나쁨';
        }
        setNews({
          ...news,
          dust: {
            ultraFineDust: value,
            ultraFineDustLevel: level,
          },
        });
      } else if (item === 'NO2') {
        if (value <= 0.03) {
          level = '좋음';
        } else if (value > 0.03 && value <= 0.06) {
          level = '보통';
        } else if (value > 0.06 && value <= 0.2) {
          level = '나쁨';
        } else if (value > 0.2) {
          level = '매우나쁨';
        }
        setNews({
          ...news,
          dust: {
            nitrogenDioxide: value,
            nitrogenDioxideLevel: level,
          },
        });
      }
    }
  };

  return (
    <View style={styles.newsContainer}>
      <View style={styles.covidContainer}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.titleText}>#COVID-19</Text>
        </View>
        <View
          style={{
            flex: 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.timeText}>mm.dd xx:xx</Text>
          <Text style={styles.timeText}>기준</Text>
        </View>
        <View style={styles.contentsView}>
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>확진 환자</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText, styles.redText]}>10,000</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15}}>🔼 450</Text>
          </View>
        </View>
        <View style={styles.contentsView}>
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>격리 해제</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText, styles.blueText]}>5,000</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15}}>🔼 260</Text>
          </View>
        </View>
        <View style={styles.contentsView}>
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>사망자</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText, styles.grayText]}>400</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15}}>🔼 0</Text>
          </View>
        </View>
        <View style={styles.contentsView}>
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>검사진행</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.mainText, styles.grayText]}>1,500</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15}}>🔼 0</Text>
          </View>
        </View>
      </View>
      <View style={styles.dustContainer}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.titleText}>#미세 먼지</Text>
        </View>
        <View
          style={{
            flex: 0.7,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.timeText}>서울</Text>
          <Text style={styles.timeText}>mm.dd xx:xx</Text>
          <Text style={styles.timeText}> 기준</Text>
        </View>
        <View style={{flex: 1.8, justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 30, height: 30}}
              source={Good}
              resizeMode="contain"
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 8}}>
            <Text style={[styles.emoticonText, styles.blueText]}>좋음</Text>
          </View>
        </View>
        <View style={styles.contentsView_}>
          <View style={{flex: 0.8}}>
            <Text style={styles.mainText}>미세먼지</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={[styles.mainText, styles.blueText]}>좋음</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>30 </Text>
            <Text style={{fontSize: 15}}>µg/m3</Text>
          </View>
        </View>
        <View style={styles.contentsView_}>
          <View style={{flex: 0.8}}>
            <Text style={styles.mainText}>초미세먼지</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={[styles.mainText, styles.blueText]}>좋음</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>15 </Text>
            <Text style={{fontSize: 15}}>µg/m3</Text>
          </View>
        </View>
        <View style={styles.contentsView_}>
          <View style={{flex: 0.8}}>
            <Text style={styles.mainText}>이산화질소</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={[styles.mainText, styles.blueText]}>좋음</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>0.027 </Text>
            <Text style={{fontSize: 15}}>ppm</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  newsContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
  },
  covidContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  dustContainer: {
    flexDirection: 'column',
    flex: 1.2,
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 15,
    color: 'gray',
  },
  contentsView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
  },
  contentsView_: {
    flex: 0.7,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  redText: {
    color: '#c00000',
  },
  blueText: {
    color: '#0070C0',
  },
  grayText: {
    color: '#7F7F7F',
  },
  emoticonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default NewsComponent;
