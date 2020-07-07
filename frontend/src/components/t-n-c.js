import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { closeBidModal } from '../actions/bidModal.action'
import { connect } from 'react-redux'

class Tnc extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.closeBidModal()
  }

  render() {
    return (
      <>
        <Helmet>
          <title> Terms and Condition - Atnumis </title>
        </Helmet>
        <div className='page cf'>
          <div id='system-message-container' />

          <div className='cms-page-content cf' itemProp='articleBody' />

          <div className='item-page'>
            <h1 style={{ margin: '20px 0', textAlign: 'center' }}>
              Terms &amp; Conditions
            </h1>

            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                The following terms and conditions apply to auctions held by
                Atnumis Numismatics:
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                I. All auctions and evaluations are conducted in US DOLLAR.
                Every successful bidder has devoted himself directly to the
                purchase attained and cannot claim to have acted on behalf of a
                third party.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                II. The opening bids will be starting price or 80% of the quote
                except if there are existing higher bids. There will be a 20%
                Buyer’s Fee (for Printed Auctions) or a 18.5% Buyer's Fee (for
                Electronic Auctions) will be added to the hammer price, this
                includes VAT.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                III. VAT at 20% (applicable to clients inside the UK and EU) is
                expected on the Buyer’s Fee only, not the hammer price.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                IV. Atnumis Numismatics isn't in charge or responsible of any
                missed offers or bids as a result of system speed or down-time
                or because of any misconception with respect to the bidder.
              </span>
            </p>
            <p
              className='MsoNormal'
              style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}
            >
              <span
                style={{ fontSize: '10.5pt', fontFamily: 'Times New Roman' }}
              >
                V. The burden of proof lies with the buyer. The auctioneer
                assures the absolute, complete and unconditional authenticity of
                any and all coins sold. There is absolutely no expiration to
                this assurance. A full refund of purchase price will be given
                back to the buyer if the coins sold is found no to be authentic.
                In case of a disagreement on the genuineness of a coin between
                the buyer and the auction house, only a verdict from the IAPN
                will be acknowledged. Buyers who have examined the genuineness
                of the lots prior to the auction, will not be allowed any return
                benefits.
              </span>
            </p>
            <p
              className='MsoNormal'
              style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}
            >
              &nbsp;
            </p>
            <p
              className='MsoNormal'
              style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}
            >
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                VI. The title of the merchandise remains with the proprietor
                until such time as the customer has paid in full the required
                purchase price and other different charges levied on the goods.
                Atnumis Numismatic reserves all authority to consider the sale
                incomplete or inadequate and to resell the goods and the bidder
                agrees to pay for the reasonable cost of such a sale. The bidder
                is also additionally accountable for the contrast between the
                underlying sale and the resale should the last one result in a
                lesser hammer price.
              </span>
            </p>
            <p
              className='MsoNormal'
              style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}
            >
              &nbsp;
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                VII. Regardless of whether it was submitted through the Atnumis
                Numismatics website or some different methods, Absentee bids
                must be submitted ahead of time should be gotten by 20:00 on the
                day preceding the auction at the latest. It is the bidder's duty
                and responsibility to guarantee that bids have been gotten by
                Atnumis Numismatics.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                VIII. All evaluations, portrayals and irregularity data are the
                assessment of the cataloguer. States of all lots are according
                to the photos shown on the Atnumis Numismatics website;
                condition reports are accessible upon solicitation. It is beyond
                the realm of imagination to expect to take note all things
                considered or deformities, and in this way clients are urged to
                painstakingly inspect face to face all parts that they are keen
                on bidding on. The auctioneer does not ensure acknowledgment of
                any lot by any outsider evaluating administration; dismissal
                under any circumstances by any outsider reviewing administration
                won't without anyone else's input comprise justification for
                return. Cases for return on the grounds of non-legitimacy must
                be upheld by substantial specialized proof given by in any event
                2 separate qualified firms or people. Offers, when set, are
                conclusive and won't be cancelled. In the event that a thing
                portrayal is observed to be inaccurate, the thing is returnable
                inside 21 days after the deal. No different returns will be
                acknowledged with the exception of on the grounds of
                non-authenticity. Every single planned bidder who exercise the
                chance to look at parcels close by will accept all
                accountability for any harm they cause in this manner. The
                auctioneer will have sole attentiveness in deciding the
                estimation of the harm caused, which will be quickly paid by the
                forthcoming bidder.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                IX. The auctioneer will have absolute discretion to accept or
                decline any bid, withdraw lots from sale at any time until such
                point as the purchaser takes physical possession, re-open any
                lot, even after the hammer has fallen, in which a bidding error
                has occurred, and to determine in the event of a dispute, the
                final winner of a lot or to rescind the sale and put the lot up
                for sale again.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                X. For the security of mail or absentee bidders, no ‘unlimited’
                or ‘buy’ bids will be acknowledged. At any point when
                indistinguishable offers are gotten for a similar or the same
                lot, preference will be given to the bid received first. A bid
                received via mail will take preference over a floor bid.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                XI. The customer is responsible for paying all bank charges and
                shipping and insurance costs.&nbsp;
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                XI. Only Atnumis Numismatics enlisted bidders can partake in the
                auction. Bidders must enrol in any event two days before the
                beginning of the auction in order for Atnumis Numismatics to
                confirm their references. Some lots may carry a reserve. The
                auctioneer holds the privilege not to sell an item below
                classified price, or will repurchase the item for the benefit of
                the consignor or for the records of Atnumis Numismatics Ltd. If
                a reserve exists, the auctioneer maintains all authority to bid
                on any lot in the best interest of the consignor up to the
                amount of the reserve against any floor or mail bidders. The
                auctioneer additionally maintains all authority to bid on any
                lot on behalf of Atnumis Numismatics Ltd.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                XII. Invoices are expected promptly upon receipt. Atnumis
                Numismatics Ltd. Maintains all authority to charge enthusiasm on
                unpaid invoices at the rate of 2% per schedule month, aside from
                where earlier agreement has been made with respect to payment
                plans.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                XIII. The customer is responsible for paying all bank charges
                and shipping and insurance costs.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                XIV. A 2% extra charge will be applied to bids submitted through
                post or email, as supposed to place on the Atnumis Numismatics
                website, for an Electronic Auction. Should live internet bidding
                be accessible via a third-party for a Printed Auction.
              </span>
            </p>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                XV. By making an offer the client consents to the above terms
                and conditions and acknowledges to be bound by them. These
                conditions will produce results and be translated as per the
                arrangement of English Law. English law is applicable and any
                dispute will be settled under the watchful eye of an English
                court.
              </span>
            </p>

            <h2>
              <strong>
                <span
                  style={{ fontFamily: 'Times New Roman', fontSize: '16px' }}
                >
                  YOUR RIGHTS:
                </span>
              </strong>
            </h2>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                Concerning your personal data and information, you have the
                following rights: <br /> • Request of access to personal data and
                information. <br />
                • Request alteration or deletion of Personal data and
                information. <br />
                • Request for limitation. <br />
                • Right to data compactness. <br />
                • Withdrawal of consent given <br />
              </span>
            </p>

            <h2>
              <strong>
                <span
                  style={{ fontFamily: 'Times New Roman', fontSize: '16px' }}
                >
                  US AND GERMAN COIN IMPORT LIMITATIONS
                </span>
              </strong>
            </h2>
            <p
              className='MsoNormal'
              style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}
            >
              <span
                style={{ fontSize: '10.5pt', fontFamily: 'Times New Roman' }}
              >
                Atnumis Numismatics ethical and responsible commitment
                provenance guarantees that the consignor confirms each and every
                auction lot as their legal possessions to sell, and where
                cultural property limitation may exist, that it meets the
                obligations to be lawfully imported into the United States
                and/or Germany. Any coins/medal that fall under US and/or German
                import limitations in this sales but may still be lawfully
                imported into the US and/or Germany are convoyed by
                documentation verifying that they were independent of the source
                country prior to the date of effect, or are convoyed by a valid
                export certificate issued by the country of origin, and/or are
                contractually confirmed by the consignor as being legally
                eligible for import into the US or Germany and/or are
                accompanied by a UAE export certificate. Be aware that obtaining
                these papers may delay shipping. ‘Not suitable for US and German
                market’ will be clearly written in order to noticeably
                distinguish coins subjected to the US and German import
                limitations in other to avoid illegal importation into these
                countries. Bear in mind that we will make every possible
                endeavour to make sure that our clients in those subjected areas
                are affected by the limitation in the minimum possible way and
                we vow to carry out on behalf of our clients all the required
                procedures necessary for importation.
              </span>
            </p>
            <p
              className='MsoNormal'
              style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}
            >
              &nbsp;
            </p>
            <p
              className='MsoNormal'
              style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}
            ></p>
            <p
              className='MsoNormal'
              style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}
            >
              &nbsp;
            </p>

            <h2>
              <strong>
                <span
                  style={{ fontFamily: 'Times New Roman', fontSize: '16px' }}
                >
                  SHIPPING
                </span>
              </strong>
            </h2>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                • Shipping risks will be fully bared by the buyer. <br />
                • The buyer’s goods will bare all the shipping charges. <br />•
                Shipping details and instructions must be given in time. <br />
                • The goods are shipped in agreement to the postal guidelines or
                by special service if required by the buyer or the insurance
                company. <br />
                • Delivery of goods will be made to the address provided by the
                buyer. <br />
              </span>
            </p>

            <h2>
              <strong>
                <span
                  style={{ fontFamily: 'Times New Roman', fontSize: '16px' }}
                >
                  PAYMENT METHODS
                </span>
              </strong>
            </h2>
            <p>
              <span style={{ fontFamily: 'Times New Roman', fontSize: '14px' }}>
                We offer these methods of payment guaranteeing maximum safety.
                Invoices can found listed under 'Pending Invoices' in the 'My
                Account' segment of the website. All payments should be paid
                directly through our website by selecting the preferred payment
                option of BACS, PayPal or Credit and Debit cards (Carte Bleue,
                Visa card, Eurocard and MasterCard). Cheque and Cash payment is
                available for UK, USA, UAE customers only. If you prefer a
                payment by cheque, note that the order will be administered only
                when the cheque is received and the time limit will run
                accordingly. Atnumis Numismatics Limited will under no
                circumstances ask you to send your financial information (credit
                card number, pin and expiry date) by e-mail. If you ever receive
                an e-mail of this kind, we invite you to contact us immediately
                for further clarification.
              </span>
            </p>
          </div>

          <div className='padded-inner ' />
        </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  closeBidModal: () => dispatch(closeBidModal())
})

export default connect(
  null,
  mapDispatchToProps
)(Tnc)
