import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { postData } from "../http.service";
import * as qs from "query-string";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rtoken: "",
      email: "",
      password1: "",
      password2: "",
      submitError: false,
      submitErrorMsg: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const parsed = qs.parse(this.props.location.search);
    let token = parsed._rt;
    if (!token) {
      this.props.history.push("/");
    } else {
      this.setState({
        rtoken: token
      });
    }
  }

  submitResetPassword = e => {
    e.preventDefault();
    if (this.state.password2 === this.state.password1) {
      this.setState({
        submitError: true,
        submitErrorMsg: "Password does not match"
      });
    }

    let data = {
      password: this.state.password1,
      password2: this.state.password2,
      _mail_token: this.state.rtoken
    };

    postData("reset-password", data).then(response => {
      if (response.error) {
        this.setState({
          submitError: true,
          submitErrorMsg: "Error Occured"
        });
      } else {
        this.props.history.push("/reset-password-success");
      }
    });
  };

  render() {
    const { submitError, submitErrorMsg } = this.state;
    return (
      <>
        <Helmet>
          <title>Reset password - Atnumis</title>
        </Helmet>

        <div className="page cf">
          <div id="system-message-container" />

          <div className="reset-complete">
            <form
              className="form-validate form-horizontal well"
              onSubmit={this.submitResetPassword}
            >
              {submitError ? (
                <p className="error_msg_new">{submitErrorMsg}</p>
              ) : (
                ""
              )}
              <fieldset>
                <p>
                  To complete the password reset process, please enter a new
                  password.
                </p>
                <div className="control-group">
                  <div className="control-label">
                    <label
                      id="jform_password1-lbl"
                      for="jform_password1"
                      className="hasPopover required"
                      title="Password"
                      data-content="Enter your new password."
                    >
                      Password<span className="star">&nbsp;*</span>
                      <p
                        className="error_msg_new"
                        style={{ display: "none", color: "red" }}
                      >
                        Password should contain at least 6 characters.
                      </p>
                    </label>
                  </div>
                  <div className="controls">
                    <input
                      onChange={this.handleInputChange}
                      type="password"
                      name="password1"
                      id="jform_password1"
                      autocomplete="off"
                      className="validate-password required"
                      size="30"
                      maxlength="99"
                      required="required"
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="control-group"> </div>
                <div className="control-group">
                  <div className="control-label">
                    <label
                      id="jform_password2-lbl"
                      for="jform_password2"
                      className="hasPopover required"
                      title="Confirm Password"
                      data-content="Confirm your new password."
                    >
                      Confirm Password<span className="star">&nbsp;*</span>
                    </label>
                  </div>
                  <div className="controls">
                    <input
                      onChange={this.handleInputChange}
                      type="password"
                      name="password2"
                      id="jform_password2"
                      autocomplete="off"
                      className="validate-password required"
                      size="30"
                      maxlength="99"
                      required="required"
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="control-group">
                  <input type="hidden" defaultValue="" />
                </div>
              </fieldset>

              <div className="control-group">
                <div className="controls">
                  <button
                    type="submit"
                    id="resetpassword"
                    className="btn btn-primary validate"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="padded-inner " />
        </div>
      </>
    );
  }
}

export default ResetPassword;
