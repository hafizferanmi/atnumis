import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { closeBidModal } from "../actions/bidModal.action";
import { postData } from "../http.service";

class BidModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidAmmount: 0,
      bidError: false,
      bidErrorMsg: "",
      bidResponseError: false,
      bidResponseMsg: "",
      bidProcessing: false
    };
  }

  toggleBidModal = () => {
    this.props.closeBidModal();
  };

  bidAmmountOnChange = e => {
    this.setState({ bidAmmount: e.target.value });
  };

  placeBidOnCoin = data => {
    postData("/place-bid", data).then(response => {
      this.setState({
        bidProcessing: false,
        bidResponseError: true,
        bidResponseMsg: response.message
      });
      if (!response.error) {
        //close the modal
        setTimeout(() => {
          this.toggleBidModal();
        }, 2000);
      }
    });
  };

  placeBid = coin => {
    let ammount = this.state.bidAmmount;

    if(!coin.active){
      this.setState({
        bidError: true,
        bidErrorMsg: "Coin has been withdrawn. Place bid on other coins."
      });
      return false;
    }

    if (isNaN(ammount)) {
      return false;
    }

    if (isNaN(parseInt(coin.currentBid))) {
      var currentBid = 0;
    } else {
      var currentBid = coin.currentBid;
    }

    if (ammount <= parseInt(coin.minBid)) {
      this.setState({
        bidError: true,
        bidErrorMsg: "Your bid is less than the minimum bid"
      });
      return false;
    } else {
      if (ammount > parseInt(currentBid)) {
        let data = {
          ammount,
          coin_id: coin.coin_id,
          username: this.props.user.userDetails.username
        };
        this.setState({ bidProcessing: true });
        this.placeBidOnCoin(data);
      } else {
        this.setState({
          bidError: true,
          bidErrorMsg: "Someone has placed bid over your ammount"
        });
        return false;
      }
    }
  };

  render() {
    const {
      bidModal: { isBidModalOpen, coinDetails }
    } = this.props;

    const {
      bidError,
      bidErrorMsg,
      bidProcessing,
      bidResponseError,
      bidResponseMsg
    } = this.state;
    return (
      <>
        <div>
          <Modal
            isOpen={isBidModalOpen}
            toggle={this.toggleBidModal}
            className={this.props.className}
          >
            <ModalBody>
              <div className="overlay-content">
                <div id="bidding-box-full" className="change-bid-overlay">
                  <h2 className="" style={{fontWeight: 'bold', fontSize: '30px'}}>Place your bid</h2>

                  {/* <!-- Estimate --> */}
                  {/* <div className="lot-estimate">
                    <p className="estimate-title">Estimate:</p>
                    <span className="estimate-text">
                      <span className="pound">£{coinDetails.minBid}</span>
                      <span className="dollar">$32</span>
                      <span className="euro">€29</span>
                    </span>
                  </div> */}

                  <div className="lot-estimate">
                    <p className="estimate-title">
                      Estimate: £{coinDetails.minBid}
                    </p>
                  </div>

                  {/* <!-- Current Bid --> */}
                  <div className="lot-estimate">
                    <p className="estimate-title">
                      Current Bid: £
                      {coinDetails.currentBid || coinDetails.minBid}
                    </p>
                  </div>

                  {/* <div className="lot-estimate">
                    <p className="estimate-title">Current Bid:</p>
                    <p className="estimate-text">
                      <span className="pound">£{coinDetails.currentBid}</span>
                      <span className="dollar">$26</span>
                      <span className="euro">€23</span>
                    </p>
                  </div> */}

                  {/* <!-- Bid Amount --> */}
                  <div className="bid-" style={{ paddingTop: '50px' }}>
                    {/* <div className="bid-amou"  style={{marginTop: '40px'}}>
                      <h5>Bid Amount</h5>
                    </div> */}

                    <div
                      className="bid-amount-input"
                      style={{ margin: "10px auto" }}
                    >
                      {/* <span className="currency-symbol">£</span> */}
                      <input
                        className="bid-amount-input"
                        type="text"
                        min="1"
                        placeholder="Bid ammount"
                        id="bid-amount"
                        onFocus={() => {
                          this.setState({
                            bidError: false,
                            bidResponseError: false
                          });
                        }}
                        onChange={this.bidAmmountOnChange}
                      />
                    </div>

                    {!bidProcessing ? (
                      <div
                        className="bid-submit centered"
                        style={{ margin: "0px auto" }}
                      >
                        <input
                          onClick={() => {
                            this.placeBid(coinDetails);
                          }}
                          type="submit"
                          value="Place Bid"
                          className="button submit-bids-btn place-bid-gs"
                        />
                      </div>
                    ) : (
                      <div className="bid-submit">
                        <input
                          type="submit"
                          value="Processing"
                          className="button submit-bids-btn place-bid-gs"
                        />
                      </div>
                    )}

                    {bidError ? (
                      <div className="bid-error" style={{ margin: "20px 0" }}>
                        <p className="error-message alert alert-danger">
                          {" "}
                          {bidErrorMsg}{" "}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}

                    {bidResponseError ? (
                      <div className="bid-error" style={{ margin: "20px 0" }}>
                        <p className="error-message alert alert-danger">
                          {" "}
                          {bidResponseMsg}{" "}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="pre-bid-information">
                    {/* <p className="bids-currency">
                      * All bids are placed in GBP.
                    </p> */}
                    <p className="bids-maximum">
                      Please enter your maximum bid as a whole number without
                      decimal places, e.g. 100 or 1000.
                    </p>
                    <p className="bids-legal">
                      By entering a bid in this auction you are entering a
                      legally binding contract to purchase this lot. Bidding
                      constitutes acceptance of the{" "}
                      <Link
                        to="/terms-and-conditions"
                        title="Terms and Conditions"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      of sale as laid out on the Bidding Information page of
                      this website, or in the{" "}
                      <Link to="/terms-and-conditions" title="Terms Of Sale">
                        Terms of Sale
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </>
    );
  }
}

// BidModal.propTypes = {
//   show: PropTypes.bool.isRequired
// };

const mapStateToProps = state => {
  return {
    bidModal: state.bidModal,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeBidModal: () => {
      dispatch(closeBidModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidModal);
