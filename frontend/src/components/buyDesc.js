import React, { Component } from "react";
import { fetchData } from "../http.service";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./loading";
import { addCoinToCart } from "../actions/cart.action";

class BuyDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidModalOpen: false,
      isLoggedIn: true,
      coinIsLoading: true,
      coinInfo: {},
      coinError: false
    };
  }

  jumpToLot = lotId => {};

  addToCart = coin => {
    this.props.addCoinToCart(coin);
  };

  componentWillMount() {
    const {
      match: {
        params: { coinId }
      }
    } = this.props;
    fetchData(`/buy/${coinId}`)
      .then(response => {
        this.setState({ coinInfo: response.data, coinIsLoading: false });
      })
      .catch(error => this.setState({ coinError: error, coinIsLoading: true }));
  }

  showImageOverlay() {
    return true;
  }

  render() {
    const {
      isLoggedIn,
      coinIsLoading,
      coinInfo: { price, category, coin_pic, ruler, country, id, region, date }
    } = this.state;

    const coin = this.state.coinInfo;
    return (
      <>
        {coinIsLoading ? (
          <Loading />
        ) : (
          <>
            <div className="page cf">
              <div id="system-message-container" />

              <div
                ng-controller="timedAuctionCtrl as taCtrl"
                className="ng-scope"
              >
                <div
                  id="lot-id-hidden"
                  style={{ display: "none" }}
                  className="lot_10667"
                />

                <div className="lot_details cf">
                  <div className="lot_detail_left">
                    <div className="item-details-top">
                      {/* <div
                        className="lot-num"
                        ng-show="(lot.preview_lot == 0 || lot.auctionActive)"
                      >
                        <p>
                          Lot <span>{coin_id}</span>
                        </p>
                        <p>
                          <span>{`Web auctions`}</span>, <span>{ends_at}</span>,
                          Lot <span>{coin_id}</span>
                          <span />
                        </p>
                      </div> */}

                      <div className="lot-name">
                        <h2 className="_text">{`${country}, ${region}. ${ruler}, ${date}`}</h2>
                      </div>

                      <div className="lot-subhead">
                        <span className="lot-descr" />
                      </div>
                    </div>

                    <div className="image-container">
                      <div className="lot-images">
                        <a
                          className="lot_detail_img_enlarge_atop"
                          onClick={this.showImageOverlay}
                        >
                          <img
                            width="380"
                            id="lot_image"
                            src={`/images/4001.188.14_1.jpg`}
                          />
                        </a>

                        {/* <div
                          ng-show="lot.withdraw == 1"
                          className="lot-images "
                        >
                          <img
                            width="380"
                            id="lot_image"
                            src={`/image/path/${image}`}
                          />
                        </div> */}
                      </div>
                    </div>

                    <div className="lot-details-bottom">
                      <div className="legal-note-container">
                        <p className="legal-note">
                          Our commitment to ethical and responsible provenance:
                          the consignor affirms that this auction lot is their
                          lawful property to sell, and where cultural property
                          restrictions may exist, that it meets the requirements
                          to be legally imported into the United States and
                          Germany.
                        </p>
                      </div>

                      <div
                        ng-show="lot.withdraw != 1"
                        className="lot-information"
                      >
                        <div
                          className="lot-description"
                          ng-show="lot.description"
                        >
                          <h3>Description</h3>
                          <div ng-bind-html="lot.description" className="">
                            <p>
                              {/* {title} */}
                              <br />
                              <br />
                              Extremely Fine; light reddish 'Boscoreale' tone.{" "}
                              <br />
                              <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lot_detail_right">
                    {/* <div className="grid_2 alpha item-navigation-top cf">
                      <div className="jump-to-lot">
                        <p>Jump to Lot</p>
                        <input
                          onBlur={() => this.jumpToLot(1)}
                          ref={this.searchRef}
                          type="text"
                          className=""
                        />
                      </div>

                      <div className="back-to-catalogues">
                        <div className="item-nav-list-view">
                          <Link to="/auction">Back To Catalogue</Link>
                        </div>
                      </div>

                      <div className="next-previous-container">
                        <div className="next_previous">
                          <div className="grid_2 alpha item-navigation">
                            <div className="item-nav-current">
                              <Link to={`/auction/${id}`}>Next Lot</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div className="lot-details">
                      <div className="lot-estimate ">
                        <div className="estimate">
                          <span className="estimate-text">
                            <strong className="estimate-subheading">
                              Price:{" "}
                            </strong>
                          </span>
                          <span
                            className="estimate-value "
                            ng-bind-html="currencySymbol + (lot.low_estimate | number: 0)"
                          >
                            £{price}
                          </span>
                          <span
                            style={{ display: "none" }}
                            className="other-currencies"
                          >
                            <span
                              className="usd-currency "
                              ng-bind-html="'($' + ((lot.low_estimate * lot.dollar) | number: 0)"
                            >
                              ($4,546
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span
                              className="euro-currency "
                              ng-bind-html="'€' + ((lot.low_estimate * lot.euro) | number: 0) + ')'"
                            >
                              €4,048)
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lot-actions">
                      <div className="lot-bidding">
                        <div className="bid-btn">
                          <a
                            onClick={() => this.addToCart(coin)}
                            className="secondary-btn bid-live-btn min-width place-bid-btn"
                            title="Add to cart"
                          >
                            <span>Add to cart</span>
                          </a>
                        </div>
                        <div className="bid-btn">
                          <Link
                            // onClick={this.openLoginModal}
                            to="/checkout"
                            className="secondary-btn bid-live-btn min-width place-bid-btn"
                            title="Proceed to checkout"
                          >
                            <span>Proceed to checkout</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="links-container" style={{ display: "" }}>
                      <div className="link">
                        {/* <!--  . --> */}
                        <a href="" target="_top" title="Email to a friend">
                          Email to a friend
                        </a>
                      </div>
                      <div className="link">
                        <a
                          className="request-conitional-report-btn"
                          alt="Request Condition Report"
                        >
                          Enquire about this item{" "}
                        </a>
                      </div>

                      <div className="link">
                        <a
                          href="javascript::void();"
                          onClick={this.openBiddingIncrementsOverlay}
                          title="Bidding Increments"
                        >
                          Bidding Increments
                        </a>
                      </div>
                      <div className="link">
                        <a
                          href="javascript::void();"
                          onClick={this.openTermsConditionsOverlay}
                          title="Terms &amp; Conditions"
                        >
                          Terms &amp; Conditions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="contact-department-form-js"
                  style={{ display: "none" }}
                >
                  <h2 className="key-title" style={{ textAlign: "center" }}>
                    Get In Touch
                  </h2>
                  <div className="condition-report-error-gs" />
                  <div className="name-holder input-holder cr-input">
                    <p className="uppercase input-label">Name:</p>
                    <input defaultValue="" className="login-input name-input" />
                  </div>
                  <div className="username-holder input-holder cr-input">
                    <p className="uppercase input-label">Email Address:</p>
                    <input
                      defaultValue=""
                      className="login-input email-input"
                    />
                  </div>
                  <div className="phone-holder input-holder cr-input">
                    <p className="uppercase input-label">Phone:</p>
                    <input
                      defaultValue=""
                      className="login-input phone-input"
                    />
                  </div>
                  <div className="message-holder input-holder">
                    <p className="uppercase input-label">Comments:</p>
                    <textarea
                      rows="3"
                      cols="50"
                      maxLength="249"
                      className="message-input"
                    />
                  </div>

                  <div className="button-holder cr-button-holder">
                    <a
                      className="btn"
                      id="contact_dept_submit"
                      ng-click="contactDepartment(lot.lot_id)"
                    >
                      Submit
                    </a>
                  </div>
                </div>

                <div className="padded-inner " />
              </div>

              <input
                type="hidden"
                id="base_url"
                defaultValue="https://www.atnumis.com/"
              />
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    addCoinToCart: coin => {
      dispatch(addCoinToCart(coin));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyDesc);
