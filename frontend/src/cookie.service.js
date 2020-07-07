import Cookies from 'js-cookie';

const cookieOption = { expires: 30 };

export const setCookie = (key, value) => Cookies.set(key, value, cookieOption);

export const getUserTokenFromCookie = () => Cookies.get('_t');
export const getUsernamefromCookie = () => Cookies.get('_u');
export const getCartItemFromCookie = () => Cookies.get('_c');

export const deleteUserDetailsCookie = () => {
  Cookies.remove('_u');
  Cookies.remove('_t');
}

export const removeCartFromCookie = () => {
  Cookies.remove('_u');
}
