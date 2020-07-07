import React, { Component } from "react";

class AdvanceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="advanced_search" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div className="page cf">
          <div id="system-message-container" />

          <div className="auction_advance_search">
            <form
              method="get"
              action="https://www.romanumismatics.com/index.php"
              className="ng-pristine ng-valid"
            >
              <h1 className="search-title">Advanced Search Options</h1>
              <div className="search-right">
                <div className="search-upcoming-auctions">
                  <span className="lbl_catalog_list lbl">Search by Auction</span>
                  <span className="value_catalog_list">
                    <select name="auction_id" id="auction">
                      <option value="">Select Auction</option>
                      <option value="55">E-Sale 56 (23-06-2019)</option>
                      <option value="54">E-Sale 55(02-06-2019)</option>
                      <option value="56">E-Sale 57(30-05-2019)</option>
                      <option value="62">Auction XVII(12-05-2019)</option>
                      <option value="52">E-Sale 54(14-04-2019)</option>
                      <option value="48">E-Sale 53(24-03-2019)</option>
                      <option value="51">E-Sale 52(24-02-2019)</option>
                      <option value="50">E-LIVE Auction 4(13-01-2019)</option>
                      <option value="46">Auction XVI(26-09-2018)</option>
                      <option value="34">Auction XV(05-04-2018)</option>
                    </select>
                  </span>
                  {/* <!-- End .value_catalog_list --> */}
                </div>

                <div className="search-upcoming-auctions">
                  <span className="lbl_catalog_list lbl">
                    Search Auction By Year
                  </span>
                  <select name="year" id="year">
                    <option value="">Select Year</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                </div>

                <div className="keyword-search first cf">
                  <span className="lbl_enter_keyword lbl">Enter Keywords:</span>
                  <span className="value_enter_keyword value">
                    <input
                      name="keyword"
                      type="text"
                      id="enterkeyword"
                      placeholder="SEPARATE KEYWORDS WITH A COMMA"
                    />
                  </span>

                  <span className="lbl_ex_enter_keyword lbl">
                    Exclude Keywords:
                  </span>
                  <span className="value_ex_enter_keyword value">
                    <input
                      name="excl_keyword"
                      type="text"
                      id="ex_enterkeyword"
                      placeholder="SEPARATE KEYWORDS WITH A COMMA"
                    />
                  </span>
                </div>
                <div className="estimate cf">
                  {/* <!--Low Estimate--> */}
                  <span className="lbl_low_estimate lbl">Estimate:</span>
                  <span className="value_low_estimate value">
                    <input
                      name="low_estimate"
                      type="text"
                      id="lowestimate"
                      placeholder="£100.00"
                    />
                  </span>
                </div>

                <div className="sort-by-section cf">
                  <div className="sort-by">
                    <label className="lbl">Sort Results By</label>
                    <span className="value_display_type value">
                      <select name="sort_by">
                        <option value="lot_no">Lot number</option>
                        <option value="high_low">Est: High - Low</option>
                        <option value="low_high">Est: Low - High</option>
                      </select>
                    </span>
                  </div>
                  <div className="view-as">
                    <span className="lbl_per_page lbl">Results per page</span>
                    <span className="value_per_page value">
                      <select
                        size="1"
                        className="pagelimit"
                        id="limit"
                        name="lots_per_page"
                      >
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </span>
                    <span className="lbl_display_type lbl">View Results as</span>
                    <span className="value_display_type value">
                      <select name="gridtype" id="display_type">
                        <option value="listview">List</option>
                        <option value="gridview">Grid</option>
                      </select>
                    </span>
                  </div>
                </div>

                <div className="submit_enter_lot">
                  <input
                    className="button view-details-btn"
                    type="submit"
                    value="Search"
                  />
                </div>
              </div>
              {/* <!-- End .search-right --> */}

              <input type="hidden" name="option" value="com_bidders" />
              <input type="hidden" name="page_no" value="1" />
            </form>
          </div>
          {/* <!-- End .auction_advance_search --> */}
        </div>
      </div>
    );
  }
}

export default AdvanceSearch;
