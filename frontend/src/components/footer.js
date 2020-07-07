import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="footer-hold">
          <div
            className="footer"
            style={{
              background: "url( /images/homepage-background.jpg ) no-repeat"
            }}
          >
            <div className="footer-inner cf">
              <div className="footer-left">
                <div className="footer-logo">
                  <img
                    style={{ height: 50 }}
                    src="/images/roma-logo.jpg"
                    alt="Atnumis"
                    title="Atnumis"
                  />
                </div>

                <div className="moduletable">
                  <ul className="menu">
                    <li className="item-401">
                      <Link to="/upcoming-auctions">Auctions</Link>
                    </li>
                    <li className="item-402">
                      <Link to="/shop">Shop</Link>
                    </li>
                    <li className="item-403">
                      <Link to="/contact-us">Contact Us</Link>
                    </li>
                    <li className="item-404">
                      <Link to="/">Sitemap</Link>
                    </li>
                    <li className="item-258">
                      <Link
                        to="/terms-and-conditions"
                        title="Terms and conditions"
                      >
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li className="item-259">
                      <Link to="/privacy-policy" title="privacy policy">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-right">
                <div className="footer-right-top">
                  {/* <a
                    href="http://www.bnta.net/"
                    title="British Numismatic Trade Association"
                  >
                    <img src="fonts/bnta.svg" alt="BNTA" title="BNTA" />
                  </a> */}
                </div>
                <div className="footer-right-bottom">
                  <a href="https://fb.com" title="Atnumis on Facebook">
                    <img
                      src="/images/icon/facebook.png"
                      alt="Find us on Facebook"
                    />
                  </a>
                  <a href="https://twitter.com" title="Atnumis on Twitter">
                    <img
                      src="/images/icon/twitter.png"
                      alt="Find us on Twitter"
                    />
                  </a>
                  <a href="https://instagram.com" title="Atnumis on Instagram">
                    <img
                      src="/images/icon/instagram.png"
                      alt="Find us on Instagram"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
