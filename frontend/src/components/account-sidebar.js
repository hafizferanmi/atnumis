import React, { Component } from "react";
import { Link } from "react-router-dom";

class AccountSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="account__page-options page-left-options">
          <div className="account__title page-left-title">
            <h4>
              Welcome <br /> Name
              {/* {userDetails.name.split(" ")[0]} */}
            </h4>
          </div>
          <div className="account__page-options account-menu-holder">
            <div className="palm-account-menu">
              <h3>Account Menu</h3>
              <ul>
                <li />
                <li />
                <li />
              </ul>
            </div>
            <ul>
              {/* <!-- My Bids --> */}
              <li className="menu-item menu-dropdown ">
                <Link className="option-title" title="My bids" to="/mybids">
                  My Bids
                </Link>

                <ul className="sub-list">
                  <li className="sub-list__link current-bids-link">
                    <Link
                      className="option-title"
                      title="My Floor Auction Bids"
                      to="/myfloorbids"
                    >
                      My Floor Auction Bids
                    </Link>
                  </li>
                  <li className="sub-list__link current-bids-link">
                    <Link
                      className="option-title"
                      title="My E-Sale Bids"
                      to="/mybids"
                    >
                      My E-Sale Bids
                    </Link>
                  </li>
                  <li className="sub-list__link current-bids-link">
                    <Link
                      className="option-title"
                      title="My Buy Now Bids"
                      to="/mycart"
                    >
                      Basket
                    </Link>
                  </li>
                  <li className="sub-list__link bid-history-link">
                    <Link
                      className="option-title"
                      title="Bidding history"
                      to="/mybidhistory"
                    >
                      Bidding History
                    </Link>
                  </li>
                </ul>
              </li>

              {/* <!-- Archive -->
			<!-- <li className="menu-item menu-single ">
				<Link className="option-title" title="Archive" to="https://www.romanumismatics.com/index.php?option=com_calender&view=archives">Archive</Link>
			</li> -->

			<!-- My Invoices --> */}

              <li className="menu-item menu-dropdown ">
                <Link
                  className="option-title"
                  title="My Invoices"
                  to="/invoices"
                >
                  My Invoices
                </Link>

                <ul className="sub-list">
                  <li className="sub-list__link pending-invoices-link ">
                    <Link
                      className="option-title"
                      title="Pending Invoices"
                      to="/invoices"
                    >
                      Pending Invoices
                    </Link>
                  </li>
                  <li className="sub-list__link paid-invoices-link ">
                    <Link
                      className="option-title"
                      title="Paid Invoices"
                      to="/paid_invoices"
                    >
                      Paid Invoices
                    </Link>
                  </li>
                </ul>
              </li>

              {/* <!-- My Details --> */}
              <li className="menu-item menu-single active">
                <Link className="option-title" title="My Details" to="/account">
                  My Details
                </Link>

                <ul className="sub-list">
                  <li className="sub-list__link">
                    <Link
                      className="option-title"
                      title="My Login Details"
                      to="/account"
                    >
                      My Login Details
                    </Link>
                  </li>

                  <li className="sub-list__link">
                    <Link
                      className="option-title"
                      title="My Billing &amp; Shipping Details"
                      to="/account"
                    >
                      My Billing &amp; Shipping Details
                    </Link>
                  </li>

                  {/* <li className="sub-list__link">
                        <Link
                          className="option-title"
                          title="Credit Limit"
                          to="/mydashboard#credit-limit"
                        >
                          Credit Limit
                        </Link>
                      </li> */}
                </ul>
              </li>

              {/* <!-- Email Subscriptions --> */}
              {/* <li className="menu-item menu-single ">
                <Link
                  className="option-title"
                  title="Email Subscriptions"
                  to="/emailsubscriptions"
                >
                  Email Subscriptions
                </Link>
              </li> */}

              {/* <!-- Personalised Lot Alert --> */}
              <li className="menu-item menu-single ">
                <Link
                  className="option-title"
                  title="Personalised Lot Alert"
                  to="/lot_alert"
                >
                  Personalised Lot Alert
                </Link>
              </li>

              {/* <!-- Request A Valuation --> */}
              <li className="menu-item menu-single ">
                <Link
                  className="option-title"
                  title="Request A Valuation"
                  to="/authentication-valuation"
                >
                  Request A Valuation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default AccountSidebar;
