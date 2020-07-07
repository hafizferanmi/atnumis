import { OPEN_BID_MODAL, CLOSE_BID_MODAL } from '../actions/action.type';

export const openBidModal = (coin) => {
    return {
        type: OPEN_BID_MODAL, 
        payload: coin
    }
}

export const closeBidModal = () => {
    return {
        type: CLOSE_BID_MODAL,
        payload: false
    }
}