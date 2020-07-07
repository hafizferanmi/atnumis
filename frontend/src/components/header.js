import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { fetchData, postData } from "../http.service";
import { connect } from "react-redux";
import { openLoginModal, closeLoginModal } from "../actions/loginModal.action";
import {
  updateUserDetails,
  userLogout,
  updateUserDetailsFromCookie
} from "../actions/user.action";
import { withCookies } from "react-cookie";
import {
  getUserTokenFromCookie,
  getUsernamefromCookie,
  getCartItemFromCookie
} from "../cookie.service";
import { updateCartFromCookie } from "../actions/cart.action";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      buttonDisabled: false,
      showCart: true,
      isLoggedIn: false,
      loginEmptyError: false,
      isCheckingLoginCredentials: false,
      userDetails: {},
      logginIn: {
        processing: false,
        error: false
      },
      loginError: false
    };
  }

  openLoginModal = () => {
    this.props.openLoginModal();
  };

  closeLoginModal = () => {
    this.props.closeLoginModal();
  };

  logout = () => {
    this.props.logOut();
    this.openLoginModal();
    this.props.history.push('/');
  };

  login = e => {
    e.preventDefault();
    this.setState({
      isCheckingLoginCredentials: true,
      buttonDisabled: true,
      loginError: false
    });
    // alert("Login In");
    const data = {
      username: e.target.elements.username.value,
      password: e.target.elements.password.value
    };

    let submittedData = Object.values(postData);
    if (submittedData.includes("")) {
      this.setState({ loginEmptyError: true, buttonDisabled: false,  });
      return;
    }

    postData(`/login`, data).then(data => {
      this.setState({
        buttonDisabled: false
      });
      if (!data.error) {
        let userData = data.data;
        // console.log(userData);
        this.props.updateUserDetails(userData);
        this.closeLoginModal();
      } else {
        this.setState({ loginError: true });
      }
    });
  };

  submitNewsletter() {
    return true;
  }

  setsearchInputFocus() {
    return true;
  }

  componentWillMount() {
    let username = getUsernamefromCookie();
    let token = getUserTokenFromCookie();
    let cartDetails = getCartItemFromCookie();
    if (!username || !token) {
      this.props.updateUserDetailsFromCookie({ isLoggedIn: false });
    } else {
      this.props.updateUserDetailsFromCookie({ isLoggedIn: true });
    }

    if (!cartDetails) {
      this.props.updateCartFromCookie({ isItemInCart: false });
    } else {
      this.props.updateCartFromCookie({ isItemInCart: true });
    }
  }

  componentDidMount() {
    // if (isAuthenticated) {
    //   this.setState({ isLoggedIn: true });
    // }
  }

  render() {
    const { cartItems, noOfItemsInCart, ammountInCart } = this.props.cartItem;
    const { isModalOpen } = this.props.loginModal;
    const { userDetails, isUserLoggedIn } = this.props.user;
    const svgCss = `.cls-1{stroke-width: 0px;fill:#3c3c3b;}`;
    const svgCss3 = `.cls-1{fill:none;stroke:#3c3c3b;stroke-linecap:square;stroke-miterlimit:10;stroke-width:4.6px;}`;
    const svgCss2 = `.cls-1{stroke-width: 0px;fill:#3c3c3b;}.cls-2{fill:none;stroke:#3c3c3b;stroke-linecap:square;stroke-miterlimit:10;}`;
    const {
      showCart,
      isLoggedIn,
      loginError,
      buttonDisabled,
      loginEmptyError
    } = this.state;
    return (
      <>
        <div>
          <Modal
            isOpen={isModalOpen}
            toggle={this.closeLoginModal}
            className={this.props.className}
          >
            {/* <ModalHeader toggle={this.closeLoginModal}>Login</ModalHeader> */}
            <ModalBody>
              <form className="formform" onSubmit={this.login}>
                <div id="login-box">
                  <h1>Login</h1>

                  <div id="login-overlay-">
                    {loginError ? (
                      <div
                        className="centered"
                        style={{ color: "red", textAlign: "center" }}
                      >
                        Invalid Username Or Password
                      </div>
                    ) : (
                      ""
                    )}
                    {loginEmptyError ? (
                      <div className="alert alert-info">
                        Fill form field before clicking on the submit button.
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="username-hold">
                    <input
                      onFocus={() => {
                        this.setState({ loginError: false });
                      }}
                      ref={this.usernameRef}
                      className="username-input"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="password-hold">
                    <input
                      onFocus={() => {
                        this.setState({ loginError: false });
                      }}
                      ref={this.passwordRef}
                      className="password-input "
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>

                  <div className="remember-hold">
                    <input
                      className="remember-input"
                      type="checkbox"
                      name="Remember"
                      alt="Remember me"
                    />
                    <p className="remember">Remember me</p>
                  </div>

                  <input
                    // onClick={this.login}
                    disabled={buttonDisabled}
                    type="submit"
                    name="Submit"
                    className="button"
                    value={buttonDisabled ? "Loggin In" : "Login"}
                  />
                  <div className="forgot-password">
                    <Link to="/forgot-password" title="Forgot password">
                      {" "}
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="register-hold">
                    <p style={{ color: "white" }}>
                      Not registered yet? The registration takes just a few
                      minutes, it is free and gives you access to our auction
                      archive and biddings.
                    </p>
                    <Link
                      to="/signup"
                      className="signup_overlay quinary-btn"
                      title="Register"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>

        <div className="header-wrapper" id="top">
          <div className="am-stats-section" />

          <div className="header-section cf">
            <div className="header-left">
              <ul className="header-links">
                {isUserLoggedIn ? (
                  <>
                    <li className="account" style={{}}>
                      <Link
                        to="/account"
                        className="account-link desk-view primary-btn"
                        title="My Account"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/account"
                        className="account-link mobile-view"
                        title="My Account"
                      >
                        <svg
                          style={{ width: "18px" }}
                          alt="My Account"
                          title=" My Account"
                          id="svg-icon__profile"
                          data-name="Profile Icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 23 28.67"
                        >
                          <defs>
                            <style>{svgCss}</style>
                          </defs>
                          <title>Profile Icon</title>
                          <path
                            className="cls-1"
                            d="M11.12,27.31A13.32,13.32,0,0,1,3.6,25a4.63,4.63,0,0,1-2.09-2.8,6.12,6.12,0,0,1,0-1.85,21.49,21.49,0,0,1,1.13-5,4.43,4.43,0,0,1,2.52-2.65c.14-.06.29-.11.43-.18a1.4,1.4,0,0,1,1.8.26A6.27,6.27,0,0,0,16,12.37a.47.47,0,0,1,.54-.13,5.08,5.08,0,0,1,3.14,2,10.65,10.65,0,0,1,1,2.43,20.54,20.54,0,0,1,.83,4.89A2.94,2.94,0,0,1,21,23.32a7.62,7.62,0,0,1-3.16,2.57A14.74,14.74,0,0,1,11.12,27.31Z"
                          >
                            <path
                              className="cls-1"
                              d="M17.07,7c-.15,2.74-1.17,4.64-3.44,5.69A5.31,5.31,0,0,1,7,10.71,6.14,6.14,0,0,1,8.07,2.59,5.4,5.4,0,0,1,16.62,5,14.5,14.5,0,0,1,17.07,7Z"
                            />
                          </path>
                        </svg>
                      </Link>
                    </li>
                    <li className="logout" style={{}}>
                      <Link
                        to="#"
                        className="sign-out desk-view tertiary-btn"
                        title="Sign Out"
                        onClick={this.logout}
                      >
                        Log Out
                      </Link>

                      <Link
                        to="#"
                        className="sign-out mobile-view"
                        title="Sign Out"
                        onClick={this.logout}
                      >
                        Log Out
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="signup" style={{}}>
                      <Link
                        to="/signup"
                        className="sign-up desk-view tertiary-btn"
                        title="Sign Up"
                      >
                        Sign Up
                      </Link>{" "}
                      <Link
                        to="/signup"
                        className="sign-up mobile-view"
                        title="Sign Up"
                      >
                        <svg
                          style={{ width: "18px" }}
                          alt="Signup"
                          title="Signup"
                          id="svg-icon__new-account"
                          data-name="New Account Icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 23 28.67"
                        >
                          <defs>
                            <style>{svgCss2}</style>
                          </defs>
                          <title>New Account Icon</title>
                          <path
                            className="cls-1"
                            d="M11.12,27.31A13.32,13.32,0,0,1,3.6,25a4.63,4.63,0,0,1-2.09-2.8,6.12,6.12,0,0,1,0-1.85,21.49,21.49,0,0,1,1.13-5,4.43,4.43,0,0,1,2.52-2.65c.14-.06.29-.11.43-.18a1.4,1.4,0,0,1,1.8.26A6.27,6.27,0,0,0,16,12.37a.47.47,0,0,1,.54-.13,5.08,5.08,0,0,1,3.14,2,10.65,10.65,0,0,1,1,2.43,20.54,20.54,0,0,1,.83,4.89A2.94,2.94,0,0,1,21,23.32a7.62,7.62,0,0,1-3.16,2.57A14.74,14.74,0,0,1,11.12,27.31Z"
                          >
                            <path
                              className="cls-1"
                              d="M17.07,7c-.15,2.74-1.17,4.64-3.44,5.69A5.31,5.31,0,0,1,7,10.71,6.14,6.14,0,0,1,8.07,2.59,5.4,5.4,0,0,1,16.62,5,14.5,14.5,0,0,1,17.07,7Z"
                            >
                              <line
                                className="cls-2"
                                x1="19.4"
                                y1="1.95"
                                x2="19.4"
                                y2="5.74"
                              >
                                <line
                                  className="cls-2"
                                  x1="21.29"
                                  y1="3.85"
                                  x2="17.52"
                                  y2="3.85"
                                />
                              </line>
                            </path>
                          </path>
                        </svg>
                      </Link>
                    </li>
                    <li className="login" style={{}}>
                      <a
                        href="#"
                        className="login-in desk-view primary-btn login-btn-top-men "
                        title="Login"
                        onClick={this.openLoginModal}
                      >
                        Login
                      </a>
                      <a
                        href="#"
                        className="login-in mobile-view login-btn-top-men "
                        title="Login"
                        onClick={this.openLoginModal}
                      >
                        <svg
                          style={{ width: "18px" }}
                          alt="Login"
                          title="Login"
                          id="svg-icon__logout"
                          data-name="Logout Icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 22.17 28.33"
                        >
                          <defs>
                            <style>{svgCss}</style>
                          </defs>
                          <title>Logout Icon</title>
                          <path
                            className="cls-1"
                            d="M21.68,1.36V27H5.11V22.22H6.94v2.87H19.8V3.24H7V6.12H5.11V1.36Z"
                          >
                            <path
                              className="cls-1"
                              d="M9.44,8.26l7.92,5.91-7.91,5.9v-3.7h-9V12H.91C3.6,12,6.28,12,9,12c.37,0,.49-.09.48-.47C9.42,10.47,9.44,9.42,9.44,8.26Z"
                            />
                          </path>
                        </svg>
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="header-middle">
              <div className="logo-holder">
                <Link to="/">
                  <img
                    className="logo"
                    src="/images/roma-logo.jpg"
                    title="Atnumis coin"
                    alt="Atnumis"
                  />
                </Link>
              </div>
            </div>
            <div className="header-right">
              <ul className="header-right-links">
                <li className="menu-trigger">
                  <a href="#" title="Menu Link" className="mobile-view">
                    <svg
                      style={{ width: 18, paddingTop: 2 }}
                      alt="Menu"
                      title="Menu"
                      className="show"
                      id="svg-icon__menu"
                      data-name="Menu Icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 35.17 29.17"
                    >
                      <defs>
                        <style>{svgCss}</style>
                      </defs>
                      <title>Menu Icon</title>
                      <path className="cls-1" d="M34,1.65V7H1.17V1.65Z">
                        <path className="cls-1" d="M34,11.87v5.42H1.17V11.87Z">
                          <path
                            className="cls-1"
                            d="M34,22.1v5.42H1.18V22.1Z"
                          />
                        </path>
                      </path>
                    </svg>
                    <svg
                      alt="Menu"
                      title="Menu"
                      className="close"
                      style={{ width: 18, paddingTop: 1 }}
                      id="svg-icon__close"
                      data-name="Close Icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 31.17 28.17"
                    >
                      <defs>
                        <style>{svgCss3}</style>
                      </defs>
                      <title>Close Icon</title>
                      <line
                        className="cls-2"
                        x1="4.48"
                        y1="4.06"
                        x2="26.69"
                        y2="24.21"
                      >
                        <line
                          className="cls-2"
                          x1="26.6"
                          y1="3.96"
                          x2="4.65"
                          y2="24.21"
                        />
                      </line>
                    </svg>
                  </a>
                </li>
              </ul>

              <div className="search-box-top">
                <div className="moduletable">
                  <div className="search mod_search93">
                    <form action="" method="get" className="form-inline">
                      <label
                        htmlFor="mod-search-searchword"
                        className="element-invisible"
                      >
                        {" "}
                      </label>
                      <input
                        name="keyword"
                        id="mod-search-searchword"
                        maxLength="200"
                        className="inputbox search-query"
                        type="search"
                        size="20"
                        placeholder="click to search »"
                      />
                      {/* <Link to="/advance-search" title="Advanced Search">
                        Advanced Search
                      </Link> */}
                      <input
                        type="image"
                        alt="Search"
                        className="button"
                        src="data:image/svg+xml;base64,PHN2ZyBzdHlsZT0id2lkdGg6MThweDsiIGNsYXNzPSJzaG93IiBhbHQ9Ik1lbnUiIHRpdGxlPSJNZW51IiBpZD0ic3ZnLWljb25fX3NlYXJjaCIgZGF0YS1uYW1lPSJTZWFyY2ggSWNvbiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjkuMTcgMjguNjciPjxkZWZzPjxzdHlsZT4uY2xzLTF7c3Ryb2tlLXdpZHRoOiAwcHg7ZmlsbDojM2MzYzNiO308L3N0eWxlPjwvZGVmcz48dGl0bGU+U2VhcmNoIEljb248L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE5LjMzLDE2LjQ3YTMsMywwLDAsMSwuMzQuMjZsNy43NSw3Ljc1YS44My44MywwLDAsMSwwLDEuMzZxLS42NS42Ny0xLjMyLDEuMzJhLjg0Ljg0LDAsMCwxLTEuMzgsMEwxNywxOS4zOGEyLjYyLDIuNjIsMCwwLDEtLjI0LS4zMyw5LjgxLDkuODEsMCwwLDEtOCwxLjM5QTkuNTUsOS41NSwwLDAsMSwzLjEsMTYuNSw5LjgxLDkuODEsMCwwLDEsMTcsMyw5Ljg5LDkuODksMCwwLDEsMTkuMzMsMTYuNDdabS0xLTUuNDhhNy4xNSw3LjE1LDAsMSwwLTcuMDcsNy4xMkE3LjE1LDcuMTUsMCwwLDAsMTguMzMsMTFaIi8+PC9zdmc+"
                        onClick={this.setsearchInputFocus}
                      />
                      <input type="hidden" name="task" value="search" />
                      <input type="hidden" name="option" value="com_bidders" />
                    </form>
                  </div>
                </div>

                <div className="search-trigger">
                  <Link className="mobile-view" to="#" title="Search">
                    <svg
                      style={{ width: "18px" }}
                      className="show"
                      alt="Menu"
                      title="Menu"
                      id="svg-icon__search"
                      data-name="Search Icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 29.17 28.67"
                    >
                      <defs>
                        <style>{svgCss}</style>
                      </defs>
                      <title>Search Icon</title>
                      <path
                        className="cls-1"
                        d="M19.33,16.47a3,3,0,0,1,.34.26l7.75,7.75a.83.83,0,0,1,0,1.36q-.65.67-1.32,1.32a.84.84,0,0,1-1.38,0L17,19.38a2.62,2.62,0,0,1-.24-.33,9.81,9.81,0,0,1-8,1.39A9.55,9.55,0,0,1,3.1,16.5,9.81,9.81,0,0,1,17,3,9.89,9.89,0,0,1,19.33,16.47Zm-1-5.48a7.15,7.15,0,1,0-7.07,7.12A7.15,7.15,0,0,0,18.33,11Z"
                      />
                    </svg>
                  </Link>
                </div>
                {/* <div className="advanced-search-link">
                  <Link to="/advance-search" title="Advanced Search">
                    Advanced Search
                  </Link>
                </div> */}
              </div>
            </div>
          </div>

          <div className="navigation header-nav">
            <ul className="menu text-white">
              <li className="item-378 deeper parent">
                <span className="separator ">Auctions</span>
                <ul>
                  <li className="item-425">
                    <Link to="/upcoming-auctions">Current Auctions</Link>
                  </li>
                  <li className="item-158">
                    <Link to="/archive" title="Archive ">
                      Past Auctions
                    </Link>
                  </li>
                  {/* <li className="item-440">
                    <a href="/ecatalogue">
                      E-Catalogues
                    </a>
                  </li> */}
                </ul>
              </li>
              <li className="item-399">
                <Link to="/buy-now">Buy Now</Link>
              </li>
              {/* <li className="item-210">
                <a href="/buying" title="Buying">
                  Buying
                </a>
              </li> */}
              <li className="item-211">
                <Link to="/selling" title="Selling">
                  Selling
                </Link>
              </li>
              <li className="item-342">
                <Link to="/departments" title="Departments">
                  Departments
                </Link>
              </li>
              {/* <li className="item-342">
                <Link to="/interview" title="Interview">
                  Interview
                </Link>
              </li> */}
              <li className="item-304 deeper parent">
                <span className="separator ">Services</span>
                <ul>
                  <li className="item-426">
                    <Link to="/auction-representation">
                      Auction Representation
                    </Link>
                  </li>
                  {/* <li className="item-426">
                    <Link to="/consign">Consign</Link>
                  </li>  */}
                  <li className="item-427">
                    <Link to="/authentication-valuation">
                      Authentication and Valuation
                    </Link>
                  </li>
                  <li className="item-428">
                    <Link to="/conservation-service">Conservation Service</Link>
                  </li>
                </ul>
              </li>

              <li className="item-155">
                <Link to="/about-us" title="About us">
                  About Us
                </Link>
              </li>
              <li className="item-400 deeper parent">
                <span className="separator ">Resources</span>
                <ul>
                  <li className="item-412">
                    <Link to="/bibliography">Bibliography</Link>
                  </li>
                  {/* <li className="item-414">
                    <a href="/historicarticle">Historical Articles</a>
                  </li> */}
                </ul>
              </li>
              <li className="item-196">
                <Link to="/contact-us" title="Contact us">
                  Contact
                </Link>
              </li>
              {/* <li className="item-101 current active">
                <a href="/">Home</a>
              </li>
              <li className="item-411">
                <a href="#">Newsletter</a>
              </li> */}
            </ul>
          </div>

          <div className="quick_email_signup_container">
            <div className="quick_email_signup-inner cf">
              <form id="signup-form-top" onSubmit={this.submitNewsletter}>
                <label htmlFor="Email">Sign Up To Our Newsletter</label>
                <div className="input-names">
                  <input
                    type="text"
                    id="cb_firstname"
                    name="FName"
                    placeholder="Enter first name"
                  />
                  <input
                    type="text"
                    id="cb_surname"
                    name="LName"
                    placeholder="Enter last name"
                  />
                  <input
                    type="text"
                    id="control_EMAIL"
                    name="Email"
                    placeholder="Enter email address"
                  />
                  <input id="newsletterSignup" type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>

          {true ? (
            <li className="login-bidbasket" style={{ display: "block" }}>
              <div className="bid-basket">
                <img
                  src="/images/icon/bag.png"
                  alt="View All Bids"
                  title="View All Bids"
                  width="20"
                />
              </div>

              <div className="login-link bid_submit">
                <Link
                  className="btn bid-breakdown-btn"
                  to="/checkout"
                  alt="Checkout"
                >
                  CheckOut
                </Link>
              </div>

              {/* <div className="bid-basket">
                <img
                  src="/images/icon/bag.png"
                  alt="View All Bids"
                  title="View All Bids"
                  width="20"
                />
              </div> */}

              {/* <div className="total-bids" style={{top: '5px'}}>
                <span className="basket-text">Total Items: </span>&nbsp;
                <span className="total_bids" style={{fontWeight: 'bold'}}>({noOfItemsInCart})</span>
              </div> */}

              <div className="total-bids">
                <span className="basket-text">Cart: </span>&nbsp;
                <span className="total_bids">( {noOfItemsInCart} )</span>
              </div>

              {/* <div className="bid-basket">
                <img
                  src="/images/basket-icon.png"
                  alt="View All Bids"
                  title="View All Bids"
                  width="20"
                />
              </div> */}

              {/* <div className="login-link bid_submit">
                <Link
                  className="btn bid-breakdown-btn"
                  to="/mycart"
                  alt="My Cart"
                >
                  My Cart
                </Link>
              </div> */}

              {/* <div className="total-bids">
                <span className="basket-text">Total Items: </span>&nbsp;
                <span className="total_bids">{noOfItemsInCart}</span>
              </div> */}

              {/* <div className="bid-amount">
                <span className="basket-text-amount">Total Amount: </span>&nbsp;
                <span className="bid_price">${ammountInCart}</span>
              </div> */}
            </li>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  cartItem: state.cart,
  user: state.user,
  loginModal: state.loginModal
});

const mapDispatchToProps = dispatch => {
  return {
    openLoginModal: () => {
      dispatch(openLoginModal());
    },
    closeLoginModal: () => {
      dispatch(closeLoginModal());
    },
    updateUserDetails: details => {
      dispatch(updateUserDetails(details));
    },
    logOut: () => {
      dispatch(userLogout());
    },
    updateUserDetailsFromCookie: data => {
      dispatch(updateUserDetailsFromCookie(data));
    },
    updateCartFromCookie: data => {
      dispatch(updateCartFromCookie(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
