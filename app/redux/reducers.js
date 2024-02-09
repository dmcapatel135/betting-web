import { combineReducers } from '@reduxjs/toolkit';
import user from './modules/user';
import betModule from './modules/bet';

export default function createReducer() {
  const rootReducer = combineReducers({
    user: user,
    bet: betModule,
  });

  return rootReducer;
}
