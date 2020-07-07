import React, { Component } from "react";
import { Helmet } from "react-helmet";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Helmet>
          <title> Not Found - Atnumis </title>
        </Helmet>
        <p style={{ textAlign: "center" }}>
          Error Occured, we are working on something to make this better. We
          will take a proper look at everything before the end of the day.
          Thanks.
        </p>
      </>
    );
  }
}

export default NotFound;
