import { combineReducers } from '@reduxjs/toolkit';
import user from './modules/user';
import betModule from './modules/bet';
import jackpotModule from './modules/jackpot';

export default function createReducer() {
  const rootReducer = combineReducers({
    user: user,
    bet: betModule,
    jackpot: jackpotModule,
  });

  return rootReducer;
}
