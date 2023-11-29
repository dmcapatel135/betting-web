import Cookies from 'js-cookie';
import { put, all, takeLatest } from 'redux-saga/effects';
import { getApiReq } from '../helpers/ApiHandler';

function* getUserDetails() {
  if (Cookies.get('userIsLoggedIn')) {
    const response = yield getApiReq('/users/get-details');
    try {
      if (response.status) {
        yield put({
          type: 'SET_USER_DETAILS',
          payload: response.data,
        });
      } else {
        yield put({
          type: 'SHOW_TOAST',
          payload: { type: 'error', message: response.error },
        });
      }
    } catch (e) {
      yield put({ type: 'SET_USER_DETAILS', payload: null });
    }
  }
}

function* actionWatcher() {
  yield takeLatest('GET_USER_DETAILS', getUserDetails);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
