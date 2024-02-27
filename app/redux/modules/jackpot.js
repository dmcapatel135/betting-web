// reducers/betModule.js

import { SET_SELECTED_JACKPOT } from '@actions/actionConstants';

const initialState = {
  selectedJackpot: [],
};

const jackpotModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_JACKPOT:
      return {
        ...state,
        selectedJackpot: action.payload.payload,
      };
    default:
      return state;
  }
};

export default jackpotModule;
