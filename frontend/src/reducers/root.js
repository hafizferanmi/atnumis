import { combineReducers } from 'redux';
import coinReducer from './coin.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import loginModalReducer from './loginModal.reducer';
import bidModalReducer from './bidModal.reducer';

export default combineReducers({
    coins: coinReducer,
    cart: cartReducer,
    user: userReducer,
    loginModal: loginModalReducer,
    bidModal: bidModalReducer
});