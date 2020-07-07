import {
  UPDATE_ARCHIVE_AUCTIONS,
  UPDATE_UPCOMING_AUCTIONS,
  UPDATE_BUYING_COINS,
  UPDATE_LANDING_COINS
} from "../actions/action.type";

const initialState = {
  upcomingAuctions: [],
  archiveAuctions: [],
  landingPageAuctions: [],
  buyingCoins: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ARCHIVE_AUCTIONS:
      return {
        ...state,
        archiveAuctions: action.payload
      };
    case UPDATE_UPCOMING_AUCTIONS:
      return {
        ...state,
        upcomingAuctions: action.payload
      };
    case UPDATE_BUYING_COINS:
      return {
        ...state,
        buyingCoins: action.payload
      };
      case UPDATE_LANDING_COINS:
        return {
          ...state,
          landingPageAuctions: action.payload
        };

    default:
      return state;
  }
}
