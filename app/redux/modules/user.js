import { getReq } from '@utils/apiHandlers';
import { SET_USER, CLEANUP } from '../actions/actionConstants';

export const getUser = async () => {
  const response = await getReq('/users/me');
  if (response.status) {
    response.data = {
      ...response.data,
      mobile: response.data.mobile
        ? response.data.mobile.replace(response.data.dialCode, '')
        : null,
    };
    return response.data;
  }
  return null;
};

const initialState = {};

const userModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case CLEANUP:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userModule;
