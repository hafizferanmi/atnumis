import React, { Component } from "react";
import { postData } from "../http.service";
import { Helmet } from "react-helmet";
import { closeLoginModal } from "../actions/loginModal.action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      buttonDisabled: false,
      userDetails: {},
      formIsSubmitting: false,
      signUpValueEmpty: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      company: "",
      username: "",
      address1: "",
      address2: "",
      city: "",
      zip: "",
      country: "",
      reference: "",
      credit_limit: "",
      phone: "",
      references: "",
      collecting_interest: "",
      isBillingDifferent: false,
      billingAddress1: "",
      billingAddress2: "",
      billingAddressCity: "",
      billlingAddressZip: "",
      billingAddressCountry: "",
      submitError: false,
      submitErrorMsg: ""
    };
  }

  register = e => {
    e.preventDefault();
    this.setState({ formIsSubmitting: true });
    const requiredData = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      email2: this.state.email2,
      company: this.state.company,
      address1: this.state.address1,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country,
      phone: this.state.phone
    };

    const optionalData = {
      references: this.state.references,
      credit_limit: this.state.credit_limit,
      address2: this.state.address2,
      billingAddress1: this.state.billingAddress1,
      billingAddress2: this.state.billingAddress2,
      billlingAddressZip: this.state.billlingAddressZip,
      billingAddressCity: this.state.billingAddressCity,
      billingAddressCountry: this.state.billingAddressCountry
    };

    // console.log({ requiredData, optionalData });

    let submittedData = Object.values(requiredData);
    if (submittedData.includes("")) {
      this.setState({
        submitError: true,
        submitErrorMsg: "Fill form properly to proceed",
        formIsSubmitting: false
      });
      return;
    }

    if (this.state.email !== this.state.email2) {
      this.setState({
        submitError: true,
        submitErrorMsg: "Your confirm email does not match your email",
        formIsSubmitting: false
      });
      return;
    }

    if (this.state.password !== this.state.password2) {
      this.setState({
        submitError: true,
        submitErrorMsg: "Your confirm password does not match your password",
        formIsSubmitting: false
      });
      return;
    }

    const data = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      email2: this.state.email2,
      company: this.state.company,
      address1: this.state.address1,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country,
      reference: this.state.reference,
      credit_limit: this.state.credit_limit,
      phone: this.state.phone,
      references: this.state.references,
      collecting_interest: this.state.collecting_interest,
      address2: this.state.address2,
      isBillingDifferent: this.state.isBillingDifferent,
      billingAddress1: this.state.billingAddress1,
      billingAddress2: this.state.billingAddress2,
      billlingAddressZip: this.state.billlingAddressZip,
      billingAddressCity: this.state.billingAddressCity,
      billingAddressCountry: this.state.billingAddressCountry
    };

    this.setState({ formIsSubmitting: true });
    postData("/signup", data)
      .then(data => {
        this.setState({
          formIsSubmitting: false
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

  componentDidMount() {
    this.props.closeLoginModal();
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  billingIsDifferent = e => {
    this.setState({ isBillingDifferent: true });
  }

  render() {
    const { formIsSubmitting, submitError, submitErrorMsg } = this.state;
    return (
      <>
        <Helmet>
          <title> Register - Atnumis </title>
        </Helmet>
        <div className="page cf">
          <div id="system-message-container" />
          <div className="cb_template cb_template_default cbRegistration cbRegistrationFlat">
            <div className="cbRegistrationHeader">
              <div className="cbRegistrationHeaderInner">
                <div className="cbRegistrationTitle page-header">
                  <h3>Join us!</h3>
                </div>
              </div>
            </div>
            <form
              id="cbcheckedadminForm"
              name="adminForm"
              encType="multipart/form-data"
              className="cb_form form-auto cbValidation"
              onSubmit={this.register}
            >
              <div id="registrationTable" className="cbRegistrationDiv">
                <div className="register-page-options-container">
                  <div className="cbFieldsContentsTab" id="cbtf_11">
                    <div
                      className="sectiontableentry1 cbft_delimiter form-group cb_form_line clearfix"
                      id="cbfr_124"
                    >
                      <div className="cb_field col-sm-9 col-sm-offset-3">
                        <div id="cbfv_124">
                          <h1 style={{ textAlign: "center" }}> Register </h1>
                          <p style={{ textAlign: "center" }}>
                            Register here to participate in our auctions and get
                            your Atnumis account.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_66"
                    >
                      <label
                        htmlFor="cb_firstname"
                        id="cblabcb_firstname"
                        className="control-label col-sm-3"
                      >
                        First Name *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_66">
                          <input
                            onChange={this.handleInputChange}
                            type="text"
                            name="firstname"
                            id="firstname"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="sectiontableentry1 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_67"
                    >
                      <label
                        htmlFor="cb_surname"
                        id="cblabcb_surname"
                        className="control-label col-sm-3"
                      >
                        Last Name *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_67">
                          <input
                            onChange={this.handleInputChange}
                            type="text"
                            name="lastname"
                            id="lastname"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_66"
                    >
                      <label
                        htmlFor="username"
                        id=""
                        className="control-label col-sm-3"
                      >
                        Username *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_66">
                          <input
                            onChange={this.handleInputChange}
                            type="text"
                            name="username"
                            id="username"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_111"
                    >
                      <label
                        htmlFor="cb_company"
                        id="cblabcb_company"
                        className="control-label col-sm-3"
                      >
                        Company
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_111">
                          <input
                            onChange={this.handleInputChange}
                            type="text"
                            name="company"
                            id="company"
                            defaultValue=""
                            size="25"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="register-page-options-container">
                  <div className="cbFieldsContentsTab" id="cbtf_23">
                    <div
                      className="sectiontableentry1 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_60"
                    >
                      <label
                        htmlFor="cb_address2"
                        id="cblabcb_address2"
                        className="control-label col-sm-3"
                      >
                        Address line 1 *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_60">
                          <input
                            onChange={this.handleInputChange}
                            type="text"
                            name="address1"
                            id="address1"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_62"
                    >
                      <label
                        htmlFor="cb_address3"
                        id="cblabcb_address3"
                        className="control-label col-sm-3"
                      >
                        Address Line 2
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_62">
                          <input
                            onChange={this.handleInputChange}
                            type="text"
                            name="address2"
                            id="address2"
                            defaultValue=""
                            size="25"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry1 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_61"
                    >
                      <label
                        htmlFor="cb_city"
                        id="cblabcb_city"
                        className="control-label col-sm-3"
                      >
                        City *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_61">
                          <input
                            onChange={this.handleInputChange}
                            type="text"
                            name="city"
                            id="city"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_63"
                    >
                      <label
                        htmlFor="cb_zip"
                        id="cblabcb_zip"
                        className="control-label col-sm-3"
                      >
                        Postcode/Zip *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_63">
                          <input
                            onChange={this.handleInputChange}
                            type="text"
                            name="zip"
                            id="zip"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry1 cbft_select cbtt_select form-group cb_form_line clearfix"
                      id="cbfr_65"
                    >
                      <label
                        htmlFor="cb_country"
                        id="cblabcb_country"
                        className="control-label col-sm-3"
                      >
                        Country *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_65">
                          <select
                            onChange={this.handleInputChange}
                            required
                            name="country"
                            id="cb_country"
                            className="required form-control"
                            aria-required="true"
                          >
                            <option value="United Kingdom" id="cbf1582">
                              United Kingdom
                            </option>
                            <option value="Ireland" id="cbf1583">
                              Ireland
                            </option>
                            <option value="France" id="cbf1584">
                              France
                            </option>
                            <option value="Spain" id="cbf1585">
                              Spain
                            </option>
                            <option value="Italy" id="cbf1586">
                              Italy
                            </option>
                            <option value="Germany" id="cbf1587">
                              Germany
                            </option>
                            <option value="Russian Federation" id="cbf1588">
                              Russian Federation
                            </option>
                            <option value="United States" id="cbf1786">
                              United States
                            </option>
                            <option value="China" id="cbf1589">
                              China
                            </option>
                            <option value="Afghanistan" id="cbf1590">
                              Afghanistan
                            </option>
                            <option value="Aland Islands" id="cbf2022">
                              Aland Islands
                            </option>
                            <option value="Albania" id="cbf1591">
                              Albania
                            </option>
                            <option value="Algeria" id="cbf1592">
                              Algeria
                            </option>
                            <option value="American Samoa" id="cbf1593">
                              American Samoa
                            </option>
                            <option value="Andorra" id="cbf1594">
                              Andorra
                            </option>
                            <option value="Angola" id="cbf1595">
                              Angola
                            </option>
                            <option value="Anguilla" id="cbf1596">
                              Anguilla
                            </option>
                            <option value="Antarctica" id="cbf1597">
                              Antarctica
                            </option>
                            <option value="Antigua and Barbuda" id="cbf1598">
                              Antigua and Barbuda
                            </option>
                            <option value="Argentina" id="cbf1599">
                              Argentina
                            </option>
                            <option value="Armenia" id="cbf1600">
                              Armenia
                            </option>
                            <option value="Aruba" id="cbf1601">
                              Aruba
                            </option>
                            <option value="Australia" id="cbf1602">
                              Australia
                            </option>
                            <option value="Austria" id="cbf1603">
                              Austria
                            </option>
                            <option value="Azerbaijan" id="cbf1604">
                              Azerbaijan
                            </option>
                            <option value="Bahamas" id="cbf1605">
                              Bahamas
                            </option>
                            <option value="Bahrain" id="cbf1606">
                              Bahrain
                            </option>
                            <option value="Bangladesh" id="cbf1607">
                              Bangladesh
                            </option>
                            <option value="Barbados" id="cbf1608">
                              Barbados
                            </option>
                            <option value="Belarus" id="cbf1609">
                              Belarus
                            </option>
                            <option value="Belgium" id="cbf1610">
                              Belgium
                            </option>
                            <option value="Belize" id="cbf1611">
                              Belize
                            </option>
                            <option value="Benin" id="cbf1612">
                              Benin
                            </option>
                            <option value="Bermuda" id="cbf1613">
                              Bermuda
                            </option>
                            <option value="Bhutan" id="cbf1614">
                              Bhutan
                            </option>
                            <option value="Bolivia" id="cbf1615">
                              Bolivia
                            </option>
                            <option
                              value="Bonaire, Sint Eustatius and Saba"
                              id="cbf2023"
                            >
                              Bonaire, Sint Eustatius and Saba
                            </option>
                            <option value="Bosnia Herzegovina" id="cbf1616">
                              Bosnia Herzegovina
                            </option>
                            <option value="Botswana" id="cbf1617">
                              Botswana
                            </option>
                            <option value="Bouvet Island" id="cbf1618">
                              Bouvet Island
                            </option>
                            <option value="Brazil" id="cbf1619">
                              Brazil
                            </option>
                            <option
                              value="British Indian Ocean Territory"
                              id="cbf1620"
                            >
                              British Indian Ocean Territory
                            </option>
                            <option value="British Virgin Islands" id="cbf2024">
                              British Virgin Islands
                            </option>
                            <option value="Brunei Darussalam" id="cbf1621">
                              Brunei Darussalam
                            </option>
                            <option value="Bulgaria" id="cbf1622">
                              Bulgaria
                            </option>
                            <option value="Burkina Faso" id="cbf1623">
                              Burkina Faso
                            </option>
                            <option value="Burundi" id="cbf1624">
                              Burundi
                            </option>
                            <option value="Cambodia" id="cbf1625">
                              Cambodia
                            </option>
                            <option value="Cameroon" id="cbf1626">
                              Cameroon
                            </option>
                            <option value="Canada" id="cbf1627">
                              Canada
                            </option>
                            <option value="Cape Verde" id="cbf1628">
                              Cape Verde
                            </option>
                            <option value="Cayman Islands" id="cbf1629">
                              Cayman Islands
                            </option>
                            <option
                              value="Central African Republic"
                              id="cbf1630"
                            >
                              Central African Republic
                            </option>
                            <option value="Chad" id="cbf1631">
                              Chad
                            </option>
                            <option value="Chile" id="cbf1632">
                              Chile
                            </option>
                            <option value="Christmas Island" id="cbf1633">
                              Christmas Island
                            </option>
                            <option
                              value="Cocos (Keeling) Islands"
                              id="cbf1634"
                            >
                              Cocos (Keeling) Islands
                            </option>
                            <option value="Colombia" id="cbf1635">
                              Colombia
                            </option>
                            <option value="Comoros" id="cbf1636">
                              Comoros
                            </option>
                            <option value="Cook Islands" id="cbf1638">
                              Cook Islands
                            </option>
                            <option value="Costa Rica" id="cbf1639">
                              Costa Rica
                            </option>
                            <option value="Croatia" id="cbf1640">
                              Croatia
                            </option>
                            <option value="Cuba" id="cbf1642">
                              Cuba
                            </option>
                            <option value="Curacao" id="cbf2025">
                              Curacao
                            </option>
                            <option value="Cyprus" id="cbf1643">
                              Cyprus
                            </option>
                            <option value="Czech Republic" id="cbf1644">
                              Czech Republic
                            </option>
                            <option
                              value="Democratic Republic of the Congo"
                              id="cbf2026"
                            >
                              Democratic Republic of the Congo
                            </option>
                            <option value="Denmark" id="cbf1645">
                              Denmark
                            </option>
                            <option value="Djibouti" id="cbf1646">
                              Djibouti
                            </option>
                            <option value="Dominica" id="cbf1647">
                              Dominica
                            </option>
                            <option value="Dominican Republic" id="cbf1648">
                              Dominican Republic
                            </option>
                            <option value="East Timor" id="cbf1649">
                              East Timor
                            </option>
                            <option value="Ecuador" id="cbf1650">
                              Ecuador
                            </option>
                            <option value="Egypt" id="cbf1651">
                              Egypt
                            </option>
                            <option value="El Salvador" id="cbf1652">
                              El Salvador
                            </option>
                            <option value="Equatorial Guinea" id="cbf1653">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea" id="cbf1654">
                              Eritrea
                            </option>
                            <option value="Estonia" id="cbf1655">
                              Estonia
                            </option>
                            <option value="Ethiopia" id="cbf1656">
                              Ethiopia
                            </option>
                            <option value="Falkland Islands" id="cbf1657">
                              Falkland Islands
                            </option>
                            <option value="Faroe Islands" id="cbf1658">
                              Faroe Islands
                            </option>
                            <option value="Fiji Islands" id="cbf1659">
                              Fiji Islands
                            </option>
                            <option value="Finland" id="cbf1801">
                              Finland
                            </option>
                            <option value="French Guiana" id="cbf2027">
                              French Guiana
                            </option>
                            <option value="French Polynesia" id="cbf2028">
                              French Polynesia
                            </option>
                            <option
                              value="French Southern Territories"
                              id="cbf2029"
                            >
                              French Southern Territories
                            </option>
                            <option value="Gabon" id="cbf2030">
                              Gabon
                            </option>
                            <option value="Gambia" id="cbf2031">
                              Gambia
                            </option>
                            <option value="Georgia" id="cbf2032">
                              Georgia
                            </option>
                            <option value="Ghana" id="cbf2033">
                              Ghana
                            </option>
                            <option value="Gibraltar" id="cbf2034">
                              Gibraltar
                            </option>
                            <option value="Greece" id="cbf1660">
                              Greece
                            </option>
                            <option value="Greenland" id="cbf1661">
                              Greenland
                            </option>
                            <option value="Grenada" id="cbf1662">
                              Grenada
                            </option>
                            <option value="Guadeloupe" id="cbf1663">
                              Guadeloupe
                            </option>
                            <option value="Guam" id="cbf1664">
                              Guam
                            </option>
                            <option value="Guatemala" id="cbf1665">
                              Guatemala
                            </option>
                            <option value="Guernsey" id="cbf2035">
                              Guernsey
                            </option>
                            <option value="Guinea" id="cbf1666">
                              Guinea
                            </option>
                            <option value="Guinea-Bissau" id="cbf1667">
                              Guinea-Bissau
                            </option>
                            <option value="Guyana" id="cbf1668">
                              Guyana
                            </option>
                            <option value="Haiti" id="cbf1669">
                              Haiti
                            </option>
                            <option
                              value="Heard Island and McDonald Islands"
                              id="cbf1670"
                            >
                              Heard Island and McDonald Islands
                            </option>
                            <option value="Honduras" id="cbf1672">
                              Honduras
                            </option>
                            <option value="Hong Kong" id="cbf1673">
                              Hong Kong
                            </option>
                            <option value="Hungary" id="cbf1674">
                              Hungary
                            </option>
                            <option value="Iceland" id="cbf1675">
                              Iceland
                            </option>
                            <option value="India" id="cbf1676">
                              India
                            </option>
                            <option value="Indonesia" id="cbf1677">
                              Indonesia
                            </option>
                            <option
                              value="Iran (Islamic Republic of)"
                              id="cbf1678"
                            >
                              Iran (Islamic Republic of)
                            </option>
                            <option value="Iraq" id="cbf1679">
                              Iraq
                            </option>
                            <option value="Isle of Man" id="cbf2036">
                              Isle of Man
                            </option>
                            <option value="Israel" id="cbf1680">
                              Israel
                            </option>
                            <option value="Ivory Coast" id="cbf2037">
                              Ivory Coast
                            </option>
                            <option value="Jamaica" id="cbf1681">
                              Jamaica
                            </option>
                            <option value="Japan" id="cbf1682">
                              Japan
                            </option>
                            <option value="Jersey" id="cbf2038">
                              Jersey
                            </option>
                            <option value="Jordan" id="cbf1683">
                              Jordan
                            </option>
                            <option value="Kazakhstan" id="cbf1684">
                              Kazakhstan
                            </option>
                            <option value="Kenya" id="cbf1685">
                              Kenya
                            </option>
                            <option value="Kiribati" id="cbf1686">
                              Kiribati
                            </option>
                            <option value="Kosovo" id="cbf2039">
                              Kosovo
                            </option>
                            <option value="Kuwait" id="cbf1688">
                              Kuwait
                            </option>
                            <option value="Kyrgyzstan" id="cbf1689">
                              Kyrgyzstan
                            </option>
                            <option value="Laos" id="cbf1690">
                              Laos
                            </option>
                            <option value="Latvia" id="cbf1691">
                              Latvia
                            </option>
                            <option value="Lebanon" id="cbf1692">
                              Lebanon
                            </option>
                            <option value="Lesotho" id="cbf1693">
                              Lesotho
                            </option>
                            <option value="Liberia" id="cbf1694">
                              Liberia
                            </option>
                            <option value="Libya" id="cbf1695">
                              Libya
                            </option>
                            <option value="Liechtenstein" id="cbf1696">
                              Liechtenstein
                            </option>
                            <option value="Lithuania" id="cbf1697">
                              Lithuania
                            </option>
                            <option value="Luxembourg" id="cbf1698">
                              Luxembourg
                            </option>
                            <option value="Macau" id="cbf1699">
                              Macau
                            </option>
                            <option value="Macedonia" id="cbf1700">
                              Macedonia
                            </option>
                            <option value="Madagascar" id="cbf1701">
                              Madagascar
                            </option>
                            <option value="Malawai" id="cbf1702">
                              Malawai
                            </option>
                            <option value="Malaysia" id="cbf1703">
                              Malaysia
                            </option>
                            <option value="Maldives" id="cbf1704">
                              Maldives
                            </option>
                            <option value="Mali" id="cbf1705">
                              Mali
                            </option>
                            <option value="Malta" id="cbf1706">
                              Malta
                            </option>
                            <option value="Marshall Islands" id="cbf1707">
                              Marshall Islands
                            </option>
                            <option value="Martinique" id="cbf1708">
                              Martinique
                            </option>
                            <option value="Mauritania" id="cbf2040">
                              Mauritania
                            </option>
                            <option value="Mauritius" id="cbf1709">
                              Mauritius
                            </option>
                            <option value="Mayotte" id="cbf1710">
                              Mayotte
                            </option>
                            <option value="Mexico" id="cbf2099">
                              Mexico
                            </option>
                            <option value="Micronesia" id="cbf1711">
                              Micronesia
                            </option>
                            <option value="Moldova" id="cbf1712">
                              Moldova
                            </option>
                            <option value="Monaco" id="cbf1713">
                              Monaco
                            </option>
                            <option value="Mongolia" id="cbf1714">
                              Mongolia
                            </option>
                            <option value="Montenegro" id="cbf2041">
                              Montenegro
                            </option>
                            <option value="Montserrat" id="cbf1715">
                              Montserrat
                            </option>
                            <option value="Morocco" id="cbf1716">
                              Morocco
                            </option>
                            <option value="Mozambique" id="cbf1717">
                              Mozambique
                            </option>
                            <option value="Myanmar" id="cbf1719">
                              Myanmar
                            </option>
                            <option value="Namibia" id="cbf1720">
                              Namibia
                            </option>
                            <option value="Nauru" id="cbf1721">
                              Nauru
                            </option>
                            <option value="Nepal" id="cbf1722">
                              Nepal
                            </option>
                            <option value="Netherlands" id="cbf1723">
                              Netherlands
                            </option>
                            <option value="Netherlands Antilles" id="cbf1724">
                              Netherlands Antilles
                            </option>
                            <option value="New Caledonia" id="cbf1725">
                              New Caledonia
                            </option>
                            <option value="New Zealand" id="cbf1726">
                              New Zealand
                            </option>
                            <option value="Nicaragua" id="cbf1727">
                              Nicaragua
                            </option>
                            <option value="Niger" id="cbf1728">
                              Niger
                            </option>
                            <option value="Nigeria" id="cbf1729">
                              Nigeria
                            </option>
                            <option value="Niue" id="cbf1730">
                              Niue
                            </option>
                            <option value="Norfolk Island" id="cbf1731">
                              Norfolk Island
                            </option>
                            <option value="North Korea" id="cbf2100">
                              North Korea
                            </option>
                            <option
                              value="Northern Mariana Islands"
                              id="cbf1732"
                            >
                              Northern Mariana Islands
                            </option>
                            <option value="Norway" id="cbf1733">
                              Norway
                            </option>
                            <option value="Oman" id="cbf1734">
                              Oman
                            </option>
                            <option value="Pakistan" id="cbf1735">
                              Pakistan
                            </option>
                            <option value="Palau" id="cbf1736">
                              Palau
                            </option>
                            <option value="Palestinian Territory" id="cbf2042">
                              Palestinian Territory
                            </option>
                            <option value="Panama" id="cbf1737">
                              Panama
                            </option>
                            <option value="Papua New Guinea" id="cbf1738">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay" id="cbf1739">
                              Paraguay
                            </option>
                            <option value="Peru" id="cbf1740">
                              Peru
                            </option>
                            <option value="Philippines" id="cbf1741">
                              Philippines
                            </option>
                            <option value="Pitcairn" id="cbf1742">
                              Pitcairn
                            </option>
                            <option value="Poland" id="cbf1743">
                              Poland
                            </option>
                            <option value="Portugal" id="cbf1744">
                              Portugal
                            </option>
                            <option value="Puerto Rico" id="cbf1745">
                              Puerto Rico
                            </option>
                            <option value="Qatar" id="cbf2043">
                              Qatar
                            </option>
                            <option value="Reunion" id="cbf1746">
                              Reunion
                            </option>
                            <option value="Romania" id="cbf1747">
                              Romania
                            </option>
                            <option value="Rwanda" id="cbf1748">
                              Rwanda
                            </option>
                            <option value="Saint Barthelemy" id="cbf2044">
                              Saint Barthelemy
                            </option>
                            <option value="Saint Helena" id="cbf2101">
                              Saint Helena
                            </option>
                            <option value="Saint Kitts and Nevis" id="cbf1749">
                              Saint Kitts and Nevis
                            </option>
                            <option value="Saint Lucia" id="cbf1750">
                              Saint Lucia
                            </option>
                            <option value="Saint Martin" id="cbf2045">
                              Saint Martin
                            </option>
                            <option
                              value="Saint Pierre and Miquelon"
                              id="cbf2046"
                            >
                              Saint Pierre and Miquelon
                            </option>
                            <option
                              value="Saint Vincent and the Grenadines"
                              id="cbf1751"
                            >
                              Saint Vincent and the Grenadines
                            </option>
                            <option value="Samoa" id="cbf1752">
                              Samoa
                            </option>
                            <option value="San Marino" id="cbf1753">
                              San Marino
                            </option>
                            <option value="Sao Tome and Principe" id="cbf1754">
                              Sao Tome and Principe
                            </option>
                            <option value="Saudi Arabia" id="cbf1755">
                              Saudi Arabia
                            </option>
                            <option value="Senegal" id="cbf1756">
                              Senegal
                            </option>
                            <option value="Serbia" id="cbf2047">
                              Serbia
                            </option>
                            <option value="Serbia and Montenegro" id="cbf2048">
                              Serbia and Montenegro
                            </option>
                            <option value="Seychelles" id="cbf1757">
                              Seychelles
                            </option>
                            <option value="Sierra Leone" id="cbf1758">
                              Sierra Leone
                            </option>
                            <option value="Singapore" id="cbf1759">
                              Singapore
                            </option>
                            <option value="Sint Maarten" id="cbf2049">
                              Sint Maarten
                            </option>
                            <option
                              value="Slovakia (Slovak Republic)"
                              id="cbf1760"
                            >
                              Slovakia (Slovak Republic)
                            </option>
                            <option value="Slovenia" id="cbf1761">
                              Slovenia
                            </option>
                            <option value="Solomon Islands" id="cbf2050">
                              Solomon Islands
                            </option>
                            <option value="Somalia" id="cbf1762">
                              Somalia
                            </option>
                            <option value="South Africa" id="cbf1763">
                              South Africa
                            </option>
                            <option
                              value="South Georgia and the South Sandwich Islands"
                              id="cbf1764"
                            >
                              South Georgia and the South Sandwich Islands
                            </option>
                            <option value="South Korea" id="cbf2051">
                              South Korea
                            </option>
                            <option value="South Sudan" id="cbf2052">
                              South Sudan
                            </option>
                            <option value="Sri Lanka" id="cbf1765">
                              Sri Lanka
                            </option>
                            <option value="Sudan" id="cbf1767">
                              Sudan
                            </option>
                            <option value="Suriname" id="cbf1768">
                              Suriname
                            </option>
                            <option
                              value="Svalbard and Jan Mayen Islands"
                              id="cbf1769"
                            >
                              Svalbard and Jan Mayen Islands
                            </option>
                            <option value="Swaziland" id="cbf1770">
                              Swaziland
                            </option>
                            <option value="Sweden" id="cbf1800">
                              Sweden
                            </option>
                            <option value="Switzerland" id="cbf1771">
                              Switzerland
                            </option>
                            <option value="Syrian Arab Republic" id="cbf1772">
                              Syrian Arab Republic
                            </option>
                            <option
                              value="Taiwan(Province of China)"
                              id="cbf1773"
                            >
                              Taiwan(Province of China)
                            </option>
                            <option value="Tajikistan" id="cbf1774">
                              Tajikistan
                            </option>
                            <option value="Tanzania" id="cbf2053">
                              Tanzania
                            </option>
                            <option value="Thailand" id="cbf1775">
                              Thailand
                            </option>
                            <option value="Togo" id="cbf1776">
                              Togo
                            </option>
                            <option value="Tokelau" id="cbf1777">
                              Tokelau
                            </option>
                            <option value="Tonga" id="cbf1778">
                              Tonga
                            </option>
                            <option value="Trinidad and Tobago" id="cbf1779">
                              Trinidad and Tobago
                            </option>
                            <option value="Tunisia" id="cbf1780">
                              Tunisia
                            </option>
                            <option value="Turkey" id="cbf1781">
                              Turkey
                            </option>
                            <option value="Turkmenistan" id="cbf1782">
                              Turkmenistan
                            </option>
                            <option
                              value="Turks and Caicos Islands"
                              id="cbf1783"
                            >
                              Turks and Caicos Islands
                            </option>
                            <option value="Tuvalu" id="cbf2054">
                              Tuvalu
                            </option>
                            <option value="U.S. Virgin Islands" id="cbf2055">
                              U.S. Virgin Islands
                            </option>
                            <option value="Uganda" id="cbf1784">
                              Uganda
                            </option>
                            <option value="Ukraine" id="cbf1785">
                              Ukraine
                            </option>
                            <option value="United Arab Emirates" id="cbf2056">
                              United Arab Emirates
                            </option>
                            <option
                              value="United States Minor Outlying Islands"
                              id="cbf1787"
                            >
                              United States Minor Outlying Islands
                            </option>
                            <option value="Uruguay" id="cbf1788">
                              Uruguay
                            </option>
                            <option value="USA" id="cbf2057">
                              USA
                            </option>
                            <option value="Uzbekistan" id="cbf1789">
                              Uzbekistan
                            </option>
                            <option value="Vanuatu" id="cbf2058">
                              Vanuatu
                            </option>
                            <option value="Vatican" id="cbf2059">
                              Vatican
                            </option>
                            <option value="Venezuela" id="cbf1790">
                              Venezuela
                            </option>
                            <option value="Vietnam" id="cbf1791">
                              Vietnam
                            </option>
                            <option
                              value="Wallis and Futuna Islands"
                              id="cbf1794"
                            >
                              Wallis and Futuna Islands
                            </option>
                            <option value="Western Sahara" id="cbf1795">
                              Western Sahara
                            </option>
                            <option value="Yemen" id="cbf1796">
                              Yemen
                            </option>
                            <option value="Zambia" id="cbf1798">
                              Zambia
                            </option>
                            <option value="Zimbabwe" id="cbf1799">
                              Zimbabwe
                            </option>
                          </select>
                          <span className="cbFieldIcons">
                            <span
                              className="cbTooltip"
                              data-cbtooltip-tooltip="This Field is required"
                              data-hasqtip="12"
                            >
                              <span className="fa fa-star text-muted" />
                            </span>
                            <span
                              className="cbTooltip"
                              data-cbtooltip-tooltip="This Field IS visible on profile"
                              data-hasqtip="13"
                            >
                              <span className="fa fa-eye text-muted" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_checkbox form-group cb_form_line clearfix"
                      id="cbfr_141"
                    >
                      <label
                        htmlFor="cb_billingaddress"
                        id="cblabcb_billingaddress"
                        className="control-label col-sm-3"
                      >
                        Billing Address
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_141">
                          <span className="cbSingleCntrl">
                            <label
                              htmlFor="cb_billingaddress"
                              className="checkbox-inline"
                            >
                              <input
                                onChange={this.billingIsDifferent}
                                type="checkbox"
                                id="cb_billingaddress"
                                name="isBillingDifferent"
                                value="1"
                                className="cbTooltip"
                                // data-cbtooltip-tooltip='<p><span className="label">Add Different Billing Address</span></p>'
                                data-cbtooltip-title="Billing Address"
                                data-hasqtip="14"
                              />
                            </label>
                          </span>
                          {/* <span>Add different billing address</span> */}
                          <span className="cbFieldIcons">
                            <span
                              className="cbTooltip"
                              data-cbtooltip-tooltip="This Field IS visible on profile"
                              data-hasqtip="15"
                            >
                              <span className="fa fa-eye text-muted" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="billing-address-fields">
                      <div
                        className="sectiontableentry1 cbft_text cbtt_input form-group cb_form_line clearfix"
                        id="cbfr_72"
                      >
                        <label
                          htmlFor="cb_daddress2"
                          id="cblabcb_daddress2"
                          className="control-label col-sm-3"
                        >
                          Address Line 1 *
                        </label>
                        <div className="cb_field col-sm-9">
                          <div id="cbfv_72">
                            <input
                              onChange={this.handleInputChange}
                              type="text"
                              name="billingAddress1"
                              defaultValue=""
                              size="25"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                        id="cbfr_73"
                      >
                        <label
                          htmlFor="cb_daddress3"
                          id="cblabcb_daddress3"
                          className="control-label col-sm-3"
                        >
                          Address Line 2
                        </label>
                        <div className="cb_field col-sm-9">
                          <div id="cbfv_73">
                            <input
                              onChange={this.handleInputChange}
                              type="text"
                              name="billingAddress2"
                              defaultValue=""
                              size="25"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="sectiontableentry1 cbft_text cbtt_input form-group cb_form_line clearfix"
                        id="cbfr_70"
                      >
                        <label
                          htmlFor="cb_dcity"
                          id="cblabcb_dcity"
                          className="control-label col-sm-3"
                        >
                          City *
                        </label>
                        <div className="cb_field col-sm-9">
                          <div id="cbfv_70">
                            <input
                              onChange={this.handleInputChange}
                              type="text"
                              name="billingAddressCity"
                              defaultValue=""
                              size="25"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                        id="cbfr_68"
                      >
                        <label
                          htmlFor="cb_dzip"
                          id="cblabcb_dzip"
                          className="control-label col-sm-3"
                        >
                          Postcode/Zip *
                        </label>
                        <div className="cb_field col-sm-9">
                          <div id="cbfv_68">
                            <input
                              type="text"
                              name="billlingAddressZip"
                              id="cb_dzip"
                              defaultValue=""
                              size="25"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="sectiontableentry1 cbft_select cbtt_select form-group cb_form_line clearfix"
                        id="cbfr_147"
                      >
                        <label
                          htmlFor="cb_dcountry"
                          id="cblabcb_dcountry"
                          className="control-label col-sm-3"
                        >
                          Country *
                        </label>
                        <div className="cb_field col-sm-9">
                          <div id="cbfv_147">
                            <select
                              onChange={this.handleInputChange}
                              required
                              name="billingCountry"
                              id="cb_dcountry"
                              className="form-control"
                            >
                              <option defaultValue="">Please select...</option>
                              <option value="United Kingdom" id="cbf1802">
                                United Kingdom
                              </option>
                              <option value="Ireland" id="cbf1803">
                                Ireland
                              </option>
                              <option value="France" id="cbf1804">
                                France
                              </option>
                              <option value="Spain" id="cbf1805">
                                Spain
                              </option>
                              <option value="Italy" id="cbf1806">
                                Italy
                              </option>
                              <option value="Germany" id="cbf1807">
                                Germany
                              </option>
                              <option value="Russian Federation" id="cbf1808">
                                Russian Federation
                              </option>
                              <option value="China" id="cbf1810">
                                China
                              </option>
                              <option value="Afghanistan" id="cbf1811">
                                Afghanistan
                              </option>
                              <option value="Aland Islands" id="cbf2060">
                                Aland Islands
                              </option>
                              <option value="Albania" id="cbf1812">
                                Albania
                              </option>
                              <option value="Algeria" id="cbf1813">
                                Algeria
                              </option>
                              <option value="American Samoa" id="cbf1814">
                                American Samoa
                              </option>
                              <option value="Andorra" id="cbf1815">
                                Andorra
                              </option>
                              <option value="Angola" id="cbf1816">
                                Angola
                              </option>
                              <option value="Anguilla" id="cbf1817">
                                Anguilla
                              </option>
                              <option value="Antarctica" id="cbf1818">
                                Antarctica
                              </option>
                              <option value="Antigua and Barbuda" id="cbf1819">
                                Antigua and Barbuda
                              </option>
                              <option value="Argentina" id="cbf1820">
                                Argentina
                              </option>
                              <option value="Armenia" id="cbf1821">
                                Armenia
                              </option>
                              <option value="Aruba" id="cbf1822">
                                Aruba
                              </option>
                              <option value="Australia" id="cbf1823">
                                Australia
                              </option>
                              <option value="Austria" id="cbf1824">
                                Austria
                              </option>
                              <option value="Azerbaijan" id="cbf1825">
                                Azerbaijan
                              </option>
                              <option value="Bahamas" id="cbf1826">
                                Bahamas
                              </option>
                              <option value="Bahrain" id="cbf1827">
                                Bahrain
                              </option>
                              <option value="Bangladesh" id="cbf1828">
                                Bangladesh
                              </option>
                              <option value="Barbados" id="cbf1829">
                                Barbados
                              </option>
                              <option value="Belarus" id="cbf1830">
                                Belarus
                              </option>
                              <option value="Belgium" id="cbf1831">
                                Belgium
                              </option>
                              <option value="Belize" id="cbf1832">
                                Belize
                              </option>
                              <option value="Benin" id="cbf1833">
                                Benin
                              </option>
                              <option value="Bermuda" id="cbf1834">
                                Bermuda
                              </option>
                              <option value="Bhutan" id="cbf1835">
                                Bhutan
                              </option>
                              <option value="Bolivia" id="cbf1836">
                                Bolivia
                              </option>
                              <option
                                value="Bonaire, Sint Eustatius and Saba"
                                id="cbf2061"
                              >
                                Bonaire, Sint Eustatius and Saba
                              </option>
                              <option value="Bosnia Herzegovina" id="cbf1837">
                                Bosnia Herzegovina
                              </option>
                              <option value="Botswana" id="cbf1838">
                                Botswana
                              </option>
                              <option value="Bouvet Island" id="cbf1839">
                                Bouvet Island
                              </option>
                              <option value="Brazil" id="cbf1840">
                                Brazil
                              </option>
                              <option
                                value="British Indian Ocean Territory"
                                id="cbf1841"
                              >
                                British Indian Ocean Territory
                              </option>
                              <option
                                value="British Virgin Islands"
                                id="cbf2062"
                              >
                                British Virgin Islands
                              </option>
                              <option value="Brunei Darussalam" id="cbf1842">
                                Brunei Darussalam
                              </option>
                              <option value="Bulgaria" id="cbf1843">
                                Bulgaria
                              </option>
                              <option value="Burkina Faso" id="cbf1844">
                                Burkina Faso
                              </option>
                              <option value="Burundi" id="cbf1845">
                                Burundi
                              </option>
                              <option value="Cambodia" id="cbf1846">
                                Cambodia
                              </option>
                              <option value="Cameroon" id="cbf1847">
                                Cameroon
                              </option>
                              <option value="Canada" id="cbf1848">
                                Canada
                              </option>
                              <option value="Cape Verde" id="cbf1849">
                                Cape Verde
                              </option>
                              <option value="Cayman Islands" id="cbf1850">
                                Cayman Islands
                              </option>
                              <option
                                value="Central African Republic"
                                id="cbf1851"
                              >
                                Central African Republic
                              </option>
                              <option value="Chad" id="cbf1852">
                                Chad
                              </option>
                              <option value="Chile" id="cbf1853">
                                Chile
                              </option>
                              <option value="Christmas Island" id="cbf1854">
                                Christmas Island
                              </option>
                              <option
                                value="Cocos (Keeling) Islands"
                                id="cbf1855"
                              >
                                Cocos (Keeling) Islands
                              </option>
                              <option value="Colombia" id="cbf1856">
                                Colombia
                              </option>
                              <option value="Comoros" id="cbf1857">
                                Comoros
                              </option>
                              <option value="Cook Islands" id="cbf1859">
                                Cook Islands
                              </option>
                              <option value="Costa Rica" id="cbf1860">
                                Costa Rica
                              </option>
                              <option value="Croatia" id="cbf1861">
                                Croatia
                              </option>
                              <option value="Cuba" id="cbf1863">
                                Cuba
                              </option>
                              <option value="Curacao" id="cbf2063">
                                Curacao
                              </option>
                              <option value="Cyprus" id="cbf1864">
                                Cyprus
                              </option>
                              <option value="Czech Republic" id="cbf1865">
                                Czech Republic
                              </option>
                              <option
                                value="Democratic Republic of the Congo"
                                id="cbf2064"
                              >
                                Democratic Republic of the Congo
                              </option>
                              <option value="Denmark" id="cbf1866">
                                Denmark
                              </option>
                              <option value="Djibouti" id="cbf1867">
                                Djibouti
                              </option>
                              <option value="Dominica" id="cbf1868">
                                Dominica
                              </option>
                              <option value="Dominican Republic" id="cbf1869">
                                Dominican Republic
                              </option>
                              <option value="East Timor" id="cbf1870">
                                East Timor
                              </option>
                              <option value="Ecuador" id="cbf1871">
                                Ecuador
                              </option>
                              <option value="Egypt" id="cbf1872">
                                Egypt
                              </option>
                              <option value="El Salvador" id="cbf1873">
                                El Salvador
                              </option>
                              <option value="Equatorial Guinea" id="cbf1874">
                                Equatorial Guinea
                              </option>
                              <option value="Eritrea" id="cbf1875">
                                Eritrea
                              </option>
                              <option value="Estonia" id="cbf1876">
                                Estonia
                              </option>
                              <option value="Ethiopia" id="cbf1877">
                                Ethiopia
                              </option>
                              <option value="Falkland Islands" id="cbf1878">
                                Falkland Islands
                              </option>
                              <option value="Faroe Islands" id="cbf1879">
                                Faroe Islands
                              </option>
                              <option value="Fiji Islands" id="cbf1880">
                                Fiji Islands
                              </option>
                              <option value="Finland" id="cbf2065">
                                Finland
                              </option>
                              <option value="French Guiana" id="cbf2066">
                                French Guiana
                              </option>
                              <option value="French Polynesia" id="cbf2067">
                                French Polynesia
                              </option>
                              <option
                                value="French Southern Territories"
                                id="cbf2068"
                              >
                                French Southern Territories
                              </option>
                              <option value="Gabon" id="cbf2069">
                                Gabon
                              </option>
                              <option value="Gambia" id="cbf2070">
                                Gambia
                              </option>
                              <option value="Georgia" id="cbf2071">
                                Georgia
                              </option>
                              <option value="Ghana" id="cbf2072">
                                Ghana
                              </option>
                              <option value="Gibraltar" id="cbf2073">
                                Gibraltar
                              </option>
                              <option value="Greece" id="cbf1882">
                                Greece
                              </option>
                              <option value="Greenland" id="cbf1883">
                                Greenland
                              </option>
                              <option value="Grenada" id="cbf1884">
                                Grenada
                              </option>
                              <option value="Guadeloupe" id="cbf1885">
                                Guadeloupe
                              </option>
                              <option value="Guam" id="cbf1886">
                                Guam
                              </option>
                              <option value="Guatemala" id="cbf1887">
                                Guatemala
                              </option>
                              <option value="Guernsey" id="cbf2074">
                                Guernsey
                              </option>
                              <option value="Guinea" id="cbf1888">
                                Guinea
                              </option>
                              <option value="Guinea-Bissau" id="cbf1889">
                                Guinea-Bissau
                              </option>
                              <option value="Guyana" id="cbf1890">
                                Guyana
                              </option>
                              <option value="Haiti" id="cbf1891">
                                Haiti
                              </option>
                              <option
                                value="Heard Island and McDonald Islands"
                                id="cbf1892"
                              >
                                Heard Island and McDonald Islands
                              </option>
                              <option value="Honduras" id="cbf1894">
                                Honduras
                              </option>
                              <option value="Hong Kong" id="cbf1895">
                                Hong Kong
                              </option>
                              <option value="Hungary" id="cbf1896">
                                Hungary
                              </option>
                              <option value="Iceland" id="cbf1897">
                                Iceland
                              </option>
                              <option value="India" id="cbf1898">
                                India
                              </option>
                              <option value="Indonesia" id="cbf1899">
                                Indonesia
                              </option>
                              <option
                                value="Iran (Islamic Republic of)"
                                id="cbf1900"
                              >
                                Iran (Islamic Republic of)
                              </option>
                              <option value="Iraq" id="cbf1901">
                                Iraq
                              </option>
                              <option value="Isle of Man" id="cbf2075">
                                Isle of Man
                              </option>
                              <option value="Israel" id="cbf1902">
                                Israel
                              </option>
                              <option value="Ivory Coast" id="cbf2076">
                                Ivory Coast
                              </option>
                              <option value="Jamaica" id="cbf1903">
                                Jamaica
                              </option>
                              <option value="Japan" id="cbf1904">
                                Japan
                              </option>
                              <option value="Jersey" id="cbf2077">
                                Jersey
                              </option>
                              <option value="Jordan" id="cbf1905">
                                Jordan
                              </option>
                              <option value="Kazakhstan" id="cbf1906">
                                Kazakhstan
                              </option>
                              <option value="Kenya" id="cbf1907">
                                Kenya
                              </option>
                              <option value="Kiribati" id="cbf1908">
                                Kiribati
                              </option>
                              <option value="Kosovo" id="cbf2078">
                                Kosovo
                              </option>
                              <option value="Kuwait" id="cbf1910">
                                Kuwait
                              </option>
                              <option value="Kyrgyzstan" id="cbf1911">
                                Kyrgyzstan
                              </option>
                              <option value="Laos" id="cbf1912">
                                Laos
                              </option>
                              <option value="Latvia" id="cbf1913">
                                Latvia
                              </option>
                              <option value="Lebanon" id="cbf1914">
                                Lebanon
                              </option>
                              <option value="Lesotho" id="cbf1915">
                                Lesotho
                              </option>
                              <option value="Liberia" id="cbf1916">
                                Liberia
                              </option>
                              <option value="Libya" id="cbf1917">
                                Libya
                              </option>
                              <option value="Liechtenstein" id="cbf1918">
                                Liechtenstein
                              </option>
                              <option value="Lithuania" id="cbf1919">
                                Lithuania
                              </option>
                              <option value="Luxembourg" id="cbf1920">
                                Luxembourg
                              </option>
                              <option value="Macau" id="cbf1921">
                                Macau
                              </option>
                              <option value="Macedonia" id="cbf1922">
                                Macedonia
                              </option>
                              <option value="Madagascar" id="cbf1923">
                                Madagascar
                              </option>
                              <option value="Malawai" id="cbf1924">
                                Malawai
                              </option>
                              <option value="Malaysia" id="cbf1925">
                                Malaysia
                              </option>
                              <option value="Maldives" id="cbf1926">
                                Maldives
                              </option>
                              <option value="Mali" id="cbf1927">
                                Mali
                              </option>
                              <option value="Malta" id="cbf1928">
                                Malta
                              </option>
                              <option value="Marshall Islands" id="cbf1929">
                                Marshall Islands
                              </option>
                              <option value="Martinique" id="cbf1930">
                                Martinique
                              </option>
                              <option value="Mauritania" id="cbf2079">
                                Mauritania
                              </option>
                              <option value="Mauritius" id="cbf1931">
                                Mauritius
                              </option>
                              <option value="Mayotte" id="cbf1932">
                                Mayotte
                              </option>
                              <option value="Mexico" id="cbf2102">
                                Mexico
                              </option>
                              <option value="Micronesia" id="cbf1933">
                                Micronesia
                              </option>
                              <option value="Moldova" id="cbf1934">
                                Moldova
                              </option>
                              <option value="Monaco" id="cbf1935">
                                Monaco
                              </option>
                              <option value="Mongolia" id="cbf1936">
                                Mongolia
                              </option>
                              <option value="Montserrat" id="cbf1937">
                                Montserrat
                              </option>
                              <option value="Morocco" id="cbf1938">
                                Morocco
                              </option>
                              <option value="Mozambique" id="cbf1939">
                                Mozambique
                              </option>
                              <option value="Myanmar" id="cbf1941">
                                Myanmar
                              </option>
                              <option value="Namibia" id="cbf1942">
                                Namibia
                              </option>
                              <option value="Nauru" id="cbf1943">
                                Nauru
                              </option>
                              <option value="Nepal" id="cbf1944">
                                Nepal
                              </option>
                              <option value="Netherlands" id="cbf1945">
                                Netherlands
                              </option>
                              <option value="Netherlands Antilles" id="cbf1946">
                                Netherlands Antilles
                              </option>
                              <option value="New Caledonia" id="cbf1947">
                                New Caledonia
                              </option>
                              <option value="New Zealand" id="cbf1948">
                                New Zealand
                              </option>
                              <option value="Nicaragua" id="cbf1949">
                                Nicaragua
                              </option>
                              <option value="Niger" id="cbf1950">
                                Niger
                              </option>
                              <option value="Nigeria" id="cbf1951">
                                Nigeria
                              </option>
                              <option value="Niue" id="cbf1952">
                                Niue
                              </option>
                              <option value="Norfolk Island" id="cbf1953">
                                Norfolk Island
                              </option>
                              <option value="North Korea" id="cbf2103">
                                North Korea
                              </option>
                              <option
                                value="Northern Mariana Islands"
                                id="cbf1954"
                              >
                                Northern Mariana Islands
                              </option>
                              <option value="Norway" id="cbf1955">
                                Norway
                              </option>
                              <option value="Oman" id="cbf1956">
                                Oman
                              </option>
                              <option value="Pakistan" id="cbf1957">
                                Pakistan
                              </option>
                              <option value="Palau" id="cbf1958">
                                Palau
                              </option>
                              <option
                                value="Palestinian Territory"
                                id="cbf2080"
                              >
                                Palestinian Territory
                              </option>
                              <option value="Panama" id="cbf1959">
                                Panama
                              </option>
                              <option value="Papua New Guinea" id="cbf1960">
                                Papua New Guinea
                              </option>
                              <option value="Paraguay" id="cbf1961">
                                Paraguay
                              </option>
                              <option value="Peru" id="cbf1962">
                                Peru
                              </option>
                              <option value="Philippines" id="cbf1963">
                                Philippines
                              </option>
                              <option value="Pitcairn" id="cbf1964">
                                Pitcairn
                              </option>
                              <option value="Poland" id="cbf1965">
                                Poland
                              </option>
                              <option value="Portugal" id="cbf1966">
                                Portugal
                              </option>
                              <option value="Puerto Rico" id="cbf1967">
                                Puerto Rico
                              </option>
                              <option value="Qatar" id="cbf2081">
                                Qatar
                              </option>
                              <option value="Reunion" id="cbf1968">
                                Reunion
                              </option>
                              <option value="Romania" id="cbf1969">
                                Romania
                              </option>
                              <option value="Rwanda" id="cbf1970">
                                Rwanda
                              </option>
                              <option value="Saint Barthelemy" id="cbf2082">
                                Saint Barthelemy
                              </option>
                              <option value="Saint Helena" id="cbf2104">
                                Saint Helena
                              </option>
                              <option
                                value="Saint Kitts and Nevis"
                                id="cbf1971"
                              >
                                Saint Kitts and Nevis
                              </option>
                              <option value="Saint Lucia" id="cbf1972">
                                Saint Lucia
                              </option>
                              <option value="Saint Martin" id="cbf2083">
                                Saint Martin
                              </option>
                              <option
                                value="Saint Pierre and Miquelon"
                                id="cbf2084"
                              >
                                Saint Pierre and Miquelon
                              </option>
                              <option
                                value="Saint Vincent and the Grenadines"
                                id="cbf1973"
                              >
                                Saint Vincent and the Grenadines
                              </option>
                              <option value="Samoa" id="cbf1974">
                                Samoa
                              </option>
                              <option value="San Marino" id="cbf1975">
                                San Marino
                              </option>
                              <option
                                value="Sao Tome and Principe"
                                id="cbf1976"
                              >
                                Sao Tome and Principe
                              </option>
                              <option value="Saudi Arabia" id="cbf1977">
                                Saudi Arabia
                              </option>
                              <option value="Senegal" id="cbf1978">
                                Senegal
                              </option>
                              <option value="Serbia" id="cbf2085">
                                Serbia
                              </option>
                              <option
                                value="Serbia and Montenegro"
                                id="cbf2086"
                              >
                                Serbia and Montenegro
                              </option>
                              <option value="Seychelles" id="cbf1979">
                                Seychelles
                              </option>
                              <option value="Sierra Leone" id="cbf1980">
                                Sierra Leone
                              </option>
                              <option value="Singapore" id="cbf1981">
                                Singapore
                              </option>
                              <option value="Sint Maarten" id="cbf2087">
                                Sint Maarten
                              </option>
                              <option
                                value="Slovakia (Slovak Republic)"
                                id="cbf1982"
                              >
                                Slovakia (Slovak Republic)
                              </option>
                              <option value="Slovenia" id="cbf1983">
                                Slovenia
                              </option>
                              <option value="Solomon Islands" id="cbf2088">
                                Solomon Islands
                              </option>
                              <option value="Somalia" id="cbf1984">
                                Somalia
                              </option>
                              <option value="South Africa" id="cbf1985">
                                South Africa
                              </option>
                              <option value="South Korea" id="cbf2089">
                                South Korea
                              </option>
                              <option
                                value="South Georgia and the South Sandwich Islands"
                                id="cbf1986"
                              >
                                South Georgia and the South Sandwich Islands
                              </option>
                              <option value="South Sudan" id="cbf2090">
                                South Sudan
                              </option>
                              <option value="Sri Lanka" id="cbf1987">
                                Sri Lanka
                              </option>
                              <option value="Sudan" id="cbf1989">
                                Sudan
                              </option>
                              <option value="Suriname" id="cbf1990">
                                Suriname
                              </option>
                              <option
                                value="Svalbard and Jan Mayen Islands"
                                id="cbf1991"
                              >
                                Svalbard and Jan Mayen Islands
                              </option>
                              <option value="Swaziland" id="cbf1992">
                                Swaziland
                              </option>
                              <option value="Sweden" id="cbf2091">
                                Sweden
                              </option>
                              <option value="Switzerland" id="cbf1994">
                                Switzerland
                              </option>
                              <option value="Syrian Arab Republic" id="cbf1995">
                                Syrian Arab Republic
                              </option>
                              <option
                                value="Taiwan(Province of China)"
                                id="cbf1996"
                              >
                                Taiwan(Province of China)
                              </option>
                              <option value="Tajikistan" id="cbf1997">
                                Tajikistan
                              </option>
                              <option value="Tanzania" id="cbf2092">
                                Tanzania
                              </option>
                              <option value="Thailand" id="cbf1998">
                                Thailand
                              </option>
                              <option value="Togo" id="cbf1999">
                                Togo
                              </option>
                              <option value="Tokelau" id="cbf2000">
                                Tokelau
                              </option>
                              <option value="Tonga" id="cbf2001">
                                Tonga
                              </option>
                              <option value="Trinidad and Tobago" id="cbf2002">
                                Trinidad and Tobago
                              </option>
                              <option value="Tunisia" id="cbf2003">
                                Tunisia
                              </option>
                              <option value="Turkey" id="cbf2004">
                                Turkey
                              </option>
                              <option value="Turkmenistan" id="cbf2005">
                                Turkmenistan
                              </option>
                              <option
                                value="Turks and Caicos Islands"
                                id="cbf2006"
                              >
                                Turks and Caicos Islands
                              </option>
                              <option value="Tuvalu" id="cbf2093">
                                Tuvalu
                              </option>
                              <option value="U.S. Virgin Islands" id="cbf2094">
                                U.S. Virgin Islands
                              </option>
                              <option value="Uganda" id="cbf2007">
                                Uganda
                              </option>
                              <option value="Ukraine" id="cbf2008">
                                Ukraine
                              </option>
                              <option value="United Arab Emirates" id="cbf2095">
                                United Arab Emirates
                              </option>
                              <option
                                value="United States Minor Outlying Islands"
                                id="cbf2009"
                              >
                                United States Minor Outlying Islands
                              </option>
                              <option value="Uruguay" id="cbf2010">
                                Uruguay
                              </option>
                              <option value="USA" id="cbf2096">
                                USA
                              </option>
                              <option value="Uzbekistan" id="cbf2011">
                                Uzbekistan
                              </option>
                              <option value="Vanuatu" id="cbf2097">
                                Vanuatu
                              </option>
                              <option value="Vatican" id="cbf2098">
                                Vatican
                              </option>
                              <option value="Venezuela" id="cbf2012">
                                Venezuela
                              </option>
                              <option value="Vietnam" id="cbf2013">
                                Vietnam
                              </option>
                              <option
                                value="Wallis and Futuna Islands"
                                id="cbf2016"
                              >
                                Wallis and Futuna Islands
                              </option>
                              <option value="Western Sahara" id="cbf2017">
                                Western Sahara
                              </option>
                              <option value="Yemen" id="cbf2018">
                                Yemen
                              </option>
                              <option value="Zambia" id="cbf2020">
                                Zambia
                              </option>
                              <option value="Zimbabwe" id="cbf2021">
                                Zimbabwe
                              </option>
                            </select>
                            <span className="cbFieldIcons">
                              <span
                                className="cbTooltip"
                                data-cbtooltip-tooltip="This Field IS visible on profile"
                                data-hasqtip="20"
                              >
                                <span className="fa fa-eye text-muted" />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_143"
                    >
                      <label
                        htmlFor="cb_references"
                        id="cblabcb_references"
                        className="control-label col-sm-3"
                      >
                        References
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_143">
                          <span>
                            Dealers, auction houses, or 'no references'
                            <br />
                          </span>
                          <input
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            name="references"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_143"
                    >
                      <label className="control-label col-sm-3">
                        Collecting Interest
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_143">
                          <span>
                            Greek, Roman, Medieval coin
                            <br />
                          </span>
                          <input
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            name="collecting_interest"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className="sectiontableentry1 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_144"
                    >
                      <label
                        htmlFor="cb_requestedcreditlimit"
                        id="cblabcb_requestedcreditlimit"
                        className="control-label col-sm-3"
                      >
                        Requested Credit Limit
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_144">
                          <span>
                             You will immediately be able to bid up to a default
                            credit limit of £3,000. Higher credit limit requests
                            must be manually approved by our staff, and will
                            take effect once approved. This is not a credit
                            agreement and all purchases must be settled
                            immediately post-auction. 
                            <input
                              onChange={this.handleInputChange}
                              type="text"
                              name="credit_limit"
                              id="cb_requestedcreditlimit"
                              defaultValue=""
                              size="25"
                              placeholder="£3,000"
                              className="form-control"
                            />
                          </span>
                        </div>
                      </div>
                    </div> */}
                    <div
                      className="sectiontableentry2 cbft_primaryemailaddress cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_50"
                    >
                      <label
                        htmlFor="email"
                        id="cblabemail"
                        className="control-label col-sm-3"
                      >
                        Email *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_50">
                          <input
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            name="email"
                            id="email"
                            defaultValue=""
                            className="cbTooltip required form-control"
                            data-cbtooltip-tooltip="Please enter a valid e-mail address. A confirmation email will be sent to this address upon sign up."
                            data-cbtooltip-title="Email *"
                            data-rule-email="true"
                            size="25"
                            aria-required="true"
                            data-hasqtip="24"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry1 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_145"
                    >
                      <label
                        htmlFor="cb_confirmemail"
                        id="cblabcb_confirmemail"
                        className="control-label col-sm-3"
                      >
                        Confirm Email *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_145">
                          <input
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            name="email2"
                            id="cb_confirmemail"
                            defaultValue=""
                            size="25"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_55"
                    >
                      <label
                        htmlFor="cb_telephone"
                        id="cblabcb_telephone"
                        className="control-label col-sm-3"
                      >
                        Phone *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_55">
                          <input
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            name="phone"
                            id="cb_telephone"
                            defaultValue=""
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry1 cbft_image form-group cb_form_line clearfix"
                      id="cbfr_116"
                      style={{ display: "none" }}
                    >
                      <label
                        htmlFor="cb_utility"
                        id="cblabcb_utility"
                        className="control-label col-sm-3"
                      >
                        Uitility Bill
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_116">
                          <div
                            className="form-group cb_form_line clearfix"
                            style={{ display: "none" }}
                          >
                            <select
                              name="cb_utility__choice"
                              id="cb_utility__choice"
                              className="form-control"
                            >
                              <option
                                defaultValue=""
                                id="cb_utility__choice__cbf0"
                              >
                                No image
                              </option>
                              <option
                                value="upload"
                                id="cb_utility__choice__cbf1"
                              >
                                Upload image
                              </option>
                            </select>
                          </div>
                          {/* <div
                            id="cbimagefile_upload_cb_utility"
                            className="form-group cb_form_line clearfix"
                            style={{ display: "block" }}
                          >
                            <div className="help-block">
                              Your image file must be of gif, png, jpg, jpeg
                              type. Your image file should not exceed 1.95 MBs.
                              Images exceeding the maximum width of 200 will be
                              resized. Images exceeding the maximum height of
                              500 will be resized.
                            </div>
                            <div>
                              Select image file
                              <input
                                type="file"
                                name="cb_utility__file"
                                defaultValue=""
                                className="form-control"
                                data-rule-extension="gif,png,jpg,jpeg"
                                data-rule-filesize='[0,"2000","KB"]'
                              />
                            </div>
                            <div className="help-block">
                              By uploading, you certify that you have the right
                              to distribute this image.
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="register-page-options-container">
                  <div className="cbFieldsContentsTab" id="cbtf_26">
                    <div
                      className="sectiontableentry2 cbft_delimiter form-group cb_form_line clearfix"
                      id="cbfr_127"
                    >
                      <label
                        htmlFor="cb_emailpreftext"
                        id="cblabcb_emailpreftext"
                        className="control-label col-sm-3"
                      >
                        Email Pref Text
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_127">
                          <h2 className="h1" style={{ marginBottom: "10px" }}>
                            Email Subscription
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry1 cbft_checkbox form-group cb_form_line clearfix"
                      id="cbfr_146"
                    >
                      <label
                        htmlFor="cb_email_newsletters"
                        id="cblabcb_email_newsletters"
                        className="control-label col-sm-3"
                      >
                        <p>
                          Yes I would like to receive email newsletters &amp;
                          alerts
                        </p>
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_146">
                          <span className="cbSingleCntrl">
                            <label
                              htmlFor="cb_email_newsletters"
                              className="checkbox-inline"
                            >
                              <input
                                type="checkbox"
                                id="cb_email_newsletters"
                                name="cb_email_newsletters"
                                value="1"
                              />
                            </label>
                          </span>
                          <span className="cbFieldIcons">
                            <span
                              className="cbTooltip"
                              data-cbtooltip-tooltip="This Field IS visible on profile"
                              data-hasqtip="31"
                            >
                              <span className="fa fa-eye text-muted" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="register-page-options-container">
                  <div className="cbFieldsContentsTab" id="cbtf_24">
                    {/* <div
                      className="sectiontableentry2 cbft_delimiter form-group cb_form_line clearfix"
                      id="cbfr_112"
                    >
                      <label
                        htmlFor="cb_passwordtext"
                        id="cblabcb_passwordtext"
                        className="control-label col-sm-3"
                      >
                        Password Text
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_112">
                          <h1>Password</h1>
                        </div>
                      </div>
                    </div> */}
                    <div
                      className="sectiontableentry1 cbft_password cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_51"
                    >
                      <label
                        htmlFor="password"
                        id="cblabpassword"
                        className="control-label col-sm-3"
                      >
                        Password
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_51">
                          <input
                            onChange={this.handleInputChange}
                            required
                            type="password"
                            name="password"
                            id="password"
                            defaultValue=""
                            className="cbTooltip required form-control"
                            data-cbtooltip-tooltip="<p>Password</p>"
                            data-cbtooltip-title="Password"
                            data-rule-minlength="6"
                            data-rule-maxlength="50"
                            autoComplete="off"
                            size="25"
                            maxLength="50"
                            aria-required="true"
                            data-hasqtip="32"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry1 cbft_password cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_51__verify"
                    >
                      <label
                        htmlFor="password__verify"
                        id="cblabpassword__verify"
                        className="control-label col-sm-3"
                      >
                        Verify Password
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_51__verify">
                          <input
                            onChange={this.handleInputChange}
                            required
                            type="password"
                            name="password2"
                            id="password__verify"
                            defaultValue=""
                            className="cbTooltip required form-control"
                            data-cbtooltip-tooltip="<p>Password</p>"
                            data-cbtooltip-title="Verify Password"
                            data-rule-minlength="6"
                            data-rule-maxlength="50"
                            data-rule-equalto="#password"
                            autoComplete="off"
                            size="25"
                            maxLength="50"
                            aria-required="true"
                            data-hasqtip="35"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="sectiontableentry2 cbft_terms form-group cb_form_line clearfix"
                      id="cbfr_44"
                    >
                      <label
                        htmlFor="acceptedterms"
                        id="cblabacceptedterms"
                        className="control-label col-sm-3"
                      >
                        I confirm that I have read the
                        <Link
                          to="/terms-and-conditions"
                          title="Terms and Conditions"
                          target="_blank"
                        >
                          Terms &amp; Conditions
                        </Link>
                        and
                        <Link
                          to="/privacy-policy"
                          title="Privacy Policy"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_44">
                          <span className="cbSingleCntrl">
                            <label
                              htmlFor="acceptedterms"
                              className="checkbox-inline"
                            >
                              <input
                                type="checkbox"
                                id="acceptedterms"
                                name="acceptedterms"
                                value="1"
                                className="required"
                                aria-required="true"
                              />
                            </label>
                          </span>
                          <span className="cbFieldIcons">
                            <span
                              className="cbTooltip"
                              data-cbtooltip-tooltip="This Field is required"
                              data-hasqtip="38"
                            >
                              <span className="fa fa-star text-muted" />
                            </span>
                            <span
                              className="cbTooltip"
                              data-cbtooltip-tooltip="This Field IS NOT visible on profile"
                              data-hasqtip="39"
                            >
                              <span className="fa fa-eye-slash text-muted" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className="sectiontableentry1 cbft_delimiter form-group cb_form_line clearfix"
                      id="cbfr_140"
                    >
                      <label
                        htmlFor="cb_captcha"
                        id="cblabcb_captcha"
                        className="control-label col-sm-3"
                      >
                        Captcha
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_140">
                          <div
                            className="g-recaptcha"
                            data-sitekey="6LfhJz8UAAAAADUAy9dbvsh2RmQg6fJVQ1s2RYH5"
                          >
                            <div style={{ width: "304px", height: "78px" }}>
                              <div>
                                <iframe
                                  src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LfhJz8UAAAAADUAy9dbvsh2RmQg6fJVQ1s2RYH5&amp;co=aHR0cHM6Ly93d3cucm9tYW51bWlzbWF0aWNzLmNvbTo0NDM.&amp;hl=en&amp;v=v1560753160450&amp;size=normal&amp;cb=goemxy60id77"
                                  width="304"
                                  height="78"
                                  role="presentation"
                                  name="a-8khjof8g0wgt"
                                  frameBorder="0"
                                  scrolling="no"
                                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                                />
                              </div>
                              <textarea
                                id="g-recaptcha-response"
                                name="g-recaptcha-response"
                                className="g-recaptcha-response"
                                style={{
                                  width: "250px",
                                  height: "40px",
                                  border: "1px solid rgb(193, 193, 193)",
                                  margin: "10px 25px",
                                  padding: "0px",
                                  resize: "none",
                                  display: "none"
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                {formIsSubmitting ? (
                  <div className="form-group cb_form_line clearfix registration-button-container">
                    <div className="col-sm-offset-3 col-sm-9">
                      <input
                        type="submit"
                        value="Submitting"
                        disabled
                        className="btn btn-primary cbRegistrationSubmit"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="form-group cb_form_line clearfix registration-button-container">
                    <div className="col-sm-offset-3 col-sm-9">
                      <input
                        type="submit"
                        value="register"
                        className="btn btn-primary cbRegistrationSubmit"
                      />
                    </div>
                  </div>
                )}

                {submitError ? (
                  <div className="alert alert danger">{submitErrorMsg}</div>
                ) : (
                  ""
                )}
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
)(Signup);
