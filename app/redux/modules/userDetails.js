import {
  SET_USER_DETAILS,
  OPEN_LOGIN_MODAL,
  UPDATE_USER_DETAILS,
  SET_USER_SETTINGS,
  UPDATE_USER_SETTINGS,
  USER_LOGOUT,
} from '../actions/actionConstants';

const initialState = {
  user: null,
  settings: null,
  offset: 0,
  showLoginModal: false,
};

const UserDetails = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case SET_USER_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case UPDATE_USER_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case USER_LOGOUT:
      return initialState;
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: true,
      };

    default:
      return state;
  }
};

export default UserDetails;
