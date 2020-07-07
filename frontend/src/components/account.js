import React, { Component } from "react";
import { postData } from "../http.service";
import Loading from "./loading";
import { Link } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
// import UpdateModal from "./update-details-modal";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import AccountSidebar from "./account-sidebar";
import { updateUserProfileDetails } from "../actions/user.action";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      isLoading: false,
      passwordModalOpen: false,
      emailModalOpen: false,
      detailsModalOpen: false,
      oldPassword: "",
      newPassword: "",
      changePasswordFormSubmitting: false,
      changePasswordFormError: false,
      changePasswordFormErrorMsg: "",
      newEmail: "",
      changeEmailFormSubmitting: false,
      changeEmailFormError: false,
      changeEmailFormErrorMsg: "",
      firstname: "",
      lastname: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
      billingAddress1: "",
      billingAddress2: "",
      billingAddressCity: "",
      billingAddressZip: "",
      billingAddressCountry: "",
      submitError: false,
      submitErrorMsg: "",
      updateisSubmitting: false,
      submitError: false,
      submitErrorMsg: ""
    };
  }

  togglechangePasswordModal = () => {
    this.setState(prevState => ({
      changePasswordFormSubmitting: false,
      passwordModalOpen: !prevState.passwordModalOpen
    }));
  };

  togglechangeEmailModal = () => {
    this.setState(prevState => ({
      changeEmailFormSubmitting: false,
      emailModalOpen: !prevState.emailModalOpen
    }));
  };

  toggleEditDetailsModal = () => {
    this.setState(prevState => ({
      detailsModalOpen: !prevState.detailsModalOpen
    }));
  };

  componentWillMount() {
    if (!this.props.user.isUserLoggedIn) {
      this.props.history.push("/");
    }

    let username = this.props.user.userDetails.username;
    let data = {
      username
    };

    // console.log(this.props.user.userProfileDetails);

    if (Object.keys(this.props.user.userProfileDetails).length <= 0) {
      this.setState({ isLoading: true });
      postData(`/profile`, data)
        .then(result => {
          if (!result.error) {
            this.props.updateUserProfileDetails(result.data);
            this.setState({
              userDetails: result.data,
              isLoading: false
            });
          } else {
            // console.log("heee");
            this.props.history.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        userDetails: this.props.user.userProfileDetails
      });
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitChangePassword = () => {
    this.setState({ changePasswordFormSubmitting: true });
    if (this.state.oldPassword === "" || this.state.newPassword === "") {
      this.setState({
        changePasswordFormSubmitting: false,
        changePasswordFormError: true,
        changePasswordFormErrorMsg: "Fill form properly to continue."
      });
      return false;
    }

    let data = {
      old_password: this.state.oldPassword,
      new_password: this.state.newPassword,
      username: this.props.user.userDetails.username
    };

    // console.log(data);
    postData("/change-password", data).then(response => {
      this.setState({
        changePasswordFormSubmitting: false,
        changePasswordFormError: response.error,
        changePasswordFormErrorMsg: response.msg
      });
      if (!response.error) {
        this.togglechangePasswordModal();
        alert("Email changed successfully");
      }
    });
  };

  submitChangeEmail = () => {
    this.setState({ changeEmailFormSubmitting: true });

    if (this.state.newEmail === "") {
      this.setState({
        changeEmailFormError: true,
        changeEmailFormSubmitting: false,
        changeEmailFormErrorMsg: "Enter a valid email address."
      });
      return false;
    }

    let data = {
      new_email: this.state.newEmail,
      username: this.props.user.userDetails.username
    };

    // console.log(data);
    postData("/change-email", data).then(response => {
      this.setState({
        changeEmailFormSubmitting: false,
        changeEmailFormError: response.error,
        changeEmailFormErrorMsg: response.msg
      });
      if (!response.error) {
        this.togglechangeEmailModal();
        alert("Email changed successfully");
      }
    });
  };

  updateUserProfile = e => {
    e.preventDefault();
    this.setState({ formIsSubmitting: true });
    const requiredData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      company: this.state.company,
      address1: this.state.address1,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country,
      phone: this.state.phone,
      billingAddress1: this.state.billingAddress1,
      billingAddressZip: this.state.billingAddressZip,
      billingAddressCity: this.state.billingAddressCity,
      billingAddressCountry: this.state.billingAddressCountry
    };

    console.log(requiredData);

    // const optionalData = {
    //   address2: this.state.address2,
    //   billingAddress2: this.state.billingAddress2,
    // };

    let submittedData = Object.values(requiredData);
    if (submittedData.includes("")) {
      this.setState({
        submitError: true,
        submitErrorMsg: "Fill form properly to proceed",
        updateisSubmitting: false
      });
      return;
    }

    const data = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      company: this.state.company,
      address1: this.state.address1,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country,
      phone: this.state.phone,
      address2: this.state.address2,
      billingAddress1: this.state.billingAddress1,
      billingAddress2: this.state.billingAddress2,
      billlingAddressZip: this.state.billlingAddressZip,
      billingAddressCity: this.state.billingAddressCity,
      billingAddressCountry: this.state.billingAddressCountry
    };

    console.log(data);

    this.setState({ updateisSubmitting: true });
    postData("/update-profile", data)
      .then(data => {
        this.setState({
          updateisSubmitting: false
        });
        if (!data.error) {
          this.setState({
            registered: true,
            userDetails: data.data
          });
          this.props.history.push("/thanks");
        } else {
          this.setState({ regError: true });
        }
      })
      .catch(error => this.setState({ error: error }));
  };

  render() {
    const {
      isLoading,
      userDetails,
      changePasswordFormError,
      changePasswordFormErrorMsg,
      changePasswordFormSubmitting,
      changeEmailFormSubmitting,
      changeEmailFormError,
      changeEmailFormErrorMsg,
      updateisSubmitting,
      submitError,
      submitErrorMsg
    } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <div className="mydashboard">
          <div>
            <Modal
              isOpen={this.state.passwordModalOpen}
              toggle={this.togglechangePasswordModal}
              className={this.props.className}
            >
              {/* <ModalHeader toggle={this.toggleLoginModal}>Modal title</ModalHeader> */}
              <ModalBody>
                <div id="form_password">
                  <h2>Change Password</h2>

                  {changePasswordFormError ? (
                    <div
                      id="message"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      {changePasswordFormErrorMsg}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="old-password-hold">
                    <label className="h3">Old Password:</label>
                    <input
                      name="oldPassword"
                      onChange={this.handleInputChange}
                      onFocus={() => {
                        this.setState({ changePasswordFormError: false });
                      }}
                      type="password"
                      id="oldpwd"
                    />
                  </div>
                  <div className="new-password-hold">
                    <label className="h3">New Password:</label>
                    <input
                      name="newPassword"
                      onChange={this.handleInputChange}
                      onFocus={() => {
                        this.setState({ changePasswordFormError: false });
                      }}
                      type="password"
                      id="newpwd"
                    />
                  </div>

                  {changePasswordFormSubmitting ? (
                    <div className="button-container">
                      <input
                        className="white-btn"
                        disabled
                        name="resetpassword"
                        id="resetpassword"
                        value="Changing password"
                        type="submit"
                      />
                    </div>
                  ) : (
                    <div className="button-container">
                      <input
                        onClick={this.submitChangePassword}
                        className="white-btn"
                        name="resetpassword"
                        id="resetpassword"
                        value="update"
                        type="submit"
                      />
                    </div>
                  )}
                </div>
              </ModalBody>
            </Modal>
          </div>

          <div>
            <Modal
              isOpen={this.state.emailModalOpen}
              toggle={this.togglechangeEmailModal}
              className={this.props.className}
            >
              <ModalBody>
                <div id="form_email">
                  <h5 className="email-title">Change Email</h5>

                  {changeEmailFormError ? (
                    <div
                      id="message"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      {changeEmailFormErrorMsg}
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <!-- <div className="old-email-hold">
                    <label className="h3">Old Email:</label>
                    <input name="old_email" defaultValue="" type="email" id="oldemail"/>
                  </div> --> */}

                  <div className="new-email-hold">
                    <label className="h6">New Email:</label>
                    <input
                      name="newEmail"
                      onChange={this.handleInputChange}
                      onFocus={() => {
                        this.setState({ changeEmailFormError: false });
                      }}
                      type="email"
                      id="newemail"
                    />
                  </div>

                  {changeEmailFormSubmitting ? (
                    <div
                      className="button-container updateBtn"
                      style={{ marginTop: "20px" }}
                    >
                      <input
                        className="white-btn"
                        disabled
                        name="resetemail"
                        id="resetemail"
                        value="Updating Email"
                        type="submit"
                      />
                    </div>
                  ) : (
                    <div
                      className="button-container updateBtn"
                      style={{ marginTop: "20px" }}
                    >
                      <input
                        className="white-btn"
                        onClick={this.submitChangeEmail}
                        name="resetemail"
                        id="resetemail"
                        value="update"
                        type="submit"
                      />
                    </div>
                  )}
                </div>
              </ModalBody>
            </Modal>
          </div>

          <Helmet>
            <meta charSet="utf-8" />
            <title>My Account - Atnumis</title>
          </Helmet>

          <div className="page cf">
            <div id="system-message-container" />

            <section className="acc-page-holder dashboard-page-holder">
              <AccountSidebar />

              <div className="account__content page-right-col">
                <div className="buyer-vendor-tabs" id="tabs">
                  <ul className="buyer-vendor-tabs__list">
                    <li>
                      <Link to="#tabs-1">Buyer</Link>
                    </li>
                  </ul>
                  <div className="buyer-vendor-tabs__content" id="tabs-1">
                    <div className="dashboard-box dashboard-box-1 dashboard-box__details dashboard-box-left">
                      <div className="account__content__title">
                        <h1>My Details</h1>
                      </div>
                      <div className="account__content__main">
                        <div className="auction-bid-holder">
                          <div className="bidded-auctions bidded-auctions-1 dashboard-tab-mylogindetails auction-open">
                            <div className="bidded-auctions__title">
                              <h3>My Login Details</h3>
                              <span className="title-rotate-span" />
                            </div>

                            <div className="bidded-auctions__content">
                              <div className="my-details-table">
                                <div className="contact-details">
                                  <div className="fields">
                                    <p className="field_name">Full Name</p>
                                    <p className="field_value">
                                      {" "}
                                      {userDetails.name}{" "}
                                    </p>
                                  </div>

                                  <div className="fields">
                                    <p className="field_name">Email Address</p>
                                    <p className="field_value">
                                      {userDetails.email}
                                    </p>
                                  </div>

                                  <div className="fields">
                                    <p className="field_name">Password</p>
                                    <p className="field_value">************</p>
                                  </div>
                                </div>

                                {/* <!-- <div className="contact-adress">
		<div className="fields">
			<p className="field_name">Address</p>
			<p className="field_value">
				<span>
										<br />
					Oau  					<br />
					Ile ife Nigeria, 230001				</span>
			</p>
		</div>
	</div>
	
	<div className="contact-number">
		<div className="fields">
			<p className="field_name">Contact Number</p>
			<p className="field_value">+2347034643685</p>
		</div>
	</div> --> */}

                                <div className="dashboard-box__buttons">
                                  <a
                                    className="btn ghost-secondary-btn myaccount-edit edit-details-btn"
                                    title="Change password"
                                    href="#"
                                    onClick={this.togglechangePasswordModal}
                                  >
                                    Change Password
                                  </a>
                                </div>
                                <div className="dashboard-box__buttons">
                                  <Link
                                    className="btn ghost-secondary-btn myaccount-edit edit-details-btn email-changes"
                                    title="Change Email"
                                    to="#"
                                    onClick={this.togglechangeEmailModal}
                                  >
                                    Change Email
                                  </Link>
                                </div>

                                {/* <div className="dashboard-box__buttons">
                                <Link
                                  className="btn ghost-secondary-btn edit-details-btn sub_accounts"
                                  title="Manage Sub Account"
                                  to="https://www.romanumismatics.com/index.php?option=com_myaccount&amp;view=sub_accounts"
                                >
                                  Manage Sub Accounts 09031848611
                                </Link>
                              </div> */}
                              </div>
                            </div>
                          </div>

                          <div className="bidded-auctions bidded-auctions-1 dashboard-tab-mybillingdetails auction-open">
                            <div className="bidded-auctions__title">
                              <h3>My Billing and Shipping Details</h3>
                              <span className="title-rotate-span" />
                            </div>

                            <div className="bidded-auctions__content">
                              <div className="billing-details-holder">
                                <div className="billing-details__row billing__details__row-2">
                                  <div className="fields">
                                    <div className="field_name">
                                      <h5>Name</h5>
                                    </div>
                                    <div className="field_value">
                                      <p> {userDetails.name} </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="billing-details__row billing__details__row-2">
                                  <div className="fields">
                                    <div className="field_name">
                                      <h5>Billing Address</h5>
                                    </div>
                                    <div className="field_value">
                                      <p>
                                        {userDetails.street}
                                        <br />
                                        {userDetails.state}
                                        <br />
                                        {userDetails.country}
                                        <br />
                                        {userDetails.zip}{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="billing-details__row billing__details__row-1">
                                  <div className="fields">
                                    <div className="field_name">
                                      <h5>Shipping Address</h5>
                                    </div>
                                    <div className="field_value">
                                      <p>
                                        {userDetails.street}
                                        <br />
                                        {userDetails.state}
                                        <br />
                                        {userDetails.country}
                                        <br />
                                        {userDetails.zip}{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="billing-details__row billing__details__row-2">
                                  <div className="fields">
                                    <div className="field_name">
                                      <h5>Telephone</h5>
                                    </div>
                                    <div className="field_value">
                                      <p> {userDetails.phone} </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="billing-details__row billing__details__row-2">
                                  <div className="fields">
                                    <div className="field_name">
                                      <h5>Business Name</h5>
                                    </div>
                                    <div className="field_value">
                                      <p> {userDetails.company} </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="billing-details__row billing__details__row-3">
                                  <div className="fields">
                                    <div className="field_name">
                                      <h5>Email</h5>
                                    </div>
                                    <div className="field_value">
                                      <p> {userDetails.email} </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="billing-details__row billing__details__row-4">
                                  <div className="billing-details__row__right">
                                    <Link
                                      className="button billing-edit-btn edit-my-address primary-btn"
                                      title="Edit billing details"
                                      to="#"
                                      onClick={this.toggleEditDetailsModal}
                                    >
                                      Edit Details
                                    </Link>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                          {/* 
                        <div
                          className="bidded-auctions bidded-auctions-1 dashboard-tab-credit auction-open"
                          id="credit-limit"
                        >
                          <div className="bidded-auctions__title">
                            <h3>Credit Limit</h3>
                            <span className="title-rotate-span" />
                          </div>

                          <div className="bidded-auctions__content">
                            <div className="credit-limit-amount">
                              <form method="post" action="">
                                <div className="credit-section-left">
                                  <div className="row-1">
                                    <p className="text">
                                      Your Credit Limit is £3,000
                                    </p>
                                  </div>
                                  <div className="row-2">
                                    <p className="text">
                                      You will be able to bid up to the credit
                                      limit provided. This is not a credit
                                      agreement and all purchases are settled
                                      post-sale.
                                    </p>
                                  </div>
                                  <div className="row-3">
                                    <div
                                      className="button primary-btn request-credit-increase-btn"
                                      id="request-credit-btn"
                                      title="Request credit increase"
                                    >
                                      REQUEST INCREASE
                                    </div>
                                  </div>
                                  <div
                                    className="row-3"
                                    id="request-increase-btn"
                                    style={{ display: "none" }}
                                  >
                                    <input
                                      type="number"
                                      min="1"
                                      className="text-box"
                                      title="Request credit increase"
                                      placeholder="£"
                                      defaultValue="3,000"
                                      name="credit_amount"
                                      id="credit_amount"
                                    />
                                    <button className="button primary-btn submit-limit-btn">
                                      Submit
                                    </button>
                                 
                                  </div>
                                </div>
                              </form>
                            </div>

                            <div>
                              <input
                                type="hidden"
                                name="task"
                                defaultValue="updatecreditlimit"
                              />
                            </div>
                          </div>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="padded-inner logged-in" />
          </div>

          <div className="holding-update-profile-modal">
            <>
              <Modal
                isOpen={this.state.detailsModalOpen}
                toggle={this.toggleEditDetailsModal}
                className={this.props.className}
              >
                <ModalBody>
                  <div className="overlay-content">
                    <div className="edit_dbilling">
                      <h2>Change Billing and Shipping Details</h2>

                      <form onSubmit={this.updateUserProfile}>
                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field1">First Name: </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field1">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="firstname"
                                ref="firstname"
                                defaultValue={userDetails.name}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field1">Last Name: </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field1">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="lastname"
                                defaultValue={userDetails.name}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field4">Telephone: </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field4">
                              <input
                                type="text"
                                name="phone"
                                defaultValue={userDetails.phone}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field3">Company: </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field3">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="company"
                                defaultValue={userDetails.company}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field2">
                                Billing Address 1:{" "}
                              </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field2">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="address1"
                                defaultValue={userDetails.street}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field2">
                                Billing Address 2:{" "}
                              </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field2">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="address2"
                                defaultValue={userDetails.street2}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field2">City: </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field2">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="city"
                                defaultValue={userDetails.city}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field6">Postcode/Zip: </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field6">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="zip"
                                defaultValue={userDetails.zip}
                              />
                            </span>
                          </div>
                        </div>

                        {/* <div className="billing_field_container">
                        <div className="billing_label">
                          <p>
                            <span className="lbl_field7">Country: </span>
                          </p>
                        </div>

                         <div className="billing_input">
                          <span className="val_field7">
                            <input
                            onChange = {this.handleInputChange} 
                              type="text"
                              name="country"
                              defaultChecked={userDetails.country}
                            />
                          </span>
                        </div> 
                      </div> */}

                        {/* insert billing field container here */}
                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field8">
                                Billing Country:{" "}
                              </span>
                            </p>
                          </div>
                          <div className="billing_input">
                            <span className="val_field8">
                              <select
                                name="billingAddressCountry"
                                onChange={this.handleInputChange}
                                defaultChecked={userDetails.shipping_country}
                              >
                                <option value="United Kingdom">
                                  United Kingdom
                                </option>
                                <option value="Ireland">Ireland</option>
                                <option value="France">France</option>
                                <option value="Spain">Spain</option>
                                <option value="Italy">Italy</option>
                                <option value="Germany">Germany</option>
                                <option value="Russian Federation">
                                  Russian Federation
                                </option>
                                <option value="United States">
                                  United States
                                </option>
                                <option value="China">China</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Aland Islands">
                                  Aland Islands
                                </option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">
                                  American Samoa
                                </option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua and Barbuda">
                                  Antigua and Barbuda
                                </option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bonaire, Sint Eustatius and Saba">
                                  Bonaire, Sint Eustatius and Saba
                                </option>
                                <option value="Bosnia Herzegovina">
                                  Bosnia Herzegovina
                                </option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">
                                  Bouvet Island
                                </option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">
                                  British Indian Ocean Territory
                                </option>
                                <option value="British Virgin Islands">
                                  British Virgin Islands
                                </option>
                                <option value="Brunei Darussalam">
                                  Brunei Darussalam
                                </option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">
                                  Burkina Faso
                                </option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">
                                  Cayman Islands
                                </option>
                                <option value="Central African Republic">
                                  Central African Republic
                                </option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="Christmas Island">
                                  Christmas Island
                                </option>
                                <option value="Cocos (Keeling) Islands">
                                  Cocos (Keeling) Islands
                                </option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Cook Islands">
                                  Cook Islands
                                </option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Curacao">Curacao</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">
                                  Czech Republic
                                </option>
                                <option value="Democratic Republic of the Congo">
                                  Democratic Republic of the Congo
                                </option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">
                                  Dominican Republic
                                </option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">
                                  Equatorial Guinea
                                </option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands">
                                  Falkland Islands
                                </option>
                                <option value="Faroe Islands">
                                  Faroe Islands
                                </option>
                                <option value="Fiji Islands">
                                  Fiji Islands
                                </option>
                                <option value="Finland">Finland</option>
                                <option value="French Guiana">
                                  French Guiana
                                </option>
                                <option value="French Polynesia">
                                  French Polynesia
                                </option>
                                <option value="French Southern Territories">
                                  French Southern Territories
                                </option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernsey">Guernsey</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-Bissau">
                                  Guinea-Bissau
                                </option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard Island and McDonald Islands">
                                  Heard Island and McDonald Islands
                                </option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran (Islamic Republic of)">
                                  Iran (Islamic Republic of)
                                </option>
                                <option value="Iraq">Iraq</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Ivory Coast">Ivory Coast</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Kosovo">Kosovo</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">
                                  Liechtenstein
                                </option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia">Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawai">Malawai</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">
                                  Marshall Islands
                                </option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia">Micronesia</option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montenegro">Montenegro</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">
                                  Netherlands Antilles
                                </option>
                                <option value="New Caledonia">
                                  New Caledonia
                                </option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">
                                  Norfolk Island
                                </option>
                                <option value="North Korea">North Korea</option>
                                <option value="Northern Mariana Islands">
                                  Northern Mariana Islands
                                </option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestinian Territory">
                                  Palestinian Territory
                                </option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">
                                  Papua New Guinea
                                </option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Barthelemy">
                                  Saint Barthelemy
                                </option>
                                <option value="Saint Helena">
                                  Saint Helena
                                </option>
                                <option value="Saint Kitts and Nevis">
                                  Saint Kitts and Nevis
                                </option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Martin">
                                  Saint Martin
                                </option>
                                <option value="Saint Pierre and Miquelon">
                                  Saint Pierre and Miquelon
                                </option>
                                <option value="Saint Vincent and the Grenadines">
                                  Saint Vincent and the Grenadines
                                </option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">
                                  Sao Tome and Principe
                                </option>
                                <option value="Saudi Arabia">
                                  Saudi Arabia
                                </option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Serbia and Montenegro">
                                  Serbia and Montenegro
                                </option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">
                                  Sierra Leone
                                </option>
                                <option value="Singapore">Singapore</option>
                                <option value="Sint Maarten">
                                  Sint Maarten
                                </option>
                                <option value="Slovakia (Slovak Republic)">
                                  Slovakia (Slovak Republic)
                                </option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">
                                  Solomon Islands
                                </option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">
                                  South Africa
                                </option>
                                <option value="South Georgia and the South Sandwich Islands">
                                  South Georgia and the South Sandwich Islands
                                </option>
                                <option value="South Korea">South Korea</option>
                                <option value="South Sudan">South Sudan</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard and Jan Mayen Islands">
                                  Svalbard and Jan Mayen Islands
                                </option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syrian Arab Republic">
                                  Syrian Arab Republic
                                </option>
                                <option value="Taiwan(Province of China)">
                                  Taiwan(Province of China)
                                </option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">
                                  Trinidad and Tobago
                                </option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">
                                  Turkmenistan
                                </option>
                                <option value="Turks and Caicos Islands">
                                  Turks and Caicos Islands
                                </option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="U.S. Virgin Islands">
                                  U.S. Virgin Islands
                                </option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">
                                  United Arab Emirates
                                </option>
                                <option value="United States Minor Outlying Islands">
                                  United States Minor Outlying Islands
                                </option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="USA">USA</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Vatican">Vatican</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Wallis and Futuna Islands">
                                  Wallis and Futuna Islands
                                </option>
                                <option value="Western Sahara">
                                  Western Sahara
                                </option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                              </select>
                            </span>
                          </div>
                        </div>
                        {/* ends here */}

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field2">
                                Shipping Address 1:{" "}
                              </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field2">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="billingAddress1"
                                defaultValue={userDetails.shipping_address1}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field2">
                                Shipping Address 2:{" "}
                              </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field2">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="billingAddress2"
                                defaultValue={userDetails.shipping_address2}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field2">City: </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field2">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="billingAddressCity"
                                defaultValue={userDetails.shipping_city}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field6">Postcode/Zip: </span>
                            </p>
                          </div>

                          <div className="billing_input">
                            <span className="val_field6">
                              <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="billingAddressZip"
                                defaultValue={userDetails.shipping_zipcode}
                              />
                            </span>
                          </div>
                        </div>

                        {/* <div className="billing_field_container">
                        <div className="billing_label">
                          <p>
                            <span className="lbl_field7">County: </span>
                          </p>
                        </div>

                        <div className="billing_input">
                          <span className="val_field7">
                            <input onChange = {this.handleInputChange}  type="text" name="county" defaultValue="" />
                          </span>
                        </div>
                      </div> */}

                        {/* shipping coutry */}
                        <div className="billing_field_container">
                          <div className="billing_label">
                            <p>
                              <span className="lbl_field8">
                                Billing Country:{" "}
                              </span>
                            </p>
                          </div>
                          <div className="billing_input">
                            <span className="val_field8">
                              <select
                                name="billingAddressCountry"
                                onChange={this.handleInputChange}
                                defaultChecked={userDetails.shipping_country}
                              >
                                <option value="United Kingdom">
                                  United Kingdom
                                </option>
                                <option value="Ireland">Ireland</option>
                                <option value="France">France</option>
                                <option value="Spain">Spain</option>
                                <option value="Italy">Italy</option>
                                <option value="Germany">Germany</option>
                                <option value="Russian Federation">
                                  Russian Federation
                                </option>
                                <option value="United States">
                                  United States
                                </option>
                                <option value="China">China</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Aland Islands">
                                  Aland Islands
                                </option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">
                                  American Samoa
                                </option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua and Barbuda">
                                  Antigua and Barbuda
                                </option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bonaire, Sint Eustatius and Saba">
                                  Bonaire, Sint Eustatius and Saba
                                </option>
                                <option value="Bosnia Herzegovina">
                                  Bosnia Herzegovina
                                </option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">
                                  Bouvet Island
                                </option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">
                                  British Indian Ocean Territory
                                </option>
                                <option value="British Virgin Islands">
                                  British Virgin Islands
                                </option>
                                <option value="Brunei Darussalam">
                                  Brunei Darussalam
                                </option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">
                                  Burkina Faso
                                </option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">
                                  Cayman Islands
                                </option>
                                <option value="Central African Republic">
                                  Central African Republic
                                </option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="Christmas Island">
                                  Christmas Island
                                </option>
                                <option value="Cocos (Keeling) Islands">
                                  Cocos (Keeling) Islands
                                </option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Cook Islands">
                                  Cook Islands
                                </option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Curacao">Curacao</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">
                                  Czech Republic
                                </option>
                                <option value="Democratic Republic of the Congo">
                                  Democratic Republic of the Congo
                                </option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">
                                  Dominican Republic
                                </option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">
                                  Equatorial Guinea
                                </option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands">
                                  Falkland Islands
                                </option>
                                <option value="Faroe Islands">
                                  Faroe Islands
                                </option>
                                <option value="Fiji Islands">
                                  Fiji Islands
                                </option>
                                <option value="Finland">Finland</option>
                                <option value="French Guiana">
                                  French Guiana
                                </option>
                                <option value="French Polynesia">
                                  French Polynesia
                                </option>
                                <option value="French Southern Territories">
                                  French Southern Territories
                                </option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernsey">Guernsey</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-Bissau">
                                  Guinea-Bissau
                                </option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard Island and McDonald Islands">
                                  Heard Island and McDonald Islands
                                </option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran (Islamic Republic of)">
                                  Iran (Islamic Republic of)
                                </option>
                                <option value="Iraq">Iraq</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Ivory Coast">Ivory Coast</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Kosovo">Kosovo</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">
                                  Liechtenstein
                                </option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia">Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawai">Malawai</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">
                                  Marshall Islands
                                </option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia">Micronesia</option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montenegro">Montenegro</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">
                                  Netherlands Antilles
                                </option>
                                <option value="New Caledonia">
                                  New Caledonia
                                </option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">
                                  Norfolk Island
                                </option>
                                <option value="North Korea">North Korea</option>
                                <option value="Northern Mariana Islands">
                                  Northern Mariana Islands
                                </option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestinian Territory">
                                  Palestinian Territory
                                </option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">
                                  Papua New Guinea
                                </option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Barthelemy">
                                  Saint Barthelemy
                                </option>
                                <option value="Saint Helena">
                                  Saint Helena
                                </option>
                                <option value="Saint Kitts and Nevis">
                                  Saint Kitts and Nevis
                                </option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Martin">
                                  Saint Martin
                                </option>
                                <option value="Saint Pierre and Miquelon">
                                  Saint Pierre and Miquelon
                                </option>
                                <option value="Saint Vincent and the Grenadines">
                                  Saint Vincent and the Grenadines
                                </option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">
                                  Sao Tome and Principe
                                </option>
                                <option value="Saudi Arabia">
                                  Saudi Arabia
                                </option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Serbia and Montenegro">
                                  Serbia and Montenegro
                                </option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">
                                  Sierra Leone
                                </option>
                                <option value="Singapore">Singapore</option>
                                <option value="Sint Maarten">
                                  Sint Maarten
                                </option>
                                <option value="Slovakia (Slovak Republic)">
                                  Slovakia (Slovak Republic)
                                </option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">
                                  Solomon Islands
                                </option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">
                                  South Africa
                                </option>
                                <option value="South Georgia and the South Sandwich Islands">
                                  South Georgia and the South Sandwich Islands
                                </option>
                                <option value="South Korea">South Korea</option>
                                <option value="South Sudan">South Sudan</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard and Jan Mayen Islands">
                                  Svalbard and Jan Mayen Islands
                                </option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syrian Arab Republic">
                                  Syrian Arab Republic
                                </option>
                                <option value="Taiwan(Province of China)">
                                  Taiwan(Province of China)
                                </option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">
                                  Trinidad and Tobago
                                </option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">
                                  Turkmenistan
                                </option>
                                <option value="Turks and Caicos Islands">
                                  Turks and Caicos Islands
                                </option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="U.S. Virgin Islands">
                                  U.S. Virgin Islands
                                </option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">
                                  United Arab Emirates
                                </option>
                                <option value="United States Minor Outlying Islands">
                                  United States Minor Outlying Islands
                                </option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="USA">USA</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Vatican">Vatican</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Wallis and Futuna Islands">
                                  Wallis and Futuna Islands
                                </option>
                                <option value="Western Sahara">
                                  Western Sahara
                                </option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                              </select>
                            </span>
                          </div>
                        </div>
                        {/* ends hre */}

                        {updateisSubmitting ? (
                          <span className="cbLoginButtonSpan">
                            <input
                              type="submit"
                              name="Update"
                              disabled
                              value="Updating profile"
                            />
                          </span>
                        ) : (
                          <span className="cbLoginButtonSpan">
                            <input
                              type="submit"
                              name="Update profile"
                              value="Save Details"
                            />
                          </span>
                        )}
                      </form>
                      {submitError ? (
                        <div
                          style={{ textAlign: "center", color: "red" }}
                          className=""
                          style={{ margin: "5px 0" }}
                        >
                          {submitErrorMsg}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </>
          </div>
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
    updateUserProfileDetails: payload => {
      dispatch(updateUserProfileDetails(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
