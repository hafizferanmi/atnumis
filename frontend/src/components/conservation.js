import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

class Conservation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Conservation Service - Atnumis</title>
        </Helmet>
        <div className='page cf'>
          <div id='system-message-container' />

          <div className='cms-page-content cf' itemProp='articleBody' />

          <div className='item-page'>
            <h1 style={{ margin: '20px 0', textAlign: 'center' }}>
              Conservation Service
            </h1>

            <div
              style={{
                background: 'url( /images/conserv-bck.jpg ) no-repeat',
                backgroundSize: '100% 100%',
                padding: '50px',
                marginBottom: '30px'
              }}
            >
              <div
                style={{ background: 'rgba(255,255,255,.8)', padding: '50px' }}
              >
                <p>
                  By prudence of their having been exposed to normally occurring
                  such as substances in the ground, air and water, basically all
                  antiquated coin pieces require a more prominent or lesser
                  level of protection eventually in their collectable life, be
                  it at the hour of being found or in fact decades later.
                </p>
                <p>
                  Preservation might be required to remove active deterioration
                  (as on account of bronze disease) or unattractive substance
                  build-ups because of capacity in pvc based plastic holders.
                  Protection may likewise be embraced to evacuate normally
                  occurring coatings that darken significant detail. Evacuation
                  of copper based mixes or silver chloride are standard methods
                  on bronze and silver coins.
                </p>
                <p>
                  {/* If you would like to discuss conservation of a coin in your
                  collection, please{' '}
                  <a title='contact us' href='/general/contact-us'>
                    contact us
                  </a>{' '}
                  or call us on{' '}
                  <a title='Contact mobile' href='tel:+44 (0)20 7121 6518'>
                    +44 (0)20 7121 6518.
                  </a> */}
                  In the event that you might want to talk about protection of a
                  coin piece in your gathering, if you don't mind get in touch
                  with us or email us at info@atnumis.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Conservation
