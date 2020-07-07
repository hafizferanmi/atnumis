import React, { Component } from "react";
import { fetchData } from "../http.service";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./loading";
import { openLoginModal } from "../actions/loginModal.action";
import { openBidModal } from "../actions/bidModal.action";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotIsLoading: true,
      coinInfo: {},
      coinError: false
    };
  }

  jumpToLot = lotId => {
    return lotId;
  };

  componentWillMount() {
    const {
      match: {
        params: { coinId }
      }
    } = this.props;
    fetchData(`/auction/coin/desc/${coinId}`)
      .then(data => {
        this.setState({ coinInfo: data, lotIsLoading: false });
      })
      .catch(error => this.setState({ coinError: error, lotIsLoading: true }));
  }

  toggleBidModal = (coin) => {
    this.props.openBidModal(coin);
  };

  toggleLoginModal = () => {
    this.props.openLoginModal();
  };

  showImageOverlay() {
    return true;
  }

  openBiddingIncrementsOverlay() {}

  openTermsConditionsOverlay() {}
  render() {
    const {
      lotIsLoading,
      coinInfo: {
        title,
        isWinning,
        hasWon,
        minBid,
        currentBid,
        no_of_bids,
        ends_at,
        image,
        userHasBid,
        coinHasBids,
        hasOutBid,
        userCurrentBid,
        coin_id,
        isPast
      }
    } = this.state;

    let coin = this.state.coinInfo;

    const { isUserLoggedIn } = this.props.user;
    return (
      <>
        {lotIsLoading ? (
          <Loading />
        ) : (
          <>
            <div className="page cf">
              <div id="system-message-container" />

              <div className="ng-scope">
                <div
                  id="lot-id-hidden"
                  style={{ display: "none" }}
                  className="lot_10667"
                />

                <div className="lot_details cf">
                  <div className="lot_detail_left">
                    <div className="item-details-top">
                      <div
                        className="lot-num"
                        ng-show="(lot.preview_lot == 0 || lot.auctionActive)"
                      >
                        <p
                          ng-show="keywordEntered =='' &amp;&amp; lot.archived == 0"
                          className=""
                        >
                          Lot{" "}
                          <span ng-bind="lot.lot_number" className="">
                            {coin_id}
                          </span>
                          <span ng-bind="lot.lot_suffix" className="" />
                        </p>
                        <p
                          ng-show="keywordEntered !=='' || lot.archived == 1"
                          className=""
                        >
                          <span ng-bind="lot.auction_name" className="">
                            {`Web auctions`}
                          </span>
                          , <span className="">{ends_at}</span>, Lot{" "}
                          <span ng-bind="lot.lot_number" className="">
                            {coin_id}
                          </span>
                          <span ng-bind="lot.lot_suffix" className="" />
                        </p>
                      </div>

                      {/* <div className="lot-name">
                    <h2 className="_text ">Nero AV Aureus.</h2>
                  </div> */}

                      <div className="lot-subhead">
                        <span
                          className="lot-descr "
                          ng-bind-html="lot.sub_heading"
                        />
                      </div>
                    </div>

                    <div className="image-container">
                      <div ng-show="lot.withdraw != 1" className="lot-images">
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
                              {title}
                              <br />
                              <br />
                              Extremely Fine; light reddish 'Boscoreale' tone.{" "}
                              <br />
                              <br />
                              {/* From the inventory of a German dealer; <br />
                          Acquired from NAC Numismatics Ltd. */}
                            </p>
                          </div>
                          {/* <!-- <div className="lot-desc">
						<p ng-bind-html="lot.description"></p>
					</div> --> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lot_detail_right">
                    <div className="grid_2 alpha item-navigation-top cf">
                      <div className="jump-to-lot">
                        <p>Jump to Lot</p>
                        <input
                          onBlur={() => this.jumpToLot(1)}
                          ref={this.searchRef}
                          type="text"
                          ng-model="lot_no"
                          filter-enter-search="jumpToLot(lot_no, 54);"
                          className=""
                        />
                      </div>

                      {/* <div className="back-to-catalogues">
                        <div className="item-nav-list-view">
                          <Link to="/auction">Back To Catalogue</Link>
                        </div>
                      </div> */}

                      {/* <div className="next-previous-container">
                        <div className="next_previous">
                          <div className="grid_2 alpha item-navigation">
                            <div className="item-nav-current">
                              <Link to={`/auction/${coin_id}`}>Next Lot</Link>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <div className="lot-details">
                      <div className="lot-estimate ">
                        <div className="estimate">
                          <span className="estimate-text">
                            <strong className="estimate-subheading">
                              Estimate:{" "}
                            </strong>
                          </span>
                          <span className="estimate-value ">£{minBid}</span>
                          <span
                            style={{ display: "none" }}
                            className="other-currencies"
                          >
                            <span className="usd-currency ">($4,546</span>
                            &nbsp;&nbsp;&nbsp;
                            <span className="euro-currency ">€4,048)</span>
                          </span>
                        </div>
                      </div>

                      {!isPast ? (
                        <div className="lot-current-bid">
                          <div className="current-bid ">
                            <strong className="current-subheading">
                              <span className="lot-current-bid-text ">
                                Current Bid:
                              </span>
                            </strong>
                            <span className="currency-symbol ">
                              £{currentBid || minBid}
                            </span>
                            <span
                              style={{ display: "none" }}
                              className="other-currencies"
                            >
                              <span className="usd-currency ">($4,936</span>
                              &nbsp;&nbsp;&nbsp;
                              <span className="euro-currency ">€4,395)</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {isPast ? (
                        <div className="hammer_price lot-hammer">
                          <p className="price-label">
                            <span>Hammered For: </span>
                            <span className="currency-symbol">£</span>
                            <span>{currentBid}</span>
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      <span>
                        <span
                          style={{ display: "none" }}
                          className="starting-price "
                          ng-show="lot.buy_now == 1 &amp;&amp; lot.isLotActive &amp;&amp; lot.buynow_sold != 1 &amp;&amp;  lot.buy_now_price != '0.00' &amp;&amp; lot.preview_lot != 1 &amp;&amp; lot.archived_hammer_nav == 0"
                        >
                          Buy Now:
                        </span>{" "}
                        <span
                          style={{ display: "none" }}
                          className="value-price  "
                        >
                          £0.00
                        </span>
                        <span
                          style={{ display: "none" }}
                          className="starting-price  "
                        >
                          Hammered For: £
                        </span>
                        <span
                          style={{ display: "none" }}
                          className="value-price  "
                        >
                          0
                        </span>
                      </span>
                    </div>

                    <div className="lot-actions">
                      <div className="lot-bidding">
                        {/* <div
                          className="bid-up-bid-live"
                          ng-show="lot.buy_now == 0"
                        >
                          <div
                            style={{ display: "none" }}
                            ng-show="lot.showBidLive &amp;&amp; auctionType == 0"
                            className="bid-btn "
                          >
                            <a
                              className="secondary-btn bid-live-btn"
                              ng-click="openLink(lot.live_bidding_Url)"
                            >
                              Bid Live
                            </a>
                          </div>

                          <a
                            style={{ display: "none" }}
                            ng-show="lot.isLotActive &amp;&amp; lot.bidUp == true"
                            className="overlay-trig uppercase btn bid-btn-ajax bid-live-btn  bid-up-now-js "
                            ng-click="placeBid(lot, lot.minBid)"
                          >
                            <span className="lot-bid-up-text-js">
                              Bid Up Now
                            </span>{" "}
                            <span className="lot-bid-up-amount-js ">
                              (£4000)
                            </span>
                          </a>
                        </div> */}
                        {!isPast ? (
                          <>
                            {isUserLoggedIn ? (
                              <>
                                {userHasBid ? (
                                  <div
                                    className="bid-btn place_bid_detail"
                                    onClick={ () => {this.toggleBidModal(coin) }}
                                  >
                                    <a
                                      className="secondary-btn bid-live-btn place-bid-btn"
                                      title="Bid Again"
                                    >
                                      <span>Bid Again</span>
                                    </a>
                                  </div>
                                ) : (
                                  <div
                                    className="bid-btn place_bid_detail"
                                    onClick={ () => {this.toggleBidModal(coin) }}
                                  >
                                    <a
                                      className="secondary-btn bid-live-btn place-bid-btn"
                                      title="Bid Now"
                                    >
                                      <span>Bid Now</span>
                                    </a>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="bid-btn place_bid_detail">
                                <a
                                  className="secondary-btn bid-live-btn place-bid-btn"
                                  title="Login to bid"
                                >
                                  <span onClick={this.toggleLoginModal}>
                                    Login to bid
                                  </span>
                                </a>
                              </div>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {isPast && !coinHasBids ? (
                          <div
                            className="bid-btn"
                            onClick={() => {
                              this.openBuyNow("coin");
                            }}
                          >
                            <a
                              className="secondary-btn bid-live-btn min-width place-bid-btn"
                              title="Buy Now"
                              onClick={() => {
                                this.openBuyNow("coin");
                              }}
                            >
                              <span>Buy Now</span>
                            </a>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="timed_comission-container cf">
                      <div className="timed_comission-inner" id="lot-10667">
                        <div
                          className="lot-timed-details "
                          ng-show="lot.buy_now == 0 &amp;&amp; lot.isLotActive"
                        >
                          <div className="bids_placed_box timed-box bidding-close-time">
                            <p className="timed-box-label">Closes:</p>
                            <p className="bid-no-bids timed-box-value">
                              <span>{ends_at}</span>
                            </p>
                          </div>

                          <div className="bids_placed_box timed-box time-remaining">
                            <p className="timed-box-label">Closing in:</p>
                            <p className="bid-no-bids timed-box-value">
                              <span data-countdown={ends_at}>
                                {/* {ends_at} */}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* <div
                      className="lot-timed-details "
                      ng-show="(lot.buy_now == 1 &amp;&amp; lot.buynow_sold == 0 &amp;&amp; lot.buy_now_price != '0.00' &amp;&amp; lot.archived_hammer_nav == 0) &amp;&amp; lot.isLotActive"
                    >
                      <div className="bids_placed_box timed-box bidding-close-time">
                        <p className="timed-box-label">Closes:</p>
                        <p className="bid-no-bids timed-box-value">
                          <span
                            ng-bind-html="(lot.remaining_date)"
                            className=""
                          >
                            18-Apr-2019 16:29:45
                          </span>
                        </p>
                      </div>

                      <div className="bids_placed_box timed-box time-remaining">
                        <p
                          className="timed-box-label "
                          ng-bind="(lot.buy_now == 1)?'Time Left:': 'Closing in:'"
                        >
                          Closing in:
                        </p>
                        <p className="bid-no-bids timed-box-value">
                          <span data-countdown="lot.remaining_time">
                            00d 00h 00m 00s
                          </span>
                        </p>
                      </div>
                    </div> */}
                      </div>
                    </div>
                    <div className="links-container">
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
                          ng-click="requestConditionReportForm(lot.lot_id)"
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

                    {/* //insert details connect */}
                    {/* Message passing for bids get in here */}
                    {isUserLoggedIn && userHasBid ? (
                      <div className="timed-bid-message timed-bid-message-gs timed-bid-message-sd">
                        {isWinning && !isPast ? (
                          <div
                            className="timed-top-box winning-box"
                            ng-show="lot.isWinning"
                          >
                            <p className="left-heading">
                              You are the highest bidder.
                            </p>
                            <p className="timed-description winning-bid-message winning-bid-message-sd desktop">
                              You currently have the highest bid with your
                              maximum bid of{" "}
                              <strong
                                className="timed-userbid-amount "
                                ng-bind-html="'£' +(lot.userBiddedAmount | number:0)"
                              >
                                £{userCurrentBid}
                              </strong>
                              . If the auction was ending now, you would win
                              this lot at{" "}
                              <strong
                                className="timed-bid-amount "
                                ng-bind-html="'£' + (lot.currentBid | number:0)"
                              >
                                £{currentBid}
                              </strong>
                              .<br />
                            </p>
                          </div>
                        ) : (
                          ""
                        )}

                        {hasWon ? (
                          <div
                            className="timed-top-box won-box "
                            ng-show="lot.hasWon"
                          >
                            <p className="left-heading">Won</p>
                            <p>
                              You have secured this lot with a bid of{" "}
                              <strong className="timed-bid-amount ">
                                £{userCurrentBid}
                              </strong>
                              . We are currently processing the auction results
                              and you will receive a confirmation email once
                              this is complete.
                              <br />
                            </p>
                          </div>
                        ) : (
                          ""
                        )}

                        {hasOutBid ? (
                          <div
                            className="timed-top-box bid-low-box low-bid-warning "
                            ng-show="lot.hasOutBid &amp;&amp; lot.isLotActive"
                          >
                            <p className="left-heading">You have been outbid</p>
                            <p className="timed-description bid-low-message-sd desktop">
                              Another bidder has entered a higher maximum bid
                              and you have been
                              <strong>outbid!</strong> Please increase your
                              maximum bid of{" "}
                              <strong className="timed-userbid-amount ">
                                £{userCurrentBid}
                              </strong>
                              .<br />
                            </p>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* {hasOutBid ? (
                          <div
                            className="timed-top-box bid-low-box bid-sold-outbid "
                            ng-show="lot.hasOutBid &amp;&amp; !lot.isLotActive"
                          >
                            <p className="left-heading">Outbid</p>
                            <p className="timed-description bid-low-message-sd">
                              Lot Sold for
                              <strong
                                className="timed-bid-amount "
                                ng-bind-html="'£' + (lot.currentBid | number:0)"
                              >
                                £{currentBid}
                              </strong>
                              . Your bid was
                              <strong
                                className="timed-userbid-amount "
                                ng-bind-html="'£' + (lot.userBiddedAmount | number:0)"
                              >
                                £{userCurrentBid}
                              </strong>
                              .<br />
                            </p>
                          </div>
                        ) : (
                          ""
                        )} */}

                        {/* {isUnderReserve ? (
                          <div
                            className="timed-top-box bid-low-box under-reserve-bid-warning "
                            ng-show="lot.underReserve &amp;&amp; lot.isLotActive &amp;&amp; !lot.isWinning"
                          >
                            <p className="left-heading">Your bid is too low</p>
                          </div>
                        ) : (
                          ""
                        )} */}
                      </div>
                    ) : (
                      ""
                    )}

                    {/* /ends here */}
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
                    <a className="btn" id="contact_dept_submit">
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
    openBidModal: (coin) => {
      dispatch(openBidModal(coin));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
