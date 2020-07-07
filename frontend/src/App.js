import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/landing";
import Auction from "./components/auction";
import Header from "./components/header";
import NotFound from "./components/notfound";
import Archive from "./components/archive";
import Details from "./components/auction-coin-details";
import Consign from "./components/consign";
import Rep from "./components/representation";
import Footer from "./components/footer";
import Signup from "./components/signup";
import Account from "./components/account";
import Upcoming from "./components/upcoming";
import AdvanceSearch from "./components/advanceSearch";
import BuyNow from "./components/buy";
import buyDesc from "./components/buyDesc";
import Cart from "./components/cart";
import Contact from "./components/contact";
import Checkout from "./components/checkout";
import BidModal from "./components/bidModal";
import DeptDesc from "./components/dept-desc";
import Department from "./components/department";
import Conservation from "./components/conservation";
import Valuation from "./components/valuation";
import About from "./components/about";
import "./App.css";
import { connect } from "react-redux";
import Selling from "./components/selling";
import Bibliography from "./components/bibliography";
import Tnc from "./components/t-n-c";
import Privacy from "./components/privacy-policy";
import ResetPassword from "./components/reset-password";
import CheckoutSuccess from "./components/checkout-success";
// import FetchAll from "./components/fetchAll";
import Thanks from "./components/register-thanks";
import ForgotPassword from "./components/forgot-password";
import ForgotPasswordSuccess from "./components/forgot-password-success";
import MyFloorBids from "./components/myfloorbids";
import MyBids from "./components/mybids";
import MyBiddingHistory from "./components/mybiddinghistory";
import Invoice from "./components/invoice";
import InvoicePaid from "./components/invoice-paid";
import Notification from "./components/notification";
// import MyClass from "./components/interview";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import Mint from "./components/mint";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationType: 'info',
      notificationMessage: ""
    };
  }

  render() {
    let { notificationType, notificationMessage } = this.state;
    return (
      <React.Fragment>
        <NotificationContainer />
        <Router>
          <>
            {/* <FetchAll /> */}
            <Header />
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/buy/:coinId/:slug" component={buyDesc} />
              <Route path="/auction/:auctionType/coins" component={Auction} />
              <Route path="/auction-coin/:coinId/:slug" component={Details} />
              <Route path="/upcoming-auctions" component={Upcoming} />
              <Route path="/archive" component={Archive} />
              {/* <Route path="/interview" component={MyClass} /> */}
              <Route path="/consign" component={Consign} />
              <Route path="/contact-us" component={Contact} />
              <Route path="/about-us" component={About} />
              <Route path="/departments" component={Department} />
              <Route path="/department/:dept" component={DeptDesc} />
              <Route path="/signup" component={Signup} />
              <Route path="/thanks" component={Thanks} />
              <Route path="/auction-representation" component={Rep} />
              <Route path="/account" component={Account} />
              <Route path="/buy-now" component={BuyNow} />
              <Route path="/selling" component={Selling} />
              <Route path="/mint" component={Mint} />
              <Route path="/bibliography" component={Bibliography} />
              <Route path="/mycart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/myfloorbids" component={MyFloorBids} />
              <Route path="/mybids" component={MyBids} />
              <Route path="/checkout-success" component={CheckoutSuccess} />
              <Route path="/mybidhistory" component={MyBiddingHistory} />
              <Route path="/conservation-service" component={Conservation} />
              <Route path="/terms-and-conditions" component={Tnc} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/reset-password-success" component={ResetPassword} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route
                path="/forgot-password-success"
                component={ForgotPasswordSuccess}
              />
              <Route path="/invoices" component={Invoice} />
              <Route path="/paid_invoices" component={InvoicePaid} />
              <Route path="/privacy-policy" component={Privacy} />
              <Route path="/advance-search" component={AdvanceSearch} />
              <Route path="/authentication-valuation" component={Valuation} />
              <Route component={NotFound} /> }
            </Switch>
            <Footer />
            <BidModal />
          </>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    bidModal: state.bidModal
  };
};

export default connect(mapStateToProps)(App);
