import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addCoinToCart } from "../actions/cart.action";

class BuyingCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addToCart = coin => {
    //save the coin property to the store
    this.props.addCoinToCart(coin);
  };

  render() {
    const { coin } = this.props;
    return (
      <>
        <li className="lot-item">
          <div className="lot-name-spacer" />
          <div className="lot-item__inner clearfix">
            <div className="catalogue-view__img">
              <Link
                to={`/buy/${coin.id}/${coin.slug ||
                "slug"}`}
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
                    {/* <span> {coin.coin_id} </span> */}
                    {`${coin.country}, ${coin.region}. ${coin.ruler}, ${
                      coin.date
                    }`}{" "}
                    ...
                  </p>
                </div>

                {/* Show price for coins that are for sale here */}
                <div style={{ display: "" }} className="lot-login">
                  <span className="lot-estimate-label hammer-price">
                    <b>Price: </b>
                  </span>
                  <span className="lot-estimate-range lot-hammer-sum">
                    ${coin.price}
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
                        this.addToCart(coin);
                      }}
                      className="secondary-btn bid-live-btn min-width place-bid-btn"
                    >
                      <span className="" title="Add to cart">
                        Add to cart
                      </span>
                    </a>
                  </div>

                  <div className="lot-viewlot">
                    <Link
                      className="min-width quinary-ghost-btn"
                      title="Full details"
                      to={`/buy/${coin.id}/${coin.slug ||
                        "slug"}`}
                    >
                      Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </>
    );
  }
}

BuyingCoin.propTypes = {
  coin: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

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
)(BuyingCoin);
