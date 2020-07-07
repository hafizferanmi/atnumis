import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "react-dropzone-component/styles/filepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import DropzoneComponent from "react-dropzone-component";
import { postFormData } from "../http.service";

class Valuation extends Component {
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
          <title> Authentication and Valuation - Atnumis </title>
        </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <div className="cms-page-content cf" itemProp="articleBody" />

          <h1 style={{ margin: "20px 0", textAlign: "center" }}> Valuation </h1>

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
                  <div
                    className="valuations-form-title"
                    style={{ margin: "20px 0", textAlign: "center" }}
                  >
                   
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

export default Valuation;
