import React, { Component } from "react";
import PropTypes from "prop-types";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { message } = this.props;
    return (
      <>
        <div
          className="loading-text"
          style={{
            marginBottom: "200px",
            fontSize: "50px",
            textAlign: "center",
            color: "#4d4d4d"
          }}
        >
          <img src="" />
          <img src="" />
          <div
            className=""
            style={{
              background: "url( /images/homepage-background.jpg ) no-repeat"
            }}
          />
          <p>Loading... </p>
          <p>
            <span> {message} </span>
          </p>
        </div>
      </>
    );
  }
}

// BidModal.propTypes = {
//   show: PropTypes.bool.isRequired
// };

export default Loading;
