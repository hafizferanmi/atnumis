import React, { Component } from "react";
import { Helmet } from "react-helmet";

class MyBiddingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Helmet>
          <title>My Bidding History - Atnumis</title>
        </Helmet>
        My MyBiddingHistory
      </>
    );
  }
}

export default MyBiddingHistory;
