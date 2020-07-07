import {
  ADD_COIN_TO_CART,
  UPDATE_CART_FROM_COOKIE,
  REMOVE_COIN_FROM_CART,
  UPDATE_COIN_QTY,
  SUB_QUANTITY,
  ADD_QUANTITY,
  CLEAR_CART
} from "./action.type";

export const addCoinToCart = coin => {
  return {
    type: ADD_COIN_TO_CART,
    payload: coin
  };
};

export const updateCartFromCookie = data => {
  return {
    type: UPDATE_CART_FROM_COOKIE,
    payload: data
  };
};

export const updateCoinQty = (coin, qty) => {
  return {
    type: UPDATE_COIN_QTY,
    payload: {
      coin,
      qty
    }
  };
};

//remove item action
export const removeCoinFromCart = coin => {
  return {
    type: REMOVE_COIN_FROM_CART,
    payload: coin
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

//subtract quantity action
export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  };
};

//add quantity action
export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  };
};
