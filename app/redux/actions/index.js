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
