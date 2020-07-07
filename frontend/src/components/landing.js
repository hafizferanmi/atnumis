import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchData } from "../http.service";
import Loading from "./loading";
import { connect } from "react-redux";
// import { updateLandingCoins } from "../actions/coin.action";
import { updateLandingCoins } from "../actions/coin.action";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastAuction: {},
      presentAuction: {},
      futureAuction: {},
      auctions: [],
      coins: {},
      isLoading: true
    };
  }

  componentDidMount() {
    let coins = this.props.coins;
    if (coins.length <= 0) {
      fetchData("/landing-page-auctions").then(data => {
        let auctions = data.auctions;
        let coins = data.coins;
        this.props.updateLandingCoins(data);
        this.setState({
          isLoading: false,
          auctions,
          coins,
          pastAuction: auctions[0],
          presentAuction: auctions[1],
          futureAuction: auctions[2]
        });
      });
    } else {
      let auctions = this.props.coins.auctions;
      let coins = this.props.coins.coins;
      this.setState({
        isLoading: false,
        auctions,
        coins,
        pastAuction: auctions[0],
        presentAuction: auctions[1],
        futureAuction: auctions[2]
      });
    }
  }

  render() {
    const {
      pastAuction,
      presentAuction,
      futureAuction,
      isLoading
    } = this.state;
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Helmet>
              <title>
                {" "}
                Atnumis - Buy ancient coins and place bid on auction coins.{" "}
              </title>
            </Helmet>
            <div className="page cf">
              <div className="moduletable">
                <div className="auctions-banner-container">
                  <div className="auctions-banner-inner">
                    <div className="auction-container previous-auctions">
                      <div className="image-container">
                        <img
                          src="images/homepage_208.jpg"
                          title={pastAuction.type}
                          alt={pastAuction.type}
                        />
                      </div>
                      <div className="button-container">
                        <Link
                          to={`/auction/${pastAuction.slug}/coins`}
                          title="View Results"
                        >
                          View Results
                        </Link>
                        <Link
                          title="Buy Unsolds"
                          to={`/auction/${pastAuction.slug}/coins`}
                        >
                          Buy Unsolds
                        </Link>
                      </div>
                    </div>

                    <div className="auction-container upcoming-auction">
                      <div className="image-container">
                        <img
                          src="images/homepage_200.jpg"
                          title="Upcoming Auction"
                          alt="Upcoming Auction"
                        />
                      </div>
                      <div className="button-container">
                        <Link
                          to={`/auction/${presentAuction.slug}/coins`}
                          title="View Lots"
                        >
                          View Lots
                        </Link>
                        <Link
                          title="Remind me"
                          to={`/auction/${presentAuction.slug}/coins`}
                        >
                          Remind Me
                        </Link>
                      </div>
                    </div>

                    <div className="auction-container upcoming-auction">
                      <div className="image-container">
                        <img
                          src="images/homepage_209.jpg"
                          title="Upcoming Auction"
                          alt="Upcoming Auction"
                        />
                      </div>
                      <div className="button-container">
                        <Link
                          to={`/auction/${futureAuction.slug}/coins`}
                          title="Preview Lots"
                        >
                          Preview Lots
                        </Link>
                        <Link to="consign" title="Consign Now">
                          Consign Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="scroll-bottom-holder">
                    <div className="scroll-icon-holder">
                      <span
                        className="scroll__circle-arrow"
                        id="jquery-scroll-featured"
                        style={{
                          backgroundImage:
                            "url('images/banner-scroll-button.png')"
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <script type="text/javascript">
        $('#jquery-scroll-featured').click(function() {
            jQuery('html, body').animate({
                scrollTop: jQuery('.featured_lots_container').offset().top + 'px'
            }, 'fast')
        });
        </script> */}
              </div>
              <div className="item-page">
                <div className="moduletable">
                  <div className="featured_lots_container">
                    <div className="featured-lot-inner-container">
                      <div className="title-container">
                        <h1>Featured Lots</h1>
                      </div>
                      <div className="arrow-container">
                        <img
                          src="images/featured-lots-prev.png"
                          className="prev-arrow"
                          alt="Previous"
                        />
                      </div>
                      <div className="featured-lots-slides-container">
                        <div className="featured_lot">
                          <div className="featured_lots_image">
                            <a href="/200-lot-340-lesbos-mytilene-el-hekte?auction_id=54&amp;view=lot_detail">
                              <img
                                src="images/9026.8.8_1.jpg"
                                alt="featured lots"
                                width="200"
                              />
                            </a>
                          </div>
                          <div className="homepage_block_content">
                            <p className="lot-headline">
                              <strong>
                                A Magnificent Depiction of Silenos
                              </strong>
                            </p>
                            <p className="lot-number">E-Sale 55, Lot 340</p>
                            <p className="lot-name">
                              <a href="/200-lot-340-lesbos-mytilene-el-hekte?auction_id=54&amp;view=lot_detail">
                                Lesbos, Mytilene EL Hekte.{" "}
                              </a>
                            </p>
                            <p className="estimate">
                              <b>Estimate&nbsp;£2,500</b>
                            </p>
                            <p className="estimate-currencies">
                              ($3,270&nbsp;&nbsp;&nbsp;€2,898)
                            </p>
                            {/* <p className="hammer-price"><b>Hammer Price&nbsp;&nbsp;&nbsp;£0.00</b></p>  */}
                          </div>
                        </div>
                        <div className="featured_lot">
                          <div className="featured_lots_image">
                            <a href="/200-lot-681-augustus-av-aureus?auction_id=54&amp;view=lot_detail">
                              <img
                                src="images/4001.188.14_1.jpg"
                                alt="featured lots"
                                width="200"
                              />
                            </a>
                          </div>
                          <div className="homepage_block_content">
                            <p className="lot-headline">
                              <strong>A Beautiful Aureus of Augustus</strong>
                            </p>
                            <p className="lot-number">E-Sale 55, Lot 681</p>
                            <p className="lot-name">
                              <a href="/200-lot-681-augustus-av-aureus?auction_id=54&amp;view=lot_detail">
                                Augustus AV Aureus.{" "}
                              </a>
                            </p>
                            <p className="estimate">
                              <b>Estimate&nbsp;£6,500</b>
                            </p>
                            <p className="estimate-currencies">
                              ($8,503&nbsp;&nbsp;&nbsp;€7,534)
                            </p>
                            <p className="hammer-price">
                              {/* <b>Hammer Price&nbsp;&nbsp;&nbsp;£0.00</b> */}
                            </p>
                          </div>
                        </div>
                        <div className="featured_lot">
                          <div className="featured_lots_image">
                            <a href="/200-lot-719-nero-av-aureus?auction_id=54&amp;view=lot_detail">
                              <img
                                src="images/9004.178.1_1.jpg"
                                alt="featured lots"
                                width="200"
                              />
                            </a>
                          </div>
                          <div className="homepage_block_content">
                            <p className="lot-headline">
                              <strong>A Fine Style Aureus of Nero</strong>
                            </p>
                            <p className="lot-number">E-Sale 55, Lot 719</p>
                            <p className="lot-name">
                              <a href="/200-lot-719-nero-av-aureus?auction_id=54&amp;view=lot_detail">
                                Nero AV Aureus.{" "}
                              </a>
                            </p>
                            <p className="estimate">
                              <b>Estimate&nbsp;£3,500</b>
                            </p>
                            <p className="estimate-currencies">
                              ($4,578&nbsp;&nbsp;&nbsp;€4,057)
                            </p>
                            <p className="hammer-price">
                              {/* <b>Hammer Price&nbsp;&nbsp;&nbsp;£0.00</b> */}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="arrow-container">
                        <img
                          src="images/featured-lots-next.png"
                          className="next-arrow"
                          alt="Next"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="moduletable">
                  <section className="homepage_blocks">
                    <h2 className="h1">Buying And Selling</h2>
                    <ul className="homepage_block_items block_one_style_one block_two_style_one block_three_style_one">
                      <li className="homepage_block_item style_one">
                        <div className="homepage_block_image">
                          <Link to="/buying" title="Buying">
                            <img src="images/buying.jpg" alt="Buying" />
                          </Link>
                        </div>
                        <div className="homepage_block_content">
                          <h2>
                            <Link to="/buying" title="Buying">
                              Buying{" "}
                            </Link>
                          </h2>
                          <p>
                            We make buying at auction easy and enjoyable - find
                            out why
                          </p>
                        </div>
                      </li>
                      <li className="homepage_block_item style_one">
                        <div className="homepage_block_image">
                          <Link to="/selling" title="Selling">
                            <img src="images/1selling.jpg" alt="Selling" />
                          </Link>
                        </div>
                        <div className="homepage_block_content">
                          <h2>
                            <Link to="/selling" title="Selling">
                              Selling{" "}
                            </Link>
                          </h2>
                          <p>Selling made simple - find out how</p>
                        </div>
                      </li>
                      <li className="homepage_block_item style_one">
                        <div className="homepage_block_image">
                          <Link to="/valuations" title="Valuations">
                            <img
                              src="images/1valuations.jpg"
                              alt="Valuations"
                            />
                          </Link>
                        </div>
                        <div className="homepage_block_content">
                          <h2>
                            <Link to="/valuations" title="Valuations">
                              Valuations{" "}
                            </Link>
                          </h2>
                          <p>Submit items for pre sale valuation</p>
                        </div>
                      </li>
                    </ul>
                  </section>
                  <section className="homepage_blocks">
                    <h2 className="h1">Resources</h2>
                    <ul className="homepage_block_items block_one_style_one block_two_style_one block_three_style_one">
                      <li className="homepage_block_item style_one">
                        <div className="homepage_block_image">
                          <Link to="/bibliography" title="Bibliography">
                            <img
                              src="images/bibliography.jpg"
                              alt="Bibliography"
                            />
                          </Link>
                        </div>
                        <div className="homepage_block_content">
                          <h2>
                            <Link to="/bibliography" title="Bibliography">
                              Bibliography{" "}
                            </Link>
                          </h2>
                          <p>Access to our extensive bibliography</p>
                        </div>
                      </li>
                     
                      <li className="homepage_block_item style_one">
                        <div className="homepage_block_image">
                          <Link to="/mint" title="Mints of the Ancient World">
                            <img
                              src="images/mints.jpg"
                              alt="Mints of the Ancient World"
                            />
                          </Link>
                        </div>
                        <div className="homepage_block_content">
                          <h2>
                            <Link to="/mint" title="Mints of the Ancient World">
                              Mints of the Ancient World{" "}
                            </Link>
                          </h2>
                        </div>
                      </li>
                      <li className="homepage_block_item style_one">
                        <div className="homepage_block_image">
                          <Link
                            to="/historicarticles"
                            title="Historical Articles"
                          >
                            <img
                              src="images/historical.jpg"
                              alt="Historical Articles"
                            />
                          </Link>
                        </div>
                        <div className="homepage_block_content">
                          <h2>
                            <Link
                              to="/historicarticles"
                              title="Historical Articles"
                            >
                              Historical Articles{" "}
                            </Link>
                          </h2>
                          <p>Find out more</p>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
              <div id="system-message-container" />
              <div
                className="blog-featured"
                itemScope=""
                itemType="https://schema.org/Blog"
              />

              <input
                type="hidden"
                id="base_url"
                value="https://www.atnumis.com/"
              />
            </div>
          </>
        )}{" "}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    coins: state.coins.landingPageAuctions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLandingCoins: payload => {
      dispatch(updateLandingCoins(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
