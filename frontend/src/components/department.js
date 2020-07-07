import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {Link} from 'react-router-dom';

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const imgStyle = {
      width: '185px',
      height: '100%'
      // maxWidth: '100%'
      
    }
    return (
      <>
      <Helmet>
          <title> Departments - Atnumis </title>
      </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <div className="cms-page-content cf" itemProp="articleBody" />


          <div className="item-page">
            <h1 style={{margin: '20px 0', textAlign: 'center'}}>Departments</h1>

            {/* <!-- START: Modules Anywhere --> */}
            <div className="departments-main-page-holder">
              <Link
                to="/department/celtic"
                alt="Spanish and Celtic"
                style={{ padding: '20px 0' }}
              >
                <div className="departments-block cf" style={{ border: '3px solid #4d4d4d' }}>
                  <div className="departments-block__container cf">
                    <div className="departments-block__left" >
                      <img
                        style={imgStyle}
                        alt="Spanish and Celtic"
                        src="/images/dept/celtic.png"
                        title="Spanish and Celtic"
                      />
                    </div>
                    <div className="departments-block__right">
                      <div className="departments-block__right__text">
                        <h4 className='dept-title-styled' >Spanish and Celtic</h4>
                        {/* <p>Find out more</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to="/department/greek"
                alt="Greek, Judaean, Parthian &amp; Sassanid"
              >
                <div className="departments-block cf" style={{ border: '3px solid #4d4d4d'}}>
                  <div className="departments-block__container cf">
                    <div className="departments-block__left">
                      <img
                      style={imgStyle}

                        alt="Greek, Judaean, Parthian &amp; Sassanid"
                        src="/images/dept/Greek.png"
                        title="Greek, Judaean, Parthian &amp; Sassanid"
                      />
                    </div>
                    <div className="departments-block__right">
                      <div className="departments-block__right__text">
                        <h4 className='dept-title-styled'>Greek, Judaean, Parthian &amp; Sassanid</h4>
                        {/* <p>Find out more</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/department/roman" alt="Roman">
                <div className="departments-block cf" style={{ border: '3px solid #4d4d4d'}}>
                  <div className="departments-block__container cf">
                    <div className="departments-block__left">
                      <img
                      style={imgStyle}

                        alt="Roman"
                        src="/images/dept/Roman.png"
                        title="Roman"
                      />
                    </div>
                    <div className="departments-block__right">
                      <div className="departments-block__right__text">
                        <h4 className='dept-title-styled'>Roman</h4>
                        {/* <p>Find out more</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to="/department/byzanite"
                alt="Byzantine and Migration Period"
              >
                <div className="departments-block cf" style={{ border: '3px solid #4d4d4d'}}>
                  <div className="departments-block__container cf">
                    <div className="departments-block__left">
                      <img
                        style={imgStyle}
                        alt="Byzantine and Migration Period"
                        src="/images/dept/Byzantine.png"
                        title="Byzantine and Migration Period"
                      />
                    </div>
                    <div className="departments-block__right">
                      <div className="departments-block__right__text">
                        <h4 className='dept-title-styled'>Byzantine and Migration Period</h4>
                        {/* <p>Find out more</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to="/department/islamic"
                alt="Islamic"
              >
                <div className="departments-block cf" style={{ border: '3px solid #4d4d4d'}}>
                  <div className="departments-block__container cf">
                    <div className="departments-block__left">
                      <img
                      style={imgStyle}

                        alt="Islamic"
                        src="/images/dept/Islamic.png"
                        title="Islamic"
                      />
                    </div>
                    <div className="departments-block__right">
                      <div className="departments-block__right__text">
                        <h4 className='dept-title-styled'>Islamic</h4>
                        {/* <p>Find out more</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to="/department/medieval"
                alt="Medieval and Modern"
              >
                <div className="departments-block cf" style={{ border: '3px solid #4d4d4d'}}>
                  <div className="departments-block__container cf">
                    <div className="departments-block__left">
                      <img
                      style={imgStyle}

                        alt="Medieval and Modern"
                        src="/images/dept/Medieval-and-Modern.png"
                        title="Medieval and Modern"
                      />
                    </div>
                    <div className="departments-block__right">
                      <div className="departments-block__right__text">
                        <h4 className='dept-title-styled'>Medieval and Modern</h4>
                        {/* <p>Find out more</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* <!-- END: Modules Anywhere --> */}
          </div>

          <div className="padded-inner " />
        </div>
      </>
    );
  }
}

export default Department;
