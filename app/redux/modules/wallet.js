import { getReq } from '@utils/apiHandlers';
import { SET_WALLET } from '../actions/actionConstants';

export const getWallet = async () => {
  const response = await getReq('/users/me/wallets');
  if (response.status) {
    response.data = {
      ...response.data,
      // mobile: response.data.mobile
      //   ? response.data.mobile.replace(response.data.dialCode, '')
      //   : null,
    };
    return response.data;
  }
  return null;
};

const initialState = {};

const walletModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case SET_WALLET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default walletModule;
