import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { postData } from '../http.service'
import Loading from './loading'

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: '',
      error: false,
      submitting: false,
      responseOkay: false,
      isLoading: false,
      content: ''
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitValuation = e => {
    e.preventDefault()
    this.setState({ submitting: true })
    let data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }
    postData('/contact-us', data).then(response => {
      this.setState({
        submitting: false,
        error: response.error
      })
      if (!response.error) {
        this.setState({ responseOkay: true })
      } else {
        this.setState({ errorMsg: response.message })
      }
    })
  }

  // componentDidMount () {
  //   fetchData('/page-content/contact-us').then((data) => {
  //     this.setState({content: data.content, isLoading: false})
  //   })
  // }

  render() {
    const mapStyles = {
      width: '500px',
      height: '300px'
    }

    const { content, isLoading } = this.state

    return isLoading ? (
      <Loading />
    ) : (
      <>
        <Helmet>
          <title> Contact us - Atnumis </title>
        </Helmet>
        <div className='contact'>
          <div className='page cf'>
            <div id='system-message-container' />

            <div className='cms-page-content cf' itemProp='articleBody' />

            <div className='full-article-image img-fulltext-left contact-banner'>
              <img src='/' alt='' />
            </div>
            <div className='item-page'>
              <p />
              <div className='moduletable'>
                <div
                  className='full-article-image img-fulltext-left contact-banner'
                  style={{ display: 'none' }}
                >
                  <img src='/' alt='' />
                </div>
                <div className='item-page'>
                  <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
                  <div className='contact-left'>
                    <h4>Get in touch with us</h4>
                    <p>
                      If you would like to know more information about Atnumis
                      Numismatics Limited, regardless of whether you are looking
                      to make a purchase, sell, browse through our extensive
                      holdings or to just make enquires, we invite you to visit
                      our London office. We respectfully request that all our
                      prospective visitors to contact us via a phone call or
                      email prior to their visit to confirm their appointment.
                    </p>

                    <p>
                      {/* 20 Fitzroy Square
                      <br />
                      London
                      <br />
                      W1T 6EJ
                      <br /> */}
                      United Kingdom
                    </p>
                    <p>
                      Tel:
                      <a href='tel:(+44) 7404300575' title='Telephone'>
                      (+44) 7404300575
                      </a>
                    </p>
                    <h4>Opening Times</h4>
                    {/* <p>
                      <p>Replaced by opening times (hard coded!)</p>
                    </p> */}
                    <div className='opening-times-container'>
                      <div className='opening-times-row'>
                        <p>
                          <span className='opening-time-day'>Monday:</span>
                          <span className='opening-time'>09:30 - 17:30</span>
                        </p>
                      </div>
                      <div className='opening-times-row'>
                        <p>
                          <span className='opening-time-day'>Tuesday:</span>
                          <span className='opening-time'>09:30 - 17:30</span>
                        </p>
                      </div>
                      <div className='opening-times-row'>
                        <p>
                          <span className='opening-time-day'>Wednesday:</span>
                          <span className='opening-time'>09:30 - 17:30</span>
                        </p>
                      </div>
                      <div className='opening-times-row'>
                        <p>
                          <span className='opening-time-day'>Thursday:</span>
                          <span className='opening-time'>09:30 - 17:30</span>
                        </p>
                      </div>
                      <div className='opening-times-row'>
                        <p>
                          <span className='opening-time-day'>Friday:</span>
                          <span className='opening-time'>09:30 - 17:30</span>
                        </p>
                      </div>
                      <div className='opening-times-row'>
                        <p>
                          <span className='opening-time-day'>
                            Saturday &amp; Sunday:
                          </span>
                          <span className='opening-time'>Closed</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='contact-right'>
                    <div style={{ width: '100%', height: '100%' }}>
                      <Map
                        google={this.props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{ lat: 47.444, lng: -122.176 }}
                      >
                        <Marker position={{ lat: 48.0, lng: -122.0 }} />
                      </Map>
                    </div>
                  </div>
                </div>
                <input
                  type='hidden'
                  id='address'
                  defaultValue='Atnumis address will be placed here'
                />
              </div>
              <p />
            </div>

            <div className='padded-inner ' />

            <div className='moduletable contact-form'>
              <div className='custom contact-form'>
                <form
                  id='form26'
                  className='wufoo topLabel page'
                  acceptCharset='UTF-8'
                  action='/index.php?option=com_valuation&amp;task=emailContact'
                  autoComplete='off'
                  encType='multipart/form-data'
                  method='post'
                  name='form26'
                >
                  <h2 style={{ textAlign: 'center' }}> Contact Us </h2>
                  <ul>
                    <ul>
                      <li id='foli1' className='notranslate'>
                        <input
                          id='Field1'
                          className='field text fn'
                          tabIndex='1'
                          name='name'
                          size='8'
                          type='text'
                          placeholder='Name'
                        />
                      </li>

                      <li id='foli5' className='notranslate'>
                        <input
                          id='Field5'
                          className='field text medium'
                          tabIndex='4'
                          maxLength='255'
                          name='email'
                          type='email'
                          defaultValue=''
                          placeholder='Email Address'
                        />
                      </li>
                      <li id='foli6' className='notranslate'>
                        <textarea
                          id='Field6'
                          className='field textarea medium'
                          tabIndex='5'
                          spellCheck='true'
                          cols='50'
                          name='message'
                          rows='5'
                          placeholder='Enter Your Query Here...'
                        />
                      </li>
                    </ul>
                  </ul>

                  <ul>
                    <li className='buttons '>
                      <input
                        id='saveForm'
                        className='btTxt submit'
                        name='saveForm'
                        type='submit'
                        defaultValue='Submit'
                      />
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDSgA6QSBVxJ-ZDy_xHG4vtrT65l4PGG8c'
})(Contact)
