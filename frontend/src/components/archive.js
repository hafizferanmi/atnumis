import React, { Component } from "react";
import Loading from "./loading";
import { fetchData } from "../http.service";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { updateArchiveAuctions } from "../actions/coin.action";

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      archiveAuctions: []
    };
  }

  componentWillMount() {
    let coins = this.props.archiveAuctions;
    // console.log({ coins: coins.length });
    if (coins.length <= 0) {
      this.setState({ isLoading: true });
      fetchData(`/auction/archive`).then(data => {
        this.props.updateArchiveAuctions(data);
        this.setState({ isLoading: false, archiveAuctions: data });
      });
    } else {
      this.setState({ archiveAuctions: coins });
    }
  }
  render() {
    const { isLoading, archiveAuctions } = this.state;
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Helmet>
              <title> Archive Auctions - Atnumis </title>
            </Helmet>
            <div className="page cf">
              <div id="system-message-container" />

              <form
                method="post"
                name="frm_calender"
                className="sales-calendar-page-holder calendar-page-holder"
              >
                <div id="display_container">
                  <div className="sales-calendar-title calendar-page-title">
                    <h1 className="catalogue-details__title">
                      Archived Auctions
                    </h1>
                  </div>

                  <div className="calendar-filters-container cf">
                    <div className="calendar-view-by-month">
                      <select id="calendar-month-select-js">
                        <option value="">View By Month</option>
                        <option value="05">May </option>
                        <option value="06">June </option>
                        <option value="07">July </option>
                        <option value="08">August </option>
                        <option value="09">September </option>
                        <option value="10">October </option>
                        <option value="11">November </option>
                        <option value="12">December </option>
                      </select>
                    </div>

                    <div className="calendar-reset-filters">
                      <button className="quinary-btn" id="reset-filters">
                        Reset Filters
                      </button>
                    </div>

                    {/* <div className="calendar-archived-sales">
                      <Link
                        className="quinary-ghost-btn"
                        title="Archived Auctions"
                        to="/archive"
                      >
                        Archived Auctions
                      </Link>
                    </div> */}
                  </div>

                  {archiveAuctions.map(auction => {
                    return (
                      <div
                        key={auction.id}
                        className="auction-calendar item-page"
                      >
                        <div className="cal_auction_box">
                          <div className="auction_text_content cf">
                            <div className="auction_top_detail auction-cal__detail">
                              <div className="auction-thumb-image auction-cal__image">
                                <Link to="/auction-id" title={auction.type}>
                                  <img
                                    to={`/auction/${auction.slug}/coins`}
                                    src="images/homepage_209.jpg"
                                    title={auction.type}
                                    alt={auction.type}
                                  />
                                </Link>
                              </div>

                              <div className="auction-cal__info">
                                <h2 className="auction-cal__info__name">
                                  <Link
                                    className="auction-title"
                                    to={`/auction/${auction.slug}/coins`}
                                    title={auction.type}
                                  >
                                    {auction.type}
                                  </Link>
                                </h2>

                                <h4 className="auction-date">
                                  {auction.ends_at}
                                </h4>
                                {/* <!--<p className="location-text"></p>--> */}
                                <p className="auction-text" />

                                {/* <!--<p className="viewing-times-text"></p>--> */}
                              </div>

                              <div className="auction_buttons auction-cal__buttons">
                                <>
                                  {auction.unsold ? (
                                    <Link
                                      className="button tertiary-btn"
                                      title="View catalogue"
                                      to={`/auction/${auction.slug}/coins`}
                                    >
                                      Buy Unsolds
                                    </Link>
                                  ) : (
                                    ""
                                  )}
                                </>

                                <Link
                                  className="button quinary-ghost-btn"
                                  title="View Results"
                                  to={`/auction/${auction.slug}/coins`}
                                >
                                  View Results
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </form>

              <div className="padded-inner " />
            </div>
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    archiveAuctions: state.coins.archiveAuctions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateArchiveAuctions: payload => {
      dispatch(updateArchiveAuctions(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);
