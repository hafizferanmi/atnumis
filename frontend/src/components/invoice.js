import React, { Component } from "react";
import { Helmet } from "react-helmet";
import AccountSidebar from './account-sidebar';

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='invoices'>
        <Helmet>
          <title> Invoice </title>{" "}
        </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <section className="acc-page-holder">
              <AccountSidebar />
            <div className="account__content page-right-col">
              <div className="account__content__title">
                <h1>Buyer Invoices</h1>
              </div>

              <div className="account__content__main">
                <div className="invoices__top-text">
                  <div className="invoices__top-text__title">
                    <h5>We Accept</h5>
                    <img
                      alt="We Accept these Cards"
                      title="We Accept these Cards"
                      src="/images/icon/accepted-cards-image.png"
                      width="142"
                    />
                    <p id="bacs">
                      If you wish to pay by UK cheque or cash please select
                      <span>'PAY BY BACS'</span>
                    </p>
                    <p id="bacs">
                      PayPal and Card payment options are available for invoices
                      up to £2,500
                    </p>
                  </div>
                </div>

                <div className="invoices__list-holder" />
                {/* <!-- Buy Now Section --> */}
                <div className="invoices__list-holder" />

                {/* <!-- Shop Section --> */}
                <div className="invoices__list-holder" />
              </div>
            </div>
          </section>

          <div className="padded-inner logged-in" />
        </div>
      </div>
    );
  }
}

export default Invoice;
