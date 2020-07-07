import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

class Thanks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
      <Helmet>
          <title> Thanks!! - Atnumis </title>
      </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <div className="cms-page-content cf" itemProp="articleBody" />

          <div className="item-page" style={{ textAlign: 'center', margin: '20px 0' }}>
            <h1>Thank you for Registering</h1>

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

export default Thanks;
