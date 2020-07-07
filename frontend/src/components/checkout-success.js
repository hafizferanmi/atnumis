import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {Link} from 'react-router-dom';

class CheckoutSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Helmet>
          <title> Checout Successful!! Thanks - Atnumis </title>
        </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <div className="cms-page-content cf" itemProp="articleBody" />

          <div className="item-page">
            <h1>Checkout Successful</h1>
            <p>
              Your order is being processed, we will work on them and get back
              to you shortly.
            </p>

            <p style={{ textAlign: 'center' }}>&nbsp;</p>
            <p>
              <Link
                className="primary-btn"
                style={{
                  margin: "0 auto",
                  display: "block",
                  maxWidth: "240px"
                }}
                to="/"
              >
                Return To Homepage
              </Link>
            </p>
          </div>

          <div className="padded-inner logged-in" />
        </div>
      </>
    );
  }
}

export default CheckoutSuccess;
