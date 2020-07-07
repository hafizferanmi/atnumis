import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import CheckoutItem from "./checkout-item";
import { postData } from "../http.service";
import { clearCart } from "../actions/cart.action";
import { openLoginModal } from "../actions/loginModal.action";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      checkedOut: false
    };
  }

  checkOut = (e, items) => {
    e.preventDefault();
    this.setState({ processing: true });
    postData("/checkout", { items }).then(response => {
      // console.log(response);
      if (response.error) {
        this.setState({ processing: false });
      } else {
        // this.setState({ processing: false });
        this.props.clearCart();
        this.props.history.push('/checkout/success');
      }
    });
  };

  openLoginModal = e => {
    e.preventDefault();
    this.props.openLoginModal();
  };

  render() {
    let {
      cart: { cartItems },
      user: { isUserLoggedIn }
    } = this.props;
    const { processing } = this.state;
    return (
      <>
        <Helmet>
          <title> Checkout - Atnumis </title>
        </Helmet>
        <div className="page cf">
          <div id="display_container">
            <div className="sales-calendar-title calendar-page-title">
              <h1 className="catalogue-details__title">Checkout</h1>
            </div>
          </div>

          <div className="auction-calendar item-page">
            <div className="cal_auction_box">
              {cartItems.length > 0 ? (
                <div className="auction_text_content cf">
                  {cartItems.map(item => {
                    return <CheckoutItem key={item.id} item={item} />;
                  })}
                </div>
              ) : (
                <p style={{ textAlign: "center" }}>Your cart is empty</p>
              )}
            </div>

            {cartItems.length > 0 ? (
              <>
                {!processing ? (
                  <div style={{ float: "right" }}>
                    {isUserLoggedIn ? (
                      <a
                        className="button tertiary-btn"
                        title="Proceed to checkout"
                        href="#"
                        onClick={e => {
                          this.checkOut(e, cartItems);
                        }}
                      >
                        Proceed to checkout
                      </a>
                    ) : (
                      <a
                        className="button tertiary-btn"
                        title="Login to checkout"
                        href="#"
                        onClick={e => {
                          this.openLoginModal(e);
                        }}
                      >
                        Login to checkOut
                      </a>
                    )}
                  </div>
                ) : (
                  <>
                    <div style={{ float: "right" }}>
                      <a
                        className="button tertiary-btn"
                        title="Processing"
                        href="#"
                      >
                        Processing...
                      </a>
                    </div>
                  </>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearCart()),
    openLoginModal: () => dispatch(openLoginModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
