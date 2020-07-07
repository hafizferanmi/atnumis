import React, { Component } from "react";
import { Helmet } from "react-helmet";
import AccountSidebar from './account-sidebar'

class InvoicePaid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Helmet>
            <title> Invoices - Atnumis </title>
        </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <section className="acc-page-holder">
            <AccountSidebar />
            <div className="account__content page-right-col">
              <div className="account__content__title">
                <h1>Paid Invoices</h1>
              </div>

              <div className="account__content__main">
                <h3 className="no_outstanding_invoices">
                  You do not currently have any paid invoices
                </h3>
              </div>
            </div>
          </section>

          <div className="padded-inner logged-in" />
        </div>
      </>
    );
  }
}

export default InvoicePaid;
