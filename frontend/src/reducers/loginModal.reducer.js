import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "../actions/action.type";

const initialState = {
  isModalOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        isModalOpen: true
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        isModalOpen: false
      };
    default:
      return state;
  }
}
