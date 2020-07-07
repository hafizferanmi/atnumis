import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "./action.type";

export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL,
    payload: true
  };
};

export const closeLoginModal = () => {
  return {
    type: CLOSE_LOGIN_MODAL,
    payload: false
  };
};
