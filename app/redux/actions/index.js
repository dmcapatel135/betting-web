import * as types from './actionConstants';

export const init = () => ({
  type: types.INIT,
});

export const cleanup = () => ({
  type: types.CLEANUP,
});

export const setUser = (payload) => ({
  type: types.SET_USER,
  payload,
});

export const refreshUserDetails = () => ({
  type: types.REFRESH_USER_DETAILS,
});

export const fetchBetDetailsAction = (payload) => ({
  type: types.FETCH_BET_DETAILS,
  payload: payload,
});

export const fetchJackpotDetailsAction = (payload) => ({
  type: types.FETCH_JACKPOT_DETAILS,
  payload: payload,
});
