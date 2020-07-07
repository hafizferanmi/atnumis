import React, { Component } from "react";
import { postData } from "../http.service";
import { Helmet } from "react-helmet";
import { closeLoginModal } from "../actions/loginModal.action";
import { connect } from "react-redux";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: true,
      buttonDisabled: false,
      userDetails: {},
      formIsSubmitting: false,
      signUpValueEmpty: false
    };
  }

  register = e => {
    e.preventDefault();
    this.setState({ formIsSubmitting: true });
    // alert("Login In");
    const data = {
      // username: e.target.elements.username.value,
      // password: e.target.elements.password.value,
      firstname: e.target.elements.firstname.value,
      lastname: e.target.elements.lastname.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      company: e.target.elements.company.value,
      address1: e.target.elements.address1.value,
      address2: e.target.elements.address2.value,
      city: e.target.elements.city.value,
      zip: e.target.elements.zip.value,
      country: e.target.elements.country.value,
      reference: e.target.elements.reference.value,
      credit_limit: e.target.elements.credit_limit.value,
      phone: e.target.elements.phone.value
      // : e.target.elements..value,
    };

    // console.log(postData);

    let submittedData = Object.values(data);
    if (submittedData.includes("")) {
      this.setState({
        signUpValueEmpty: true,
        formIsSubmitting: false
      });
      return;
    }

    this.setState({ formIsSubmitting: true });
    postData("/signup", data)
      .then(data => {
        this.setState({
          buttonDisabled: false,
          formIsSubmitting: false
        });
        if (!data.error) {
          this.setState({
            registered: true,
            userDetails: data.data
          });
        } else {
          this.setState({ regError: true });
        }
      })
      .catch(error => this.setState({ error: error }));
  };

  componentDidMount() {
    this.props.closeLoginModal();
  }

  render() {
    const { formIsSubmitting } = this.state;
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
                  {/* <h3>Join us!</h3> */}
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
                      <div className="cb_field ">
                        <div id="cbfv_124">
                          <h1 style={{ marginTop: "30px" }}>Sign Up To Bid</h1>
                          <p>
                            Registration is simple. Please fill in your details
                            below. All registrations must be manually approved
                            before bidding. The approval process takes place
                            during normal UK business hours.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_66"
                    >
                      <label
                        htmlFor="firstname"
                        id="cblabcb_firstname"
                        className="control-label col-sm-3"
                      >
                        First Name *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_66">
                          <input
                            type="text"
                            name="firstname"
                            id="cb_firstname"
                            ref="firstname"
                            size="25"
                            className="required form-control"
                            aria-required="true"
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
                            type="text"
                            name="lastname"
                            id="cb_surname"
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_111"
                    >
                      <label
                        htmlFor="email"
                        id="email"
                        className="control-label col-sm-3"
                      >
                        Email Address
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_111">
                          <input
                            type="email"
                            name="email"
                            ref="email"
                            id="email"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="sectiontableentry2 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_111"
                    >
                      <label
                        htmlFor="password"
                        id="password"
                        className="control-label col-sm-3"
                      >
                        Password
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_111">
                          <input
                            type="password"
                            name="password"
                            ref="password"
                            id="password"
                            className="form-control"
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
                            type="text"
                            name="company"
                            ref="company"
                            id="cb_company"
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
                            type="text"
                            name="address1"
                            ref="address1"
                            id="cb_address2"
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
                            type="text"
                            name="address2"
                            ref="address2"
                            id="address2"
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
                            type="text"
                            name="city"
                            ref="city"
                            id="cb_city"
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
                            type="text"
                            name="zip"
                            ref="zip"
                            id="cb_zip"
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="register-page-options-container">
                      <div className="cbFieldsContentsTab" id="cbtf_23">
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
                            <div id="cbfv_65" />
                            <select
                              ref="country"
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
                              <option
                                value="British Virgin Islands"
                                id="cbf2024"
                              >
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
                              <option
                                value="Palestinian Territory"
                                id="cbf2042"
                              >
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
                              <option
                                value="Saint Kitts and Nevis"
                                id="cbf1749"
                              >
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
                              <option
                                value="Sao Tome and Principe"
                                id="cbf1754"
                              >
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
                              <option
                                value="Serbia and Montenegro"
                                id="cbf2048"
                              >
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
                        References *
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_143">
                          <input
                            type="text"
                            ref="reference"
                            name="reference"
                            id="cb_references"
                            size="25"
                            className="required form-control"
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="sectiontableentry1 cbft_text cbtt_input form-group cb_form_line clearfix"
                      id="cbfr_144"
                    >
                      <label
                        htmlFor="cb_requestedcreditlimit"
                        id="cblabcb_requestedcreditlimit"
                        className="control-label col-sm-3"
                      >
                        Credit Limit
                      </label>
                      <div className="cb_field col-sm-9">
                        <div id="cbfv_144">
                          <span>
                            {/* You will immediately be able to bid up to a
                              default credit limit of £3,000. Higher credit
                              limit requests must be manually approved by our
                              staff, and will take effect once approved. This is
                              not a credit agreement and all purchases must be
                              settled immediately post-auction. */}
                            <input
                              type="text"
                              ref="credit_limit"
                              name="credit_limit"
                              id="cb_requestedcreditlimit"
                              size="25"
                              placeholder="£3,000"
                              className="form-control"
                            />
                          </span>
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
                            type="text"
                            name="phone"
                            id="cb_telephone"
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
                          />
                          <select
                            name="cb_utility__choice"
                            id="cb_utility__choice"
                            className="form-control"
                          >
                            <option id="cb_utility__choice__cbf0">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group cb_form_line clearfix registration-button-container">
                <div className="col-sm-offset-3 col-sm-9">
                  <input
                    disabled={formIsSubmitting ? true : false}
                    type="submit"
                    value={formIsSubmitting ? "Registering" : "Register"}
                    sign=""
                    className="btn btn-primary cbRegistrationSubmit"
                  />
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
)(Signup);
