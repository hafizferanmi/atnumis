import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeCoinFromCart, updateCoinQty } from "../actions/cart.action";

class CheckoutItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1
    };
  }

  updateCart = (coin, qty) => {
    this.props.updateCoinQty(coin, qty);
  };

  removeItemInCart = coin => {
    this.props.removeCoinFromCart(coin);
  };

  handleInputChange = e => {
    let qty = e.target.value;
    if (isNaN(qty) || qty <= 0) {
      qty = 1;
    }
    this.setState({ qty: parseInt(qty) });
  };

  componentWillMount() {
    this.setState({
      qty: this.props.item.qty
    });
  }

  render() {
    let { item } = this.props;
    let { qty } = this.state;
    return (
      <>
        <div
          className="auction_top_detail auction-cal__detail"
          style={{ marginTop: "20px" }}
        >
          <div className="auction-thumb-image auction-cal__image">
            <Link to="/auction-id">
              <img
                src="images/homepage_209.jpg"
                title={item.desc}
                alt={item.desc}
              />
            </Link>
          </div>

          <div className="auction-cal__info">
            <h2 className="auction-cal__info__name">
              <Link
                className="auction-title"
                to={`Hello-wordld`}
                title={item.desc}
              >
                {item.desc}
              </Link>
            </h2>

            {/* <p className="location-text">Some other text</p> */}
            <p className="auction-text">
              <span>
                <input
                  onChange={this.handleInputChange}
                  style={{
                    width: "15%",
                    border: "1px solid #4d4d4d"
                  }}
                  defaultValue={this.state.qty}
                  min="1"
                />
              </span>
              <span>
                {" "}
                <a onClick={() => this.updateCart(item, qty)}> Update </a>{" "}
              </span>{" "}
              |
              <span>
                {" "}
                <a onClick={() => this.removeItemInCart(item)}> Remove </a>{" "}
              </span>
              {/* <span> <a href='#' > Add </a> </span> */}
            </p>

            <p className="auction-date">
              Price: <strong> ${item.price} </strong>
            </p>

            {/* <!--<p className="viewing-times-text"></p>--> */}
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCoinFromCart: coin => {
      dispatch(removeCoinFromCart(coin));
    },
    updateCoinQty: (coin, qty) => {
      dispatch(updateCoinQty(coin, qty));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
