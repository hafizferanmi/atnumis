import React, { Component } from "react";
import { Helmet } from "react-helmet";
import AccountSidebar from "./account-sidebar";

class MyBids extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="mybids">
          <Helmet>
            <title>My bids - Atnumis</title>
          </Helmet>
          <div class="page cf">
            <div id="system-message-container" />
            <section class="acc-page-holder ng-scope">
              <AccountSidebar />
              <div class="account__content page-right-col">
                <div class="account__content__title">
                  <h1>My E-Sale Bids</h1>
                </div>

                <div
                  class="auction-bid-holder current-auction-bid-holder"
                  ng-show="anyBidsActiveInAnyAuctions(bids)"
                >
                  {/* <!-- ngRepeat: auction in bids --> */}
                  <div
                    class="bidded-auctions bidded-auctions-1 ng-scope auction-open"
                    ng-repeat="auction in bids"
                    ng-show="anyBidsActive(auction)"
                  >
                    <div class="bidded-auctions__title">
                      <div class="auction-name_container">
                        <h3 class="auction-name">
                          <span
                            class="ba-auction-name ng-binding"
                            ng-bind="auction.auction_name | limitTo: 70"
                          >
                            E-Sale 59
                          </span>
                          <span
                            ng-bind="auction.auction_date_jsmy"
                            class="ng-binding"
                          >
                            11th Jul 2019, 1:00pm GMT
                          </span>
                          <span class="current_total">
                            &nbsp;Total Value of Current Bids:&nbsp;
                            <span
                              ng-bind-html="'£' + auction.totalCurrentBids"
                              class="ng-binding"
                            >
                              £50
                            </span>
                          </span>
                          <span class="max_total">
                            &nbsp;Total Value of Max Bids:&nbsp;
                            <span
                              ng-bind-html="'£' + auction.totalMaxBids"
                              class="ng-binding"
                            >
                              £220
                            </span>
                          </span>
                        </h3>
                      </div>
                      <a class="open-expander auction-expander" href="#">
                        <span class="horz-line" />
                        <span class="vert-line" />
                      </a>
                      <span class="title-rotate-span" />
                    </div>
                    <div class="bidded-auctions__content">
                      {/* <!-- ngRepeat: lot in auction.lots --> */}
                      <div
                        class="bidded-auctions__content__items mybids-bids bidded-auctions__content__item-1 lots-blk lot-item ng-scope"
                        ng-repeat="lot in auction.lots"
                        ng-show="lot.userHasBid"
                        id="lot-16621"
                      >
                        <div class="bidded-auctions__content__left">
                          <a href="https://www.romanumismatics.com/index.php?option=com_timed_auction&amp;view=lot_detail&amp;low_estimate=0&amp;high_estimate=0&amp;keyword=&amp;exclude_keyword=&amp;sort_by=lot_number&amp;image_filter=0&amp;box_filter=0&amp;paper_filter=0&amp;export_issue=0&amp;arr=0&amp;auction_id=58&amp;list_type=list_view&amp;gridtype=listview&amp;lots_per_page=100&amp;page_no=0&amp;lot_id=16621&amp;search_type=&amp;year=&amp;month=&amp;department_id=&amp;cat_id=">
                            <img
                              src="https://www.romanumismatics.com/catalogue_images/auction/medium/16196.1.50_1.jpg"
                              alt="Central Europe, the Boii AR Obol."
                              title="Central Europe, the Boii AR Obol."
                            />
                          </a>
                        </div>
                        <div class="bidded-auctions__content__right">
                          <p class="bidded-auctions__lot-num">
                            Lot{" "}
                            <span ng-bind="lot.lot_number" class="ng-binding">
                              1
                            </span>
                          </p>
                          <div class="bidded-auctions__lot-desc">
                            <p ng-bind="lot.lot_name" class="ng-binding">
                              Central Europe, the Boii AR Obol.
                            </p>
                            <div
                              class="lot-subhead"
                              ng-show="lot.withdraw != 1"
                            >
                              <span
                                class="lot-descr ng-binding"
                                ng-bind-html="lot.sub_heading"
                              />
                            </div>
                          </div>
                          <div
                            class="timed-auction-extra-info"
                            ng-show="lot.isLotActive"
                          >
                            <div
                              class="lot-estimate"
                              ng-show="lot.withdraw != 1 &amp;&amp; (lot.preview_lot == 0 || lot.auctionActive)"
                            >
                              <p class="timed-bid-amount timed-current-bid-value">
                                <span class="lot-estimate-label">
                                  <strong>Estimate:</strong>
                                </span>
                                <span class="lot-estimate-range">
                                  <strong>
                                    <span
                                      ng-bind-html="currencySymbol"
                                      class="ng-binding"
                                    >
                                      £
                                    </span>
                                    <span
                                      ng-bind="lot.low_estimate | number: 0"
                                      class="ng-binding"
                                    >
                                      50
                                    </span>
                                    <span class="estimate">
                                      <span>(</span>
                                      <span
                                        class="dollar ng-binding"
                                        ng-bind-html="'$' + ((lot.low_estimate * lot.dollar) | number: 0)"
                                      >
                                        $63
                                      </span>
                                      <span
                                        class="euro ng-binding"
                                        ng-bind-html="', €' + ((lot.low_estimate * lot.euro) | number: 0)"
                                      >
                                        , €56
                                      </span>
                                      <span>)</span>
                                    </span>
                                  </strong>
                                </span>
                              </p>
                            </div>
                            <div
                              class="lot-estimate info-bid"
                              ng-show="lot.isLotActive"
                            >
                              <p class="timed-bid-amount timed-current-bid-value timed-box-value">
                                <span class="lot-estimate-label blue">
                                  Current Bid:
                                </span>
                                <span class="lot-estimate-range current-bid">
                                  <span
                                    ng-bind-html="currencySymbol"
                                    class="ng-binding"
                                  >
                                    £
                                  </span>
                                  <span
                                    ng-bind-html="(lot.currentBid | number: 0)"
                                    class="ng-binding"
                                  >
                                    50
                                  </span>
                                  <span class="estimate">
                                    <span>(</span>
                                    <span
                                      class="dollar ng-binding"
                                      ng-bind-html="'$' + ((lot.currentBid * lot.dollar) | number: 0)"
                                    >
                                      $63
                                    </span>
                                    <span
                                      class="euro ng-binding"
                                      ng-bind-html="', €' + ((lot.currentBid * lot.euro) | number: 0)"
                                    >
                                      , €56
                                    </span>
                                    <span>)</span>
                                  </span>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="bidded-auctions__buttons">
                          <div class="lot_cancel_bid">
                            <a
                              class="button tertiary-btn"
                              ng-show="lot.isLotActive"
                              href="https://www.romanumismatics.com/index.php?option=com_timed_auction&amp;view=lot_detail&amp;low_estimate=0&amp;high_estimate=0&amp;keyword=&amp;exclude_keyword=&amp;sort_by=lot_number&amp;image_filter=0&amp;box_filter=0&amp;paper_filter=0&amp;export_issue=0&amp;arr=0&amp;auction_id=58&amp;list_type=list_view&amp;gridtype=listview&amp;lots_per_page=100&amp;page_no=0&amp;lot_id=16621&amp;search_type=&amp;year=&amp;month=&amp;department_id=&amp;cat_id="
                            >
                              Bid Now
                            </a>
                            <a
                              class="btn red-btn closed-btn ng-hide"
                              ng-show="!lot.isLotActive"
                              href="javascript:void(0)"
                            >
                              Closed
                            </a>
                          </div>
                          <a
                            class="button button-right quinary-ghost-btn"
                            href="https://www.romanumismatics.com/index.php?option=com_timed_auction&amp;view=lot_detail&amp;low_estimate=0&amp;high_estimate=0&amp;keyword=&amp;exclude_keyword=&amp;sort_by=lot_number&amp;image_filter=0&amp;box_filter=0&amp;paper_filter=0&amp;export_issue=0&amp;arr=0&amp;auction_id=58&amp;list_type=list_view&amp;gridtype=listview&amp;lots_per_page=100&amp;page_no=0&amp;lot_id=16621&amp;search_type=&amp;year=&amp;month=&amp;department_id=&amp;cat_id="
                          >
                            View Lot Detail
                          </a>
                          {/* <!-- <div class="lot_cancel_bid">
								<a class="button primary-ghost-btn" ng-show="lot.excessBid" ng-click="removeExcessBid(lot)">Remove Excess</a>
							</div> --> */}
                          <div class="timed_boxes cf">
                            <div class="bids_placed_box timed-box bidding-close-time">
                              <p class="timed-box-label">Closes:</p>
                              <p class="bid-no-bids timed-box-value">
                                <span
                                  ng-bind-html="(lot.remaining_date)"
                                  class="ng-binding"
                                >
                                  11-Jul-2019 13:00:15
                                </span>
                              </p>
                            </div>
                            <div class="bids_placed_box timed-box time-remaining">
                              <p
                                class="timed-box-label ng-binding"
                                ng-bind="(lot.buy_now == 1)?'Time Left:': 'Closing in:'"
                              >
                                Closing in:
                              </p>
                              <p class="bid-no-bids timed-box-value">
                                <span data-countdown="lot.remaining_time">
                                  14d 19:33:18
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="catalogue-view__details__bottom">
                          <div
                            class="timed-bid-message timed-bid-message-gs timed-bid-message-sd"
                            ng-show="sharedService.userLoggedIn"
                          >
                            <div
                              class="timed-top-box winning-box"
                              ng-show="lot.isWinning"
                            >
                              <p class="left-heading">
                                You are the highest bidder.
                              </p>
                              <p class="timed-description winning-bid-message winning-bid-message-sd desktop">
                                You currently have the highest bid with your
                                maximum bid of
                                <strong
                                  class="timed-userbid-amount ng-binding"
                                  ng-bind-html="'£' +(lot.userBiddedAmount | number:0)"
                                >
                                  £220
                                </strong>
                                . If the auction was ending now, you would win
                                this lot at
                                <strong
                                  class="timed-bid-amount ng-binding"
                                  ng-bind-html="'£' + (lot.currentBid | number:0)"
                                >
                                  £50
                                </strong>
                                .<br />
                              </p>
                            </div>
                            <div
                              class="timed-top-box won-box ng-hide"
                              ng-show="lot.hasWon"
                            >
                              <p class="left-heading">Won</p>
                              <p>
                                You have secured this lot with a bid of
                                <strong
                                  class="timed-bid-amount ng-binding"
                                  ng-bind-html="'£' + (lot.currentBid | number:0)"
                                >
                                  £50
                                </strong>
                                . We are currently processing the auction
                                results and you will receive a confirmation
                                email once this is complete.
                                <br />
                              </p>
                            </div>
                            <div
                              class="timed-top-box bid-low-box low-bid-warning ng-hide"
                              ng-show="lot.hasOutBid &amp;&amp; lot.isLotActive"
                            >
                              <p class="left-heading">You have been outbid</p>
                              <p class="timed-description bid-low-message-sd desktop">
                                Another bidder has entered a higher maximum bid
                                and you have been <strong>outbid!</strong>{" "}
                                Please increase your maximum bid of
                                <strong
                                  class="timed-userbid-amount ng-binding"
                                  ng-bind-html="'£' +(lot.userBiddedAmount | number:0)"
                                >
                                  £220
                                </strong>
                                .<br />
                              </p>
                            </div>
                            <div
                              class="timed-top-box bid-low-box bid-sold-outbid ng-hide"
                              ng-show="lot.hasOutBid &amp;&amp; !lot.isLotActive"
                            >
                              <p class="left-heading">Outbid</p>
                              <p class="timed-description bid-low-message-sd">
                                Lot Sold for
                                <strong
                                  class="timed-bid-amount ng-binding"
                                  ng-bind-html="'£' + (lot.currentBid | number:0)"
                                >
                                  £50
                                </strong>
                                . Your bid was
                                <strong
                                  class="timed-userbid-amount ng-binding"
                                  ng-bind-html="'£' + (lot.userBiddedAmount | number:0)"
                                >
                                  £220
                                </strong>
                                .<br />
                              </p>
                            </div>

                            <div
                              class="timed-top-box bid-low-box under-reserve-bid-warning ng-hide"
                              ng-show="lot.underReserve &amp;&amp; lot.isLotActive &amp;&amp; !lot.isWinning"
                            >
                              <p class="left-heading">Your bid is too low</p>
                              {/* <!-- <p class="timed-description bid-low-message-sd">Your bid is under reserve.<br></p> --> */}
                            </div>
                          </div>
                          {/* <!-- end .timed-bid-message timed-bid-message-gs timed-bid-message-sd --> */}
                        </div>
                      </div>
                      {/* <!-- end ngRepeat: lot in auction.lots --> */}
                    </div>
                  </div>
                  {/* <!-- end ngRepeat: auction in bids --> */}
                </div>

                <div
                  class="auction-bid-holder current-auction-bid-holder no-bidding ng-hide"
                  ng-show="!anyBidsActiveInAnyAuctions(bids)"
                >
                  <div class="bidded-auctions bidded-auctions-1 auction-open">
                    <div class="bidded-auctions__title">
                      <h3>
                        <span
                          class="ba-auction-name ng-binding"
                          ng-bind="loading?'Loading':'There are currently no timed auction bids placed'"
                        >
                          There are currently no timed auction bids placed
                        </span>
                      </h3>
                      <span class="title-rotate-span" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div class="padded-inner logged-in" />
          </div>
        </div>
      </>
    );
  }
}

export default MyBids;
