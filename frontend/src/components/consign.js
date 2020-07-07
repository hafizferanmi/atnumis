import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "react-dropzone-component/styles/filepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import DropzoneComponent from "react-dropzone-component";
import { postFormData } from "../http.service";

class Consign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      files: [],
      error: "",
      errorMsg: "",
      error: false,
      errorMsg: "",
      submitting: false,
      responseOkay: false
    };
  }

  submitConsignment = e => {
    e.preventDefault();
    const data = new FormData();
    // data.append("file", this.state.selectedFile);
    for (var x = 0; x < this.state.files.length; x++) {
      data.append("file[]", this.state.files[x]);
    }
    data.append("email", this.state.email);
    data.append("message", this.state.message);
    postFormData("/consign", data).then(response => {
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
    var eventHandlers = {
      addedfile: file => {
        this.setState(prevState => ({
          files: prevState.files.concat(file)
        }));
      }
    };

    
    const { submitting, responseOkay, error } = this.state;
    return (
      <>
        <>
          <Helmet>
            <title> Consign - Atnumis </title>
          </Helmet>
          <div className="page cf">
            <h1 style={{ margin: "20px 0", textAlign: "center" }}>
              How to Consign
            </h1>

            <div className="cms-page-content cf" itemProp="articleBody" />

            <div className="moduletable">
              <div className="holder contact-cms-holder">
                {responseOkay ? (
                  ""
                ) : (
                  <div
                    id="valuation-form-link"
                    className="new-valuation-form valuation-form-js"
                  >
                    <div className="valuations-form-title">
                      <p style={{ textAlign: "center", marginBottom: "20px" }}>
                        If you are interested in consigning, we look forward to
                        helping you. Send us the photo, contact us by phone /
                        email or visit us at our office.
                      </p>
                    </div>
                    <form
                      className="cms-form clearfix"
                      encType="multipart/form-data"
                      name="myform"
                      id="valuation-form"
                      onSubmit={this.submitConsignment}
                    >
                      <div className="valuation-error" />
                      <div className="form-sections">
                        <div className="form-section-wrapper">
                          <ul className="side-by-side">
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
                                    {/* <p>
                                    <strong>
                                      Once the files have been dropped into the
                                      box below, please select 'Submit For
                                      Valuation' to upload
                                    </strong>
                                  </p> */}
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
                                  name="message"
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

                              {error ? (
                                <div>Error Occured, check form properly</div>
                              ) : (
                                ""
                              )}

                              <li className="submit-valuation-container">
                                <div className="submit-btn-wrapper">
                                  <input
                                    // style={{ float: "right" }}
                                    className="tertiary-btn submit-val submit-val-gs pull-right"
                                    type="submit"
                                    disabled={submitting}
                                  value={
                                    submitting
                                      ? "Submitting"
                                      : "Submit"
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
                  <div
                    className="thank-you-valuation"
                    style={{ display: "none" }}
                  >
                    <div
                      id="valuation-form-link"
                      className="new-valuation-form"
                    >
                      <div className="valuations-form-title">
                        <h2 className="val-form-title uppercase">Thank You</h2>
                        <p>
                          We will review your consign request and answer as soon
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
      </>
    );
  }
}

export default Consign;
