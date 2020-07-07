import React, { Component } from "react";
import { Helmet } from "react-helmet";

class MyFloorBids extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Helmet>
          <title>My Floor Bids - Atnumis</title>
        </Helmet>
        My MyFloorBids
      </>
    );
  }
}

export default MyFloorBids;
