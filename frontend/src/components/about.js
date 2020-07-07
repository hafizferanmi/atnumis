import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { fetchData } from '../http.service'
import Loading from './loading'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      about: '',
      isLoading: true
    }
  }

  // componentWillMount () {
  //   fetchData('/page-content/about-us').then((data) => {
  //     this.setState({about: data.content, isLoading: false})
  //   })
  // }

  render() {
    // const {about, isLoading} = this.state
    return (
      // isLoading ? <Loading /> :
      <>
        <Helmet>
          <title> About Us - Atnumis </title>
        </Helmet>
        <div className='page cf'>
          <div id='system-message-container' />

          <div className='cms-page-content cf' itemProp='articleBody' />

          <div className='item-page'>
            <h1 style={{ margin: '20px 0', textAlign: 'center' }}>About Us</h1>
            <p>
              Atnumis Numismatics Limited is a premier auction house for ancient
              coins and has become a top numismatic company in the UK. Over the
              years Atnumis Numismatic Limited have earned collectors’ trust by
              unconditionally guaranteeing the authenticity of our coins. We
              also host world class auctions of modern coinage, and through our
              network of consultants and comrades we are able to successfully,
              efficiently and thoroughly catalogue and describe coinage of all
              era and regions including Celtic, medieval and Islamic coinages,
              focusing on personal service enabling both our consignors and
              bidders an excellent choice for coins, ancient tokens, historical
              medals and rare pieces. Throughout our years at the top, we have
              developed a dedicated global client base of collectors, bidders,
              collectors and dealers.
            </p>
            <br />
            <p>
              Atnumis Numismatics has nurtured and built up a reputable name and
              standard for offering rare and high quality coins for our
              distinguished collectors, presented in catalogues produced to the
              very best standard that respectably suit our consignors'
              properties in the most effective doable way of increasing and
              maximizing the potential of their sales.
            </p>{' '}
            <br />
            <p>
              Atnumis Numismatics team of experts meets regularly with
              collectors and we hold a minimum of two public auctions per annum
              in Spring and Autumn at the famous Cavendish Hotel. We also host
              ten electronic auctions per annum on our website which makes it
              easy and convenient to browse upcoming auctions and bid on lots
              that interest you. The site has been designed with a clean, easy
              to understand layout and features for the collectors to enjoy.
            </p>
          </div>

          <div className='padded-inner ' style={{ marginBottom: '30px' }} />
        </div>
      </>
    )
  }
}

export default About
