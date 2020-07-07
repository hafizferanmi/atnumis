import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../http.service";
import {
  updateArchiveAuctions,
  updateBuyingCoins,
  updateLandingCoins,
  updateUpcomingAuctions
} from "../actions/coin.action";
class FetchAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchArchive();
    this.fetchLanding();
    this.fetchUpcoming();
    this.fetchBuyNow();
  }

  fetchArchive = () => {
    fetchData(`/auction/archive`).then(data => {
      this.props.updateArchiveAuctions(data);
    });
  };

  fetchLanding = () => {
    fetchData("/landing-page-auctions").then(data => {
      this.props.updateLandingCoins(data);
    });
  };

  fetchBuyNow = () => {
    fetchData(`/buy`).then(data => {
      this.props.updateBuyingCoins(data);
    });
  };

  fetchUpcoming = () => {
    fetchData(`/auction/upcoming`).then(data => {
      this.props.updateUpcomingAuctions(data);
    });
  };

  render() {
    return <></>;
  }
}

// const mapStateToProps = state => {
//   return {
//     coins: state.coins.landingPageAuctions
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    updateLandingCoins: payload => {
      dispatch(updateLandingCoins(payload));
    },
    updateArchiveAuctions: payload => {
      dispatch(updateArchiveAuctions(payload));
    },
    updateBuyingCoins: payload => {
      dispatch(updateBuyingCoins(payload));
    },
    updateUpcomingAuctions: payload => {
      dispatch(updateUpcomingAuctions(payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FetchAll);
