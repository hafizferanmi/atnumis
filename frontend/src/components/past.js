import React, { Component } from "react";
class PastAuctions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="page cf">
          <div id="system-message-container" />

          <section className="centered archive-center">
            <div className="catalogue-intro page-intro calendar-page-title">
              <h1
                style="padding-top:20px; text-align:center;"
                className="uppercase"
              >
                Archive
              </h1>
            </div>
          </section>

          <section className="centered filter-section past-sales-filter calendar-page-title archive-center">
            <div className="full-width__filters-holder">
              {/* <!-- Sort by filter --> */}

              <div className="filter filter-border-bottom" id="filter-search">
                <div className="mod-search-left past_sales_filter">
                  <input
                    type="text"
                    id="keyword"
                    value=""
                    name="enterkeyword"
                    placeholder="Search Archive"
                  />
                  <input type="hidden" value="9099" name="cid" />
                  <input type="hidden" value="" id="slot" name="slot" />
                  <input type="hidden" name="keysearch" value="Search" />
                  <input
                    type="hidden"
                    name="auctionDate"
                    id="auctionDate"
                    value=""
                  />
                </div>
              </div>
              <div
                className="filter uppercase view-fil year-filter"
                id="lots-per-page"
              >
                <select
                  className="pagelimit year-dropdown-gs select-year-gs"
                  id="limit"
                >
                  <option>Year</option>
                  <option data-year="2019" className="uppercase" id="">
                    2019
                  </option>
                  <option data-year="2018" className="uppercase" id="">
                    2018
                  </option>
                </select>
              </div>

              <div
                className="filter uppercase view-fil reset-archive-filter"
                id="view-all"
              >
                <p className="sel-value uppercase reset-p button reset-filters-btn">
                  RESET FILTERS
                </p>
              </div>

              <div className="filter uppercase pag-filter" id="pagination-filter">
                <ul className="archive-paginaton">
                  <li className="active">
                    <a href="javascript:void(0);" data-page="1">
                      1
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="centered catalogue-wrapper catalogue-calendar">
            <div id="archive-loading" style="display: none;">
              <p>Loading ....</p>
            </div>
            <div className="catalogue-view past-sales-gs item-page">
              <ul id="ul-list" className="ul-list cf">
                <li className="lot-item archive-auction-gs" data-name="E-Sale 56 ">
                  <div className="catalogue-view__img archive-view__img">
                    <div className="lot-img">
                      <div className="cal_action_date no-bg">
                        <img
                          src="https://www.romanumismatics.com/images/auctions/calendar_201.jpg"
                          title="E-Sale 56 "
                          alt="E-Sale 56 "
                          width="150"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="catalogue-view__details right-col">
                    <div className="catalogue-view__details__left archive-view__details__left">
                      <div className="auction-name">
                        <h2>
                          <a
                            href="https://www.romanumismatics.com/index.php?option=com_timed_auction&amp;auction_id=55"
                            title="E-Sale 56 "
                          >
                            {/* <!-- Added substring to fix view issues for testing --> */}
                            E-Sale 56{" "}
                          </a>
                        </h2>
                      </div>

                      <div className="auction-date">
                        <h4>9th May 2019</h4>
                      </div>

                      <p className="auction-text" />
                    </div>

                    <div className="catalogue-view__details__right buy_unsold">
                      <a
                        href="https://www.romanumismatics.com/index.php?option=com_timed_auction&amp;auction_id=55"
                        className="buy_unsold"
                      >
                        Buy Unsolds
                      </a>
                    </div>
                    <div className="catalogue-view__details__right archive__details__right right-col">
                      <a
                        href="https://www.romanumismatics.com/index.php?option=com_timed_auction&amp;auction_id=55"
                        className="primary-ghost-btn"
                      >
                        View Results
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <div className="padded-inner " />
        </div>
      </>
    );
  }
}

export default PastAuctions;
