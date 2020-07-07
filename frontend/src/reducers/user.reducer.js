import {
  FETCH_USER_DETAILS,
  UPDATE_USER_DETAILS,
  USER_LOGOUT,
  UPDATE_USER_DETAILS_FROM_LOGIN,
  UPDATE_USER_DETAILS_FROM_COOKIE,
  UPDATE_USER_PROFILE_DETAILS
} from "../actions/action.type";
import { getUserTokenFromCookie, getUsernamefromCookie } from "../cookie.service";

import { setCookie, deleteUserDetailsCookie } from "../cookie.service";

const initialState = {
  userDetails: {
    token: "",
    username: ""
  },
  isUserLoggedIn: false,
  userProfileDetails: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_PROFILE_DETAILS:
      return {
        ...state,
        userProfileDetails: action.payload
      }

    case FETCH_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
        isUserLoggedIn: true
      };

    case UPDATE_USER_DETAILS_FROM_LOGIN:
      setCookie("_u", action.payload.username);
      setCookie("_t", action.payload.token);
      return {
        ...state,
        userDetails: action.payload,
        isUserLoggedIn: true
      };

    case UPDATE_USER_DETAILS_FROM_COOKIE:
      if (action.payload.isLoggedIn) {
        let details = {
          username: getUsernamefromCookie(),
          token: getUserTokenFromCookie()
        };

        return {
          ...state,
          userDetails: details,
          isUserLoggedIn: true
        };
      } else {
        return {
          ...state,
          userDetails: {
            username: "",
            token: ""
          },
          isUserLoggedIn: false
        };
      }

    case USER_LOGOUT:
      deleteUserDetailsCookie();
      return {
        ...state,
        userDetails: {},
        userProfileDetails: {},
        isUserLoggedIn: false
      };
    default:
      return state;
  }
}
