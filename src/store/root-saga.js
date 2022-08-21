import {all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.sagas';
export function* rootSaga(){
  yield all([call(categoriesSaga), call(userSagas)]);
}