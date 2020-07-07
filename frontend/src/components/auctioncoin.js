import React, { Component } from "react";
// import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { fetchData } from "../http.service";
import { connect } from "react-redux";
import { openLoginModal } from "../actions/loginModal.action";
import { openBidModal } from "../actions/bidModal.action";
import $ from "jquery";
// import '../jquery.countdown.min.js';

class AuctionCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isUserLoggedIn: false,
      bidModal: false,
      bidAmmount: 0,
      placingBid: false,
      bidError: false,
      bidErrorMsg: ""
    };
  }

  // componentDidMount(){
  //   this.initCountDown();
  // }

  // initCountDown(){
  //   $(this.refs.countdown).countdown('2020/10/10 12:34:56');
  // }

  openBidModal = () => {
    this.props.openBidModal(this.props.coin);
  };

  openLoginModal = () => {
    this.props.openLoginModal();
  };

  render() {
    const {
      coin,
      auctionTitle,
      isAuctionActive,
      bidModal: { coinDetails },
      user: { isUserLoggedIn }
    } = this.props;
    // const { bidError, bidErrorMsg } = this.state;
    return (
      <>
        <li key={coin.id} className="lot-item">
          <div className="lot-name-spacer" />
          <div className="lot-item__inner clearfix">
            <div className="catalogue-view__img">
              <a
                className="lot-image"
                style={{
                  background: `url( /images/4001.188.14_1.jpg )`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
              />
            </div>
            <div className="catalogue-view__details">
              <div className="catalogue-view__details__left">
                <div className="lot_description">
                  <p>
                    <span>
                      {coin.isPast ? (
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {`${auctionTitle}, `}{" "}
                        </span>
                      ) : (
                        ""
                      )}
                      Lot {coin.coin_id}:
                    </span>
                    {coin.title} ...
                  </p>
                </div>

                {!coin.isPast ? (
                  <>
                    <div style={{ display: "" }} className="lot-estimate">
                      <p className="estimate">
                        <span className="estimate-text">Estimate:</span>
                        <span className="currency-symbol">£</span>
                        <span className="estimate-value">{coin.minBid}</span>
                        <span className="other-currencies">
                          <span className="usd-currency ">($196</span>
                          &nbsp;&nbsp;&nbsp;
                          <span className="euro-currency ">€173)</span>
                        </span>
                      </p>
                    </div>
                    <div
                      style={{ display: "" }}
                      className="lot-current-bid"
                      ng-show="lot.buy_now == 0 &amp;&amp; lot.isLotActive &amp;&amp; lot.archived == 0 &amp;&amp; lot.withdraw != 1 &amp;&amp; lot.preview_lot != 1"
                    >
                      <p className="estimate">
                        <span
                          className="estimate-text "
                          ng-bind="(lot.userHasBid)?'Current Bid:': 'Opening Bid:'"
                        >
                          {coin.userHasBid ? "Current Bid:" : "Opening Bid:"}
                        </span>
                        <span className="currency-symbol ">£</span>
                        <span className="estimate-value ">
                          {coin.userHasBid ? coin.userCurrentBid : coin.minBid}
                        </span>
                        <span className="other-currencies">
                          <span className="usd-currency ">($156</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="euro-currency ">€138)</span>
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  ""
                )}

                {coin.isPast ? (
                  <div
                    style={{ display: "" }}
                    ng-show="lot.withdraw != 1 &amp;&amp; lot.buy_now == 0 &amp;&amp; !lot.isLotActive &amp;&amp; (lot.userHasBid &amp;&amp; auctionType != '0')"
                    className="lot-login "
                  >
                    <span className="lot-estimate-label hammer-price">
                      Hammered For:{" "}
                    </span>
                    <span
                      className="lot-estimate-range lot-hammer-sum "
                      ng-bind-html="(lot.archived_hammer_nav != 0) ? currencySymbol + (lot.archived_hammer_nav | number: 0) : currencySymbol + (lot.currentBid | number: 0)"
                    >
                      £{coin.currentBid}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="lot-hammer-placeholder "
                  ng-show="(lot.archived_hammer_nav == 0 &amp;&amp; lot.buy_now_price == '0.00') &amp;&amp; lot.buy_now == 1"
                />
              </div>

              {isAuctionActive ? (
                <div className="catalogue-view__details__right">
                  {/* Bid action starts here (buttons) */}
                  <div className="lot-actions lot-actions-gs">
                    {!coin.isPast ? (
                      <div className="bid-btn">
                        {isUserLoggedIn ? (
                          <>
                            {coin.userHasBid ? (
                              <a
                                className="secondary-btn bid-live-btn min-width place-bid-btn"
                                onClick={this.openBidModal}
                              >
                                <span title="Bid Again">Bid Again</span>
                              </a>
                            ) : (
                              <a
                                className="secondary-btn bid-live-btn min-width place-bid-btn"
                                onClick={this.openBidModal}
                              >
                                <span title="Bid now">Bid Now</span>
                              </a>
                            )}
                          </>
                        ) : (
                          <a
                            className="secondary-btn bid-live-btn min-width place-bid-btn"
                            onClick={this.openLoginModal}
                          >
                            <span title="Login to bid">Login to bid</span>
                          </a>
                        )}
                      </div>
                    ) : (
                      ""
                    )}

                    {coin.isPast && !coin.coinHasBids ? (
                      <div className="bid-btn ">
                        <a
                          className="secondary-btn bid-live-btn min-width place-bid-btn"
                          onClick={this.loadBidModal}
                        >
                          <span title="Buy Now">Buy Now</span>
                        </a>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="lot-viewlot">
                      <Link
                        className="min-width quinary-ghost-btn"
                        title="Full details"
                        to={`/auction-coin/${coin.coin_id}/${coin.slug ||
                          "slug"}`}
                      >
                        Full Details
                      </Link>
                    </div>
                  </div>

                  {!coin.isPast ? (
                    <div
                      className="lot-timed-details"
                      ng-show="lot.buy_now == 0 &amp;&amp; lot.isLotActive"
                    >
                      <div className="lot-timed-details_row closing-time">
                        <div className="lot-timed-label">
                          <p>Closes:</p>
                        </div>
                        <div className="lot-timed-value">
                          <p ng-bind-html="(lot.remaining_date)" className="">
                            {coin.ends_at}
                          </p>
                        </div>
                      </div>
                      <div className="lot-timed-details_row countdown-to-close">
                        <div className="lot-timed-label">
                          <p>Closing in:</p>
                        </div>
                        <div className="lot-timed-value countdown-to-close">
                          <p className="countdown-close">
                            <span ref="countdown" />
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {/* Message passing for bids get in here */}
              {isUserLoggedIn && coin.userHasBid ? (
                <div
                  style={{ display: "" }}
                  className="bidding-status-box"
                  ng-show="lot.buy_now == 0 &amp;&amp; lot.withdraw != 1 &amp;&amp; (lot.isLotActive || auctionType != '0')"
                >
                  {isUserLoggedIn && coin.userHasBid ? (
                    <div className="timed-bid-message timed-bid-message-gs timed-bid-message-sd ">
                      {coin.isWinning && !coin.isPast ? (
                        <div
                          className="timed-top-box winning-box "
                          ng-show="lot.isWinning"
                        >
                          <p className="left-heading">
                            You are the highest bidder.
                          </p>
                          <p className="timed-description winning-bid-message winning-bid-message-sd desktop">
                            You currently have the highest bid with your maximum
                            bid of{" "}
                            <strong
                              className="timed-userbid-amount "
                              ng-bind-html="'£' +(lot.userBiddedAmount | number:0)"
                            >
                              £{coin.userCurrentBid}
                            </strong>
                            . If the auction was ending now, you would win this
                            lot at{" "}
                            <strong
                              className="timed-bid-amount "
                              ng-bind-html="'£' + (lot.currentBid | number:0)"
                            >
                              £{coin.userCurrentBid}
                            </strong>
                            .<br />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      {coin.hasWon ? (
                        <div
                          className="timed-top-box won-box "
                          ng-show="lot.hasWon"
                        >
                          <p className="left-heading">Won</p>
                          <p>
                            You have secured this lot with a bid of{" "}
                            <strong
                              className="timed-bid-amount "
                              ng-bind-html="'£' + (lot.currentBid | number:0)"
                            >
                              £{coin.userCurrentBid}
                            </strong>
                            . We are currently processing the auction results
                            and you will receive a confirmation email once this
                            is complete.
                            <br />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      {!coin.isPast && coin.hasOutBid ? (
                        <div
                          className="timed-top-box bid-low-box low-bid-warning "
                          ng-show="lot.hasOutBid &amp;&amp; lot.isLotActive"
                        >
                          <p className="left-heading">You have been outbid</p>
                          <p className="timed-description bid-low-message-sd desktop">
                            Another bidder has entered a higher maximum bid and
                            you have been <strong>outbid!</strong> Please
                            increase your maximum bid of{" "}
                            <strong
                              className="timed-userbid-amount "
                              ng-bind-html="'£' +(lot.userBiddedAmount | number:0)"
                            >
                              £{coin.userCurrentBid}
                            </strong>
                            .<br />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      {coin.isPast && !coin.hasWon ? (
                        <div
                          style={{ display: "" }}
                          className="timed-top-box bid-low-box bid-sold-outbid "
                          ng-show="lot.hasOutBid &amp;&amp; !lot.isLotActive"
                        >
                          <p className="left-heading">Outbid</p>
                          <p className="timed-description bid-low-message-sd">
                            Lot Sold for{" "}
                            <strong
                              className="timed-bid-amount "
                              ng-bind-html="'£' + (lot.currentBid | number:0)"
                            >
                              £{coin.currentBid}
                            </strong>
                            . Your bid was{" "}
                            <strong
                              className="timed-userbid-amount "
                              ng-bind-html="'£' + (lot.userBiddedAmount | number:0)"
                            >
                              £{coin.userCurrentBid}
                            </strong>
                            .<br />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      {/* <!-- <div className="timed-top-box bid-low-box under-reserve-bid-warning" ng-show="lot.underReserve && !lot.isLotActive && !lot.hasWon">
                                            <p className="left-heading">Your bid is too low</p>
                                            <p className="timed-description bid-low-message-sd">Your bid is under reserve.<br></p>
                                        </div> --> */}
                      <div
                        style={{ display: "none" }}
                        className="timed-top-box bid-low-box under-reserve-bid-warning "
                        ng-show="lot.underReserve &amp;&amp; lot.isLotActive &amp;&amp; !lot.isWinning"
                      >
                        <p className="left-heading">Your bid is too low</p>
                        {/* <!-- <p className="timed-description bid-low-message-sd">Your bid is under reserve.<br></p> --> */}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <!-- end .timed-bid-message timed-bid-message-gs timed-bid-message-sd --> */}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </li>
      </>
    );
  }
}

AuctionCoin.propTypes = {
  coin: PropTypes.object.isRequired,
  auctionTitle: PropTypes.string.isRequired
  // isAuctionActive: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    bidModal: state.bidModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openLoginModal: () => {
      dispatch(openLoginModal());
    },
    openBidModal: coin => {
      dispatch(openBidModal(coin));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuctionCoin);
