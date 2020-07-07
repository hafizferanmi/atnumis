import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BuyingCoin from './buyingcoin'
import Loading from './loading'
import { fetchData } from '../http.service'
import PaginationComponent from 'react-reactstrap-pagination'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { updateBuyingCoins } from '../actions/coin.action'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications'
import ReactPaginate from 'react-paginate'

class BuyNow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coinIsLoading: false,
      gridType: 'ul-grid',
      listViewActive: true,
      gridViewActive: false,
      coinInfo: {},
      justCoin: [],
      fetchError: false,
      selectedPage: 1
    }
  }

  componentWillMount() {
    let coins = this.props.buyingCoins
    // console.log({ coins: coins.length });
    // console.log({ coins });
    if (coins.length <= 0) {
      this.setState({ coinIsLoading: true })
      fetchData(`/buy`).then(data => {
        this.props.updateBuyingCoins(data)
        this.setState({
          coinIsLoading: false,
          coinInfo: data,
          justCoin: data.coins
        })
      })
    } else {
      this.setState({ coinInfo: coins, justCoin: coins.coins })
    }
  }

  filterCategory = cat => {
    let { coinInfo, justCoin } = this.state
    let filteredCoins = justCoin.filter(coin => coin.category == cat)
    coinInfo.coins = filteredCoins
  }

  resetCoins = () => {
    let { coinInfo, justCoin } = this.state
    coinInfo.coins = justCoin
  }

  toggleListView = () => {
    if (this.state.gridType === 'ul-list') {
      this.setState({ gridType: 'ul-grid' })
      this.setState({ gridViewActive: true, listViewActive: false })
    } else {
      this.setState({ gridType: 'ul-list' })
      this.setState({ listViewActive: true, gridViewActive: false })
    }
  }

  showPaginatedCoin = selectedPage => {
    console.log('selected', selectedPage)
    this.setState({ selectedPage: selectedPage })
  }

  addToCart = id => {
    this.props.addCoinToCart(id)
  }

  render() {
    // console.log(this.props);
    const {
      coinIsLoading,
      gridType,
      listViewActive,
      gridViewActive
    } = this.state

    // console.log(this.state);

    const {
      coins,
      categories,
      coinCount
      // estimates: { min, max }
    } = this.state.coinInfo

    return (
      <>
        {coinIsLoading ? (
          <Loading />
        ) : (
          <>
            <NotificationContainer />
            <Helmet>
              <title> Buy Now - Atnumis </title>
            </Helmet>

            <div className='page cf'>
              <div id='system-message-container' />
              <div
                className='catalogue-view '
                ng-controller='timedAuctionCtrl as taCtrl'
                id='auction-holder'
              >
                <section className='catalogue-details'>
                  <div className='catalogue-details-holder'>
                    <div className='catalogue-details__inner'>
                      <h1 className='catalogue-details__title'>
                        {' '}
                        {'Buy Now'}{' '}
                      </h1>

                      <div className='catalogue-details__buttons' />
                      <div className='total-lots-categories'>
                        {/* <div className="auction-categories">
                          <p>
                            <Link
                              className="clear-button"
                              to="#"
                              onClick={this.resetCoins}
                            >
                              View All {coinCount} Coins
                            </Link>
                          </p>
                        </div> */}
                        <p>
                          This buy now coins can be filtered by the following
                          categories:
                        </p>
                        <div className='auction-categories'>
                          <p>
                            <span>
                              <Link
                                to='#'
                                onClick={this.resetLots}
                                style={{ textTransform: 'capitalize' }}
                              >
                                All ({coinCount})<span>,&nbsp;</span>
                              </Link>
                            </span>
                            {categories.map(cat => {
                              return (
                                <span key={cat.category}>
                                  <Link
                                    to='#'
                                    onClick={() => {
                                      this.filterCategory(cat.category)
                                    }}
                                    style={{ textTransform: 'capitalize' }}
                                  >
                                    {cat.category} ({cat.count})
                                    <span>,&nbsp;</span>
                                  </Link>
                                </span>
                              )
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* 
                <section className="filter-section">
                  <div className="full-width__filters-holder ">
                    <div className="full-width__top-filters centered">
                      <div className="top-controls">
                        <div className="view-type filter">
                          <h2>view By</h2>
                          <ul className="catalogue-views">
                            <li>
                              <a
                                href="#"
                                className="grid "
                                data-gridtype="gridview"
                                id="gridviewlink"
                                onClick={this.toggleListView}
                              >
                                <img
                                  src={
                                    gridViewActive
                                      ? "/images/grid-dark-icon.png"
                                      : "/images/grid-icon.png"
                                  }
                                  alt="gridview"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="list active-gridtype"
                                data-gridtype="listview"
                                id="listviewlink"
                                onClick={this.toggleListView}
                              >
                                <img
                                  src={
                                    listViewActive
                                      ? "/images/list-dark-icon.png"
                                      : "/images/list-icon.png"
                                  }
                                  alt="gridview"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div
                          id="advanced-filter"
                          className="filter estimate-filter"
                        >
                          <h2>Estimate Range</h2>
                          <div className="slider-wrapper">
                            <div className="slider-low-estimate">
                              <span id="low-estimate-symbol">£</span>{" "}
                              <input
                                type="text"
                                id="slider_low_estimate"
                                defaultValue={20}
                              />
                            </div>
                            <div
                              id="slider-range"
                              className="left_lots_sliderrange ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                            >
                              <div
                                className="ui-slider-range ui-corner-all ui-widget-header"
                                style={{ left: 0, width: "100%" }}
                              />
                              <span
                                tabIndex="0"
                                className="ui-slider-handle ui-corner-all ui-state-default"
                                style={{ left: "0%" }}
                              />
                              <span
                                tabIndex="0"
                                className="ui-slider-handle ui-corner-all ui-state-default"
                                style={{ left: "100%" }}
                              />
                            </div>
                            <div className="slider-high-estimate">
                              <p className="high_estimate">
                                <span id="high-estimate-symbol">£</span>
                                <input
                                  type="text"
                                  id="slider_high_estimate"
                                  defaultValue={7000}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="sort-by" className="filter sort-by view-fil">
                          <h2>Sort By</h2>
                          <select
                            className="sorting ng-pristine ng-untouched ng-valid ng-not-empty"
                            ng-model="filters.sort_by"
                            ng-change="applyFilter();"
                          >
                            <option defaultValue="lot_number">
                              Lot number
                            </option>
                            <option defaultValue="high_low">
                              Est: High - Low
                            </option>
                            <option defaultValue="low_high">
                              Est: Low - High
                            </option>
                            <option defaultValue="cur_high_low">
                              Current Bid: High - Low
                            </option>
                            <option defaultValue="cur_low_high">
                              Current Bid: Low - High
                            </option>
                          </select>
                        </div>
                        <div
                          id="lots-per-page"
                          className="filter lots-per-page view-fil"
                        >
                          <h2>Lots Per Page</h2>
                          <select className="lots-per-page-select">
                            <option defaultValue="50">50 Lots</option>
                            <option> 100 Lots </option>
                          </select>
                        </div>
                        <div className="search-holder filter">
                          <h2>search</h2>
                          <input
                            type="text"
                            id="keyword"
                            name="keyword"
                            defaultValue=""
                            ng-model="filters.keyword"
                            filter-enter-search="getLots()"
                            placeholder="Search Here"
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                          />
                        </div>
                        <div
                          id="sort-by"
                          className="filter sort-by-mobile view-fil"
                        >
                          <h2>Sort By</h2>
                          <select
                            className="sorting ng-pristine ng-untouched ng-valid ng-not-empty"
                            ng-model="filters.sort_by"
                            ng-change="applyFilter();"
                          >
                            <option defaultValue="lot_number">
                              Lot number
                            </option>
                            <option defaultValue="high_low">
                              Est: High - Low
                            </option>
                            <option defaultValue="low_high">
                              Est: Low - High
                            </option>
                            <option defaultValue="cur_high_low">
                              Current Bid: High - Low
                            </option>
                            <option defaultValue="cur_low_high">
                              Current Bid: Low - High
                            </option>
                          </select>
                        </div>
                        <div
                          id="jump-to-lot"
                          className="filter jump-to-lot view-fil"
                        >
                          <h2>Jump to Lot</h2>
                          <input
                            type="text"
                            ng-model="lot_no"
                            filter-enter-search="jumpToLot(lot_no, 54);"
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                          />
                        </div>
                        <div className="filter reset-filter view-fil">
                          <a href="/auction">Reset</a>
                        </div>
                      </div>
                    </div>
                    <div className="full-width__bottom-filters centered">
                      <div className="full-width__bottom-filters-inside">
                        <div
                          id="jump-to-lot"
                          className="filter jump-to-lot view-fil"
                        >
                          <h2>Jump to Lot</h2>
                          <input
                            type="text"
                            defaultValue=""
                            ng-model="filters.search_lot_no"
                            filter-enter-search="applyFilter()"
                            placeholder="Enter lot number here"
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                          />
                        </div>

                        <div
                          id="categories-filter"
                          className="filter categories-filter view-fil"
                        >
                          <h2>Categories</h2>
                          <select name="catId" className="catId" id="category">
                            <option defaultValue="">Select Category</option>
                            {categories.map(cat => {
                              return (
                                <option
                                  ng-repeat="category in categories"
                                  defaultValue={cat.category}
                                >
                                  {cat.category}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </section> */}

                <div
                  className='top-pagination catalogue-pagination-holder'
                  style={{ display: 'none' }}
                >
                  <div className='full-width__filters__pagination__wrapper clearfix'>
                    <ul className='pagination' />
                  </div>
                </div>
                <div style={{ display: 'none' }} />

                <section
                  className='centered catalogue-wrapper'
                  id='catalogue-lots'
                >
                  {coinCount > 0 ? (
                    <div className='header-pagination'>
                      <div style={{ textAlign: 'center', margin: '20px auto' }}>
                        {/* <PaginationComponent
                          totalItems={coinCount}
                          pageSize={50}
                          onSelect={this.showPaginatedCoin}
                          maxPaginationNumbers={5}
                          activePage={1}
                        /> */}

                        <ReactPaginate
                          initialPage={1}
                          pageCount={Math.round(coinCount / 50) > 1 ? Math.round(coinCount / 50) : 1}
                          pageRangeDisplayed={10}
                          marginPagesDisplayed={5}
                          containerClassName='pagination'
                          pageLinkClassName='paginate mr-1 ml-1'
                          breakClassName='mr-1 ml-1'
                          pageClassName='page-item'
                          activeClassName='active'
                          activeLinkClassName='active'
                          // onPageChange={page => {
                          //   this._loadPage(page)
                          // }}
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {/* //show when lot is not empty */}
                  {}
                  <div
                    className='catalogue-view catalogue-list-view'
                    ng-show='sharedService.lotsCount > 0'
                    style={{}}
                  >
                    <ul id={gridType} className={`cf ${gridType}`}>
                      {/* <!-- ngRepeat: lot in lots  | filter:deletedFilter| filter:q | itemsPerPage: filters.lots_per_page --> */}
                      {coins.map(coin => {
                        return (
                          // <div key={coin.id}>
                          <BuyingCoin key={coin.id} coin={coin} />
                          // </div>
                        )
                      })}
                      {/* <!-- end ngRepeat: lot in lots  | filter:deletedFilter| filter:q | itemsPerPage: filters.lots_per_page --> */}
                    </ul>
                  </div>

                  {coinCount > 0 ? (
                    <div className='footer-pagination'>
                      <div style={{ textAlign: 'center', margin: '20px auto' }}>
                        {/* <PaginationComponent
                          totalItems={coinCount}
                          pageSize={50}
                          onSelect={this.showPaginatedCoin}
                          maxPaginationNumbers={5}
                          activePage={1}
                        /> */}

                        <ReactPaginate
                          initialPage={1}
                          pageCount={Math.round(coinCount / 50) > 1 ? Math.round(coinCount / 50) : 1}
                          pageRangeDisplayed={10}
                          marginPagesDisplayed={5}
                          containerClassName='pagination'
                          pageLinkClassName='paginate mr-1 ml-1'
                          breakClassName='mr-1 ml-1'
                          pageClassName='page-item'
                          activeClassName='active'
                          activeLinkClassName='active'
                          // onPageChange={page => {
                          //   this._loadPage(page)
                          // }}
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </section>
              </div>
              <div className='padded-inner ' />
            </div>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    buyingCoins: state.coins.buyingCoins
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBuyingCoins: payload => {
      dispatch(updateBuyingCoins(payload))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyNow)
