import { combineReducers } from '@reduxjs/toolkit';
import user from './modules/user';

export default function createReducer() {
  const rootReducer = combineReducers({
    user,
  });

  return rootReducer;
}
