import { put, takeLatest, all } from 'redux-saga/effects';
import * as types from './actions/actionConstants';
import { getUser } from './modules/user';

function* init() {
  const user = yield getUser();
  if (user) {
    yield put({
      type: types.SET_USER,
      payload: {
        ...user,
      },
    });
  }
}

function* refreshUserDetails() {
  const user = yield getUser();
  if (user) {
    yield put({
      type: types.SET_USER,
      payload: user,
    });
  }
}

function* actionWatcher() {
  yield takeLatest(types.INIT, init);
  yield takeLatest(types.REFRESH_USER_DETAILS, refreshUserDetails);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
