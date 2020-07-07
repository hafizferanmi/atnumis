import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "react-dropzone-component/styles/filepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import DropzoneComponent from "react-dropzone-component";
import { postFormData } from "../http.service";

class Selling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      condition: "",
      files: [],
      error: false,
      errorMsg: "",
      submitting: false,
      responseOkay: false
    };
  }

  submitValuation = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    const data = new FormData();
    // data.append("file", this.state.selectedFile);
    for (var x = 0; x < this.state.files.length; x++) {
      data.append("file[]", this.state.files[x]);
    }
    data.append("name", this.state.name);
    data.append("email", this.state.email);
    data.append("condition", this.state.condition);

    postFormData("/valuation", data).then(response => {
      this.setState({
        submitting: false,
        error: response.error
      });
      if (!response.error) {
        this.setState({ responseOkay: true });
      } else {
        this.setState({ errorMsg: response.message });
      }
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { submitting, responseOkay, error } = this.state;
    var componentConfig = {
      iconFiletypes: [
        ".jpg",
        ".png",
        ".gif",
        ".pdf",
        ".ico",
        ".svg",
        ".doc",
        ".docx"
      ],
      showFiletypeIcon: true,
      postUrl: "/uploadHandler"
    };

    // var componentConfig = { postUrl: 'no-url' };
    var djsConfig = {
      autoProcessQueue: false,
      addRemoveLinks: false
    };

    var eventHandlers = {
      addedfile: file => {
        this.setState(prevState => ({
          files: prevState.files.concat(file)
        }));
      }
    };
    return (
      <>
        <Helmet>
          <title> Selling - Atnumis </title>
        </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <div className="cms-page-content cf" itemProp="articleBody" />

          <div className="item-page">
            <div className="selling-page-container">
              <h1 style={{ margin: "20px 0", textAlign: "center" }}>
                Why Sell With Atnumis?
              </h1>
              <p>
                Atnumis Ltd. holds auctions every month: a minimum of two floor
                auctions per year in Spring and Autumn, as well as ten e-sales
                per year on our website.
              </p>
              <div className="selling-section">
                <img
                  src="/images/icon/money.png"
                  alt="Competitive Rates"
                />
                <h2>Competitive Rates</h2>
                <p>
                  We offer extremely competitive seller’s rates on all
                  consignments. In the case of exceptional collections we are
                  usually willing to waive the seller's fees entirely, meaning
                  you keep 100% of the sale value. Low fees mean a greater
                  return for you.
                </p>
              </div>
              <div className="selling-section">
                <img src="/images/icon/centage.png" alt="0% interest" />
                <h2>0% Interest Cash Advances</h2>
                <p>
                  We can offer cash advances of up to 50% of your consigned
                  coins' value, with 0% interest.
                </p>
              </div>
              <div className="selling-section">
                <img src="/images/icon/lock.png" alt="Collection" />
                <h2>Secure Collections</h2>
                <p>
                  Secure and insured collection of any consignment anywhere in
                  the world for safe delivery to our office in London, offering
                  you total peace of mind. The collection method will be
                  tailored to your consignment’s value. High value consignments
                  are collected by armoured couriers specialising in jewellery
                  and fragile asset transportation.
                </p>
              </div>
              <div className="selling-section">
                <img src="/images/icon/book.png" alt="Catalogue" />
                <h2>Market-Leading Cataloguing</h2>
                <p>
                  All coins are catalogued to the very highest standard in the
                  industry, and we employ the finest photography, research and
                  layout design to present all coins in the best possible light.
                  Every coin is treated as an individual work of art to maximise
                  its value potential.
                </p>
              </div>
              <div className="selling-section">
                <img src="/images/icon/world.png" alt="Gobal Exposure" />
                <h2>Global Exposure</h2>
                <p>
                  Our extensive client database, advertising on Sixbid and
                  Numisbids, and active social media and email-newsletter
                  campaigns ensures your property attracts bids from all over
                  the world, maximising its potential value. Our emphasis on
                  presentation and attention to detail produces consistently
                  strong results in the auction room. To see an online example
                  of our printed catalogue please
                  <Link to="/ecatalogue">click here</Link>.
                </p>
              </div>
              <div className="selling-section">
                <img
                  src="/images/icon/clock.png"
                  alt="Fast Turnaround"
                />
                <h2>Fast Turn-Around</h2>
                <p>
                  Fast turn-around: we aim to get your property into sale as
                  quickly as possible – often this means the very next month –
                  so that your time from consignment to payout is kept as short
                  as possible.
                </p>
              </div>
              {/* <div className="selling-section">
                <img
                  src="/images/selling/immediate-sale.jpg"
                  alt="Immediate Sales"
                />
                <h2>Immediate Sales Also Possible</h2>
                <p>
                  If you are looking for an immediate sale, we are also able to
                  purchase individual coins or collections outright. We always
                  offer strong valuations when buying directly.
                </p>
              </div> */}
              <div className="selling-section" style={{textAlign: 'left'}}>
                <h2>How Does It Work?</h2>
               
                <p>
                  1. Contact us to discuss a consignment – photos are very
                  helpful.
                  <br />
                  We can discuss estimates, but these will only be finalised
                  when we see the coin in hand.
                </p>
               
                <p>
                  2. Secure packaging is sent to you to return to us with your
                  consignment, and a courier collection is arranged if
                  necessary.
                  <br />
                  Consignments in transit are fully insured against loss.
                </p>
               
                <p>
                  3. A contract is issued to you outlining our relationship and
                  our responsibilities to you.
                  <br />
                  This protects both you and us.
                </p>
               
                <p>
                  4. Your coins are catalogued by our dedicated team of
                  professionals.
                  <br />
                  Photographs are taken and your coins are ready for sale!
                </p>
              
                <p>
                  5. You receive a pre-sale report prior to auction.
                  <br />
                  This is your chance to set any last-minute reserves.
                </p>
               
                <p>
                  6. Auction day!
                  <br />
                  Follow the sale online or come to the auction room.
                </p>
            
                <p>
                  7. You receive a post-sale report.
                  <br />
                  This tells you how much your property sold for.
                </p>
             
                <p>
                  8. £$€ due to you from the auction is paid to you any way you
                  like in any currency.
                </p>
              </div>
              <div className="selling-section">
                <h2>Contact Us To Discuss Selling</h2>
                <p>
                  If you have any questions about buying with Roma Numismatics
                  Ltd., please contact us via the webform below or call us on
                  <a title="Call Us" href="tel:+44 (0)20 7121 6518">
                    +44 (0)20 7121 6518
                  </a>
                  &nbsp;or WhatsApp us on
                  <a href="https://wa.me/+447563279318">+44 (0) 7563279318</a>
                </p>
              </div>
            </div>
          </div>

          <div className="padded-inner " />

          <div className="moduletable">
            <div className="holder contact-cms-holder">
              {responseOkay ? (
                ""
              ) : (
                <div
                  id="valuation-form-link"
                  className="new-valuation-form valuation-form-js"
                >
                  <form
                    className="cms-form clearfix"
                    method="post"
                    encType="multipart/form-data"
                    name="myform"
                    id="valuation-form"
                  >
                    <div className="valuation-error" />
                    <div className="form-sections">
                      <div className="form-section-wrapper">
                        <ul className="side-by-side">
                          <li className="form-1">
                            <input
                              type="text"
                              name="name"
                              placeholder=" Name"
                              required="required"
                              onChange={this.handleInputChange}
                            />
                            <div
                              className="field-error"
                              style={{ display: "none" }}
                            >
                              <p>* Name is required</p>
                            </div>
                          </li>

                          <li className="form-3">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              required="required"
                              onChange={this.handleInputChange}
                            />
                            <div
                              className="field-error"
                              style={{ display: "none" }}
                            >
                              <p>* Invalid Email Address</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="item-details">
                      <div
                        className="form-sections item-detail item0"
                        id="item-detail"
                      >
                        <div className="form-section-wrapper">
                          <ul className="clearing-items">
                            <li className="form-5">
                              <textarea
                                name="condition"
                                cols="50"
                                rows="5"
                                placeholder="Message"
                                required="required"
                                onChange={this.handleInputChange}
                              />
                              <div
                                className="field-error"
                                style={{ display: "none" }}
                              >
                                <p>* Description is required</p>
                              </div>
                            </li>

                            <li className="form-6 form-buttons clearfix js">
                              <div className="form-sections form-button">
                                <div className="form-section-wrapper">
                                  <div className="p_scents">
                                    <p>
                                      Please make sure photographs are not
                                      larger than 2MB in size and if possible
                                      please send as one of the following -
                                      (.jpg, .png, .gif, .svg, .ico, .doc,
                                      .docx, .pdf)
                                    </p>
                                    <p>
                                      <strong>
                                        Once the files have been dropped into
                                        the box below, please select 'Submit For
                                        Valuation' to upload
                                      </strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div style={{ marginBottom: "20px" }}>
                                <DropzoneComponent
                                  config={componentConfig}
                                  eventHandlers={eventHandlers}
                                  djsConfig={djsConfig}
                                />
                              </div>
                            </li>

                            {error ? (
                              <div>Error Occured, check form properly</div>
                            ) : (
                              ""
                            )}
                            {/* <li className="recaptcha-container">
                            <div
                              className="g-recaptcha"
                              data-sitekey="6LfhJz8UAAAAADUAy9dbvsh2RmQg6fJVQ1s2RYH5"
                            >
                              <div style={{width:' 304px', height: '78px'}}>
                                <div>
                                  <iframe
                                    src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LfhJz8UAAAAADUAy9dbvsh2RmQg6fJVQ1s2RYH5&amp;co=aHR0cHM6Ly93d3cucm9tYW51bWlzbWF0aWNzLmNvbTo0NDM.&amp;hl=en&amp;v=v1559543665173&amp;size=normal&amp;cb=r8tcbx1d1u2i"
                                    width="304"
                                    height="78"
                                    role="presentation"
                                    name="a-c1ojogwcrdyc"
                                    frameborder="0"
                                    scrolling="no"
                                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                                  />
                                </div>
                                <textarea
                                  id="g-recaptcha-response"
                                  name="g-recaptcha-response"
                                  className="g-recaptcha-response"
                                  style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"
                                />
                              </div>
                            </div>
                          </li> */}

                            <li className="submit-valuation-container">
                              <div className="submit-btn-wrapper">
                                <input
                                  className="tertiary-btn submit-val submit-val-gs"
                                  type="submit"
                                  disabled={submitting}
                                  value={
                                    submitting
                                      ? "Processing"
                                      : "Submit for Valuation"
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {responseOkay ? (
                <div className="thank-you-valuation">
                  <div id="valuation-form-link" className="new-valuation-form">
                    <div className="valuations-form-title">
                      <h2 className="val-form-title uppercase">Thank You</h2>
                      <p>
                        We will review your valuation request and answer as soon
                        as we can.
                      </p>

                      {/* <button className="re-valuation-btn">
                      Submit Another Form
                    </button> */}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Selling;
