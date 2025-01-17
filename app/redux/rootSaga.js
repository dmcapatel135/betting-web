import { put, takeLatest, all } from 'redux-saga/effects';
import * as types from './actions/actionConstants';
import { getUser } from './modules/user';
import { fetchBetDetailsAction, fetchJackpotDetailsAction } from '@actions';
import { getWallet } from './modules/wallet';

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

function* wallet() {
  const wallet = yield getWallet();
  if (wallet) {
    yield put({
      type: types.SET_WALLET,
      payload: {
        ...wallet,
      },
    });
  }
}

function* fetchBet(action) {
  try {
    const betDetails = yield fetchBetDetailsAction(action.payload); // Implement this function
    yield put({ type: types.SET_SELECTED_BET, payload: betDetails });
  } catch (error) {
    // Handle errors
  }
}

function* betWatcher() {
  yield takeLatest(types.FETCH_BET_DETAILS, fetchBet);
}

function* fetchJackpot(action) {
  try {
    const jackpotDetails = yield fetchJackpotDetailsAction(action.payload); // Implement this function
    yield put({
      type: types.SET_SELECTED_JACKPOT,
      payload: jackpotDetails,
    });
  } catch (error) {
    // Handle errors
  }
}

function* jackpotWatcher() {
  yield takeLatest(types.FETCH_JACKPOT_DETAILS, fetchJackpot);
}

function* walletWatcher() {
  yield takeLatest(types.WALLET, wallet);
}

function* actionWatcher() {
  yield takeLatest(types.INIT, init);
  yield takeLatest(types.REFRESH_USER_DETAILS, refreshUserDetails);
  // yield takeLatest(types.SET_BET_DETAILS, setBetDetails);
}

export default function* rootSaga() {
  yield all([actionWatcher(), betWatcher(), jackpotWatcher(), walletWatcher()]);
}
