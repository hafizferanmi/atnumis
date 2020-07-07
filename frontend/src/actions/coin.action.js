import {
    UPDATE_ARCHIVE_AUCTIONS,
    UPDATE_UPCOMING_AUCTIONS,
    UPDATE_BUYING_COINS,
    UPDATE_LANDING_COINS
  } from "./action.type";

  export const updateArchiveAuctions = (payload) => {
    return {
        type: UPDATE_ARCHIVE_AUCTIONS,
        payload
      };
  }

  export const updateUpcomingAuctions = payload => {
    return {
      type: UPDATE_UPCOMING_AUCTIONS,
      payload
    };
  };

  export const updateBuyingCoins = payload => {
    return {
      type: UPDATE_BUYING_COINS,
      payload
    };
  };

  export const updateLandingCoins = payload => {
    return {
      type: UPDATE_LANDING_COINS,
      payload
    };
  };