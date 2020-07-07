import {
  UPDATE_USER_DETAILS_FROM_COOKIE,
  UPDATE_USER_DETAILS_FROM_LOGIN,
  USER_LOGOUT,
  UPDATE_USER_PROFILE_DETAILS
} from "./action.type";

export const updateUserDetails = details => {
  return {
    type: UPDATE_USER_DETAILS_FROM_LOGIN,
    payload: details
  };
};

export const updateUserDetailsFromCookie = data => {
  return {
    type: UPDATE_USER_DETAILS_FROM_COOKIE,
    payload: data
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
    payload: null
  };
};

export const updateUserProfileDetails = data => {
  return {
    type: UPDATE_USER_PROFILE_DETAILS,
    payload: data
  };
};
