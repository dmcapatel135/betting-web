import { combineReducers } from '@reduxjs/toolkit';
import user from './modules/user';
import betModule from './modules/bet';
import jackpotModule from './modules/jackpot';
import walletModule from './modules/wallet';

export default function createReducer() {
  const rootReducer = combineReducers({
    user: user,
    bet: betModule,
    jackpot: jackpotModule,
    wallet: walletModule,
  });

  return rootReducer;
}
