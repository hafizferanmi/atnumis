import {
  ADD_COIN_TO_CART,
  UPDATE_CART_FROM_COOKIE,
  REMOVE_COIN_FROM_CART,
  UPDATE_COIN_QTY,
  CLEAR_CART
} from "../actions/action.type";

import { setCookie, getCartItemFromCookie } from "../cookie.service";

import { createNotification } from "../notification.service";

const initialState = {
  cartItems: [],
  //   cartItems: [
  //     {
  //       coinId: 30,
  //       img: "coin-img.jpg",
  //       desc: "Some coin with nice properties",
  //       qty: 2,
  //       ammount: 546
  //     }
  //   ],
  noOfItemsInCart: 0,
  ammountInCart: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COIN_TO_CART:
      let coin = action.payload;

      let checkItemInCart = state.cartItems.find(item => {
        return item.id === coin.id;
      });

      // let checkItemInCart = !true;

      let coinDesc = {
        id: coin.id,
        img: coin.coin_pic,
        desc: `${coin.country}, ${coin.region}. ${coin.ruler}, ${coin.date}`,
        qty: 1,
        price: coin.price
      };

      if (!checkItemInCart) {
        let newTotal = state.ammountInCart + parseInt(coin.price);
        let newCount = state.noOfItemsInCart + 1;
        let cartItems = state.cartItems;
        cartItems.push(coinDesc);
        // console.log('cartItemsString', JSON.stringify( cartItems));
        setCookie("_c", JSON.stringify(cartItems));
        // console.log('ParseCart', JSON.parse(getCartItemFromCookie()));
        createNotification("success");

        return {
          ...state,
          ammountInCart: newTotal,
          noOfItemsInCart: newCount,
          cartItems: cartItems
        };
      } else {
        createNotification("warning");
        return state;
      }

    case UPDATE_CART_FROM_COOKIE:
      if (action.payload.isItemInCart) {
        let cookieCartItems = JSON.parse(getCartItemFromCookie());
        let cookieCartItemsCount = cookieCartItems.length;
        let cartAmmount = 0;
        cookieCartItems.forEach(item => {
          cartAmmount += parseInt(item.price);
        });
        return {
          ...state,
          cartItems: cookieCartItems,
          noOfItemsInCart: cookieCartItemsCount,
          ammountInCart: cartAmmount
        };
      } else {
        return state;
      }

    case REMOVE_COIN_FROM_CART:
      let payloadCoin = action.payload;
      let cartItems = state.cartItems;
      let itemIndex = cartItems.findIndex(item => {
        return item.id === payloadCoin.id;
      });

      cartItems.splice(itemIndex, 1);
      let newTotal = state.ammountInCart - parseInt(payloadCoin.price);
      let newCount = state.noOfItemsInCart - 1;
      setCookie("_c", JSON.stringify(cartItems));

      return {
        ...state,
        cartItems: cartItems,
        ammountInCart: newTotal,
        noOfItemsInCart: newCount
      };

    case UPDATE_COIN_QTY:
      let updatePayloadCoin = action.payload.coin;
      let updatePayloadQty = action.payload.qty;
      let updateCartItems = state.cartItems;
      let updateItemIndex = updateCartItems.findIndex(item => {
        return item.id === updatePayloadCoin.id;
      });

      //Log object to Console.
      // console.log("Before update: ", updateCartItems[updateItemIndex]);

      //Update object's name property.

      const updatedObj = {
        ...updateCartItems[updateItemIndex],
        qty: updatePayloadQty
      };

      const updatedCart = [
        ...updateCartItems.slice(0, updateItemIndex),
        updatedObj,
        ...updateCartItems.slice(updateItemIndex + 1)
      ];

      //Log object to console again.
      // console.log("After update: ", updatedObj);

      let updateNewTotal =
        state.ammountInCart +
        parseInt(updatePayloadQty) * parseInt(updatePayloadCoin.price);
      setCookie("_c", JSON.stringify(updatedCart));

      return {
        ...state,
        cartItems: updatedCart,
        ammountInCart: updateNewTotal
      };

    case CLEAR_CART:
      setCookie("_c", JSON.stringify([]));
      return {
        ...state,
        cartItems: {},
        ammountInCart: 0,
        noOfItemsInCart: 0
      };

    default:
      return state;
  }
}
