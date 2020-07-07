import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeCoinFromCart } from "../actions/cart.action";
import { Helmet } from 'react-helmet';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridType: "ul-list",
      cartItems: []
    };
  }

  removeFromCart = coin => {
    this.props.removeCoinFromCart(coin);
  };

  render() {
    const { gridType } = this.state;
    let { cartItems } = this.props.cart;
    return (
      <>
      <Helmet>
        <title> My Cart - Atnumis </title>
      </Helmet>

        <div className="page cf">
          <div id="system-message-container" />
          <div className="catalogue-view " id="auction-holder">
            <section className="catalogue-details">
              <div className="catalogue-details-holder">
                <div className="catalogue-details__inner">
                  <h1 className="catalogue-details__title">{"My Cart"} </h1>
                  {cartItems.length <= 0 ? <p> Your cart is empty </p>  : ""}
                  {/* <p>Coins that have being added to cart is viewed here.</p> */}
                  {cartItems.length > 0 ? (
                    <div className="auction-categories">
                      <p>
                        <Link className="clear-button" to="/checkout">
                          Proceed To Checkout
                        </Link>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>

            <section className="centered catalogue-wrapper" id="catalogue-lots">
              <div className="header-pagination">
                <dir-pagination-controls
                  max-size="6"
                  on-page-change="sharedService.lotsPage = newPageNumber; sharedService.filtersChanged = true; getTimedLots();"
                  className="ng-isolate-scope"
                >
                  {/* <!-- ngIf: 1 < pages.length || !autoHide --> */}
                </dir-pagination-controls>
              </div>

              {/* //show when lot is not empty */}
              {}
              <div className="catalogue-view catalogue-list-view" style={{}}>
                {cartItems.length > 0 ? (
                  <ul id={gridType} className={`cf ${gridType}`}>
                    {/* <!-- ngRepeat: lot in lots  | filter:deletedFilter| filter:q | itemsPerPage: filters.lots_per_page --> */}
                    {cartItems.map(coin => {
                      return (
                          <li key={ Math.random() } className="lot-item">
                            <div className="lot-name-spacer" />
                            <div className="lot-item__inner clearfix">
                              <div className="catalogue-view__img">
                                <a
                                  className="lot-image"
                                  style={{
                                    background: `url( /images/4001.188.14_1.jpg )`,
                                    backgroundRepeat: "no-repeat"
                                  }}
                                />
                              </div>
                              <div className="catalogue-view__details">
                                <div className="catalogue-view__details__left">
                                  <div className="lot_description">
                                    <p>
                                      {/* <span> {coin.coin_id} </span> */}
                                      {coin.desc}
                                      ...
                                    </p>
                                  </div>

                                  {/* Show price for coins that are for sale here */}
                                  <div
                                    style={{ display: "" }}
                                    className="lot-login"
                                  >
                                    <span className="lot-estimate-label hammer-price">
                                      <b>Price: </b>
                                    </span>
                                    <span className="lot-estimate-range lot-hammer-sum">
                                      ${coin.price}
                                    </span>
                                  </div>

                                  <div
                                    style={{ display: "" }}
                                    className="lot-login"
                                  >
                                    <span className="lot-estimate-label hammer-price">
                                      <b>Qty: </b>
                                    </span>
                                    <span className="lot-estimate-range lot-hammer-sum">
                                      <b> {coin.qty} </b>
                                    </span>
                                  </div>
                                </div>

                                <div className="catalogue-view__details__right">
                                  {/* Bid action starts here (buttons) */}
                                  <div className="lot-actions lot-actions-gs">
                                    {/* Show add to cart button */}
                                    <div style={{}} className="bid-btn">
                                      <a
                                        onClick={() => {
                                          this.removeFromCart(coin);
                                        }}
                                        className="secondary-btn bid-live-btn min-width place-bid-btn"
                                      >
                                        <span className="" title="Remove from cart">
                                          Remove from cart
                                        </span>
                                      </a>
                                    </div>

                                    <div className="lot-viewlot">
                                      <Link
                                        className="min-width quinary-ghost-btn"
                                        title="Full details"
                                        to={`/buy/${coin.id}/coin-slug`}
                                      >
                                        Full Details
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                      );
                    })}
                    {/* <!-- end ngRepeat: lot in lots  | filter:deletedFilter| filter:q | itemsPerPage: filters.lots_per_page --> */}
                  </ul>
                ) : (
                  ""
                )}
              </div>

              <div className="footer-pagination">
                <dir-pagination-controls
                  max-size="6"
                  on-page-change="sharedService.lotsPage = newPageNumber; sharedService.filtersChanged = true; getTimedLots();"
                  className="ng-isolate-scope"
                >
                  {/* <!-- ngIf: 1 < pages.length || !autoHide --> */}
                </dir-pagination-controls>
              </div>
            </section>
          </div>
          <div className="padded-inner " />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    removeCoinFromCart: coin => {
      dispatch(removeCoinFromCart(coin));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
