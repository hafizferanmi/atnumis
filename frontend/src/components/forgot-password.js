import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { postData } from "../http.service";
import { closeLoginModal } from "../actions/loginModal.action";
import { connect } from "react-redux";

class ForgotPassword extends Component {
  state = {
    email: "",
    resetError: false,
    resetErrorMsg: "",
    isSubmitting: false
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  resetPassword = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    if (this.state.email === "") {
      this.setState({
        resetError: true,
        resetErrorMsg: "Enter email to proceed."
      });
    }

    let data = {
      email: this.state.email
    };
    postData("/forgot-password", data).then(response => {
      this.setState({ isSubmitting: false });

      if (response.error) {
        this.setState({
          resetError: true,
          resetErrorMsg: "Error occured, try again later"
        });
      } else {
        this.setState({
          resetError: true,
          resetErrorMsg: "Check your mail to proceed."
        });
        this.props.history.push('/forgot-password-success');
      }
    });
  };

  componentDidMount(){
    this.props.closeLoginModal();
  }

  render() {
    const { resetError, resetErrorMsg, isSubmitting } = this.state;
    return (
      <>
        <Helmet>
          <title> Forgot Password - Atnumis </title>
        </Helmet>

        <div className="page cf">
          <div id="system-message-container" />

          <div className="reset">
            <form
              id="user-registration"
              onSubmit={this.resetPassword}
              className="form-validate form-horizontal well"
            >
              <fieldset>
                {resetError ? <h4>{resetErrorMsg}</h4> : ""}

                <p>
                  Please enter the email address for your account and select
                  submit below. We will send you an email telling you how to
                  reset your password.
                </p>
                <div className="control-group">
                  <div className="control-label">
                    <label
                      id="jform_email-lbl"
                      for="jform_email"
                      className="hasPopover required"
                      title="Email Address"
                      data-content="Please enter the email address associated with your User account.<br />A verification code will be sent to you. Once you have received the verification code, you will be able to choose a new password for your account."
                    >
                      Email Address<span className="star">&nbsp;*</span>
                    </label>
                  </div>
                  <div className="controls">
                    <input
                      type="text"
                      onChange={this.handleInputChange}
                      name="email"
                      id="jform_email"
                      className="validate-username required"
                      size="30"
                      required="required"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="control-group">
                  <input type="hidden" />
                </div>
              </fieldset>

              <div className="control-group">
                <div className="controls">
                  {!isSubmitting ? (
                    <button type="submit" className="btn btn-primary validate">
                      Submit
                    </button>
                  ) : (
                    <button className="btn btn-primary validate">
                      Submitting
                    </button>
                  )}
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeLoginModal: () => {
      dispatch(closeLoginModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

