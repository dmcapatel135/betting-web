import { SHOW_TOAST, HIDE_TOAST } from '../actions/actionConstants';

const initialState = {
  message: '',
  type: '',
  isVisible: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        message: action.payload.message,
        type: action.payload.type,
        isVisible: true,
      };
    case HIDE_TOAST:
      return {
        ...state,
        message: '',
        type: '',
        isVisible: false,
      };
    default:
      return state;
  }
};
export default userReducer;
