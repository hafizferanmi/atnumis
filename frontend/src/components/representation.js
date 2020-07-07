import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Loading from './loading'
import { fetchData } from '../http.service'

class Rep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      content: ''
    }
  }

  // componentDidMount () {
  //   fetchData('/page-content/auction-representation').then((data) => {
  //     this.setState({content: data.content, isLoading: false})
  //   })
  // }

  render() {
    return (
      // this.state.isLoading ? <Loading /> :
      <>
        <Helmet>
          <title>Auction Representation - Atnumis</title>
        </Helmet>
        <div className='page cf'>
          <div id='system-message-container' />

          <div className='cms-page-content cf' itemProp='articleBody' />

          <div className='item-page'>
            <h1 style={{ margin: '20px 0', textAlign: 'center' }}>
              Auction Representation{' '}
            </h1>

            <div
              style={{
                background: 'url( /images/rep-bck.jpg ) no-repeat',
                backgroundSize: '100% 100%',
                padding: '50px',
                marginBottom: '30px'
              }}
            >
              <div
                style={{ background: 'rgba(255,255,255,.8)', padding: '50px' }}
              >
                <p>
                  Atnumis takes interest in all major numismatic auctions around
                  the world, in this way we can execute customers’ bids
                  tactfully and effectively, clients can count on having a
                  stress-free experience with us. Our portrayal administration
                  incorporates nitty gritty condition provides details regarding
                  any coins important to our customers, taking note all things
                  considered or traits of a coin that may not be recognizable or
                  noticeable from an inventory or online picture. All coins are
                  analysed at 10x and 45x magnification to decide surface
                  conditions, the nature of any imprints or defects, and the
                  visual characteristics of the piece.
                </p>
                <p>
                  Our specialists cautiously guide customers from the planning
                  phases of surveying auction lots, providing purchase guidance
                  to the final culmination of representation at the live
                  auction. We can prompt on a suggested bidding levels put
                  together with respect to quality, but also taking into account
                  market activities, historical prices and interest. We can
                  prudently and reasonably place clients' absentee bids that are
                  given to us ahead of time, and we additionally offer a live
                  telephone bidding service for clients who prefer to bid live.
                </p>
                <p>
                  Atnumis has rapidly earned a reputation for choosing coins of
                  the most elevated qualities quality, and we are contented to
                  put our demanding measures available to you to aid the
                  screening of coins offered at auction to guarantee that each
                  and every coin purchased is a precious gem, not a source of
                  dissatisfaction.
                </p>
                <p style={{ marginBottom: '10px' }}>
                  Our standard commission rates are:
                </p>
                <ul style={{ liststyle: 'disc' }}>
                  <li>
                    5% on the first $1 - $50,000 of the invoice total (excluding
                    fees and charges); thereafter:
                  </li>
                  <li>
                    3% on the next $50,000 - $100,000 of the invoice total;
                    thereafter:
                  </li>
                  <li>2.5% of the invoice total over $100,000</li>
                </ul>
                <p>
                  <p>
                    Specialist/Broker cooperation is welcome and acknowledged at
                    our auction events. We are aware that you may have access to
                    buyers and we need to reward you for bringing them to our
                    deals. Truth be told, a noteworthy commission can be
                    received just by enrolling a bidder that buys. Our
                    philosophy for buyers is the more knowledgeable, the better
                    the buyer. Information guarantees a smooth closing for all
                    everybody. By reaching us, you have more options available
                    providing the best possible service for your buyer.
                  </p>
                  Please{' '}
                  <Link title='Contact Us' to='/contact-us'>
                    contact us
                  </Link>{' '}
                  for more information.
                </p>
              </div>
            </div>
          </div>

          <div className='padded-inner logged-in' />
        </div>{' '}
      </>
    )
  }
}

export default Rep
