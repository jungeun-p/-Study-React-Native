/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';

import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './app/store/reducers';
import {Provider} from 'react-redux';
// import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// redux 개발자 도구, middleware를 사용. 크롬 확장 프로그램에 있는 Js 함수. 일단 compose도 함께 작성.
// const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = createStore(
  reducers,
  //reducer
  composeEnhancers(applyMiddleware(promiseMiddleware, thunkMiddleware)),
  //enhancers(middleware)를 인자로. -> promiseMiddleware 인자로 전달.
);

const appRedux = () => (
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => appRedux);
