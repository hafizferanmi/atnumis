import React, { Component } from "react";
import { Helmet } from "react-helmet";

class ForgotPasswordSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
      <Helmet>
          <title>Reset password request sent. - Atnumis</title>
      </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <div className="cms-page-content cf" itemprop="articleBody" />

          <div className="item-page">
            <h1>&nbsp;</h1>
            <h1>Reset Password Request Sent</h1>
            <p style={{textAlign: 'center'}}>
              A&nbsp;password reset request email&nbsp;has been sent to the
              email address provided. Please check your email and click on the
              button.
            </p>
          </div>

          <div className="padded-inner " />
        </div>
      </>
    );
  }
}

export default ForgotPasswordSuccess;
