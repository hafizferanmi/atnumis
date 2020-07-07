import { OPEN_BID_MODAL, CLOSE_BID_MODAL } from "../actions/action.type";

const initialState = {
  isBidModalOpen: false,
  coinDetails: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_BID_MODAL:
      // console.log(action.payload);
      return {
        ...state,
        isBidModalOpen: true,
        coinDetails: action.payload
      };
    case CLOSE_BID_MODAL:
      return {
        ...state,
        isBidModalOpen: false,
        coinDetails: {}
      };
    default:
      return state;
  }
}
