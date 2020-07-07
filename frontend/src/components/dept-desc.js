import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "react-dropzone-component/styles/filepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import DropzoneComponent from "react-dropzone-component";
import { postFormData } from "../http.service";


class DeptDesc extends Component {
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
      responseOkay: false,
      dept: ''
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

  componentDidMount() {
    const {
      match: {
        params: { dept }
      }
    } = this.props;

    switch (dept) {
      case "greek":
        this.setState({ dept: "Greek, Judean, Parthian and Sassanid" });
        return;
      case "celtic":
        this.setState({ dept: "Spanish and Celtic" });
        return;
      case "byzanite":
        this.setState({ dept: "Byzanite and Migration period" });
        return;
      case "medieval":
        this.setState({ dept: "Medieval and Modern" });
        return;
      default:
        this.setState({ dept });
        return;
    }
  }

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
    var djsConfig = { autoProcessQueue: false };
    var eventHandlers = { addedfile: file => console.log(file) };
    const { dept } = this.state;
    return (
      <>
        <Helmet>
          <title> Department Description - Atnumis </title>
        </Helmet>
        <div className="page cf">
          <div className="item-page">
            <h1
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                margin: "20px 0"
              }}
            >
              {" "}
              {dept}{" "}
            </h1>

            <div className="department-content">
              <div className="left-dept-column">
                <p className="MsoNormal">
                  <span>
                    On this page you will find some of the highlights of our
                    past sales. Clicking on the image of one of the displayed
                    coins will take you to the archived page for that auction
                    lot where further information may be found, including the
                    detailed description of the coin.
                  </span>
                </p>
                <p>
                  <span>
                    We are always interested in buying or accepting consignments
                    of {dept} coins for sale. If you have a coin, group of
                    coins, or a collection that you would like to discuss
                    selling either directly or in one of our auctions, please
                    contact us for more information, or send us
                    images/information using the contact form below.
                  </span>
                  &nbsp; &nbsp;&nbsp;
                </p>
              </div>
            </div>
          </div>

          <div className="moduletable">
            <div className="holder contact-cms-holder">
              {responseOkay ? (
                ""
              ) : (
                <div
                  id="valuation-form-link"
                  className="new-valuation-form valuation-form-js"
                >
                  <div
                    className="valuations-form-title"
                    style={{ margin: "20px 0", textAlign: "center" }}
                  >
                    <h2
                      style={{ margin: "20px 0", textAlign: "center" }}
                      className="val-form-title uppercase"
                      id="valuation-scroll"
                    >
                      Request a Valuation
                    </h2>

                    <p style={{ textAlign: "center" }}>
                      If you are looking for an immediate sale, we are also able
                      to purchase individual coins or collections outright. We
                      always offer strong evaluations when buying directly.
                    </p>
                  </div>
                  <form
                    className="cms-form clearfix"
                    encType="multipart/form-data"
                    name="myform"
                    id="valuation-form"
                    onSubmit={this.submitValuation}
                  >
                    <div className="valuation-error" />
                    <div className="form-sections">
                      <div className="form-section-wrapper">
                        <ul className="side-by-side">
                          <li className="form-1">
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              required="required"
                              onChange={this.handleInputChange}
                            />
                            <div
                              className="field-error"
                              style={{ display: "none" }}
                            >
                              <p>* First Name is required</p>
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

export default DeptDesc;
