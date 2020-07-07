import React, { Component } from "react";
import {Helmet} from 'react-helmet';

class Mint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Helmet>
          <title> Mints of the ancient world - Atnumis </title>
        </Helmet>
        <div className="page cf">
          <div id="system-message-container" />

          <div className="cms-page-content cf" itemProp="articleBody" />

          <div className="item-page">
            <h1 style={{ margin: "20px 0", textAlign: "center" }}> Mint of the ancient world </h1>

            <p>
              Following the rapid Arab expansion in the late 7th century, the
              Muslim world was presided over by a Caliph. The Caliph was simply
              a successor to the Prophet, not a king or an emperor. None the
              less the Caliphs were de facto rulers. The territory being ruled
              over was vast, and as time went by, local rulers arose and
              disappeared, as well as rival claimants to the Caliphate. To
              western eyes, the whole period seems terribly confusing and
              chaotic. However, the European medieval period is probably just as
              confusing, with it's kings, dukes, counts and Popes. The pages
              below are an attempt to list all the rulers in the early period,
              and all major and minor dynasties that followed. The order mainly
              follows the listings in Stephen Album's "A Checklist of Islamic
              Coins". The dates given for each ruler or dynasty are the dates
              when coins were issued, unless more accurate information is known.
              An attempt has been made to show the geographic areas ruled over
              in terms of modern place names.
            </p>
          </div>

          <div className="padded-inner " style={{ marginBottom: "30px" }} />
        </div>
      </>
    );
  }
}

export default Mint;
