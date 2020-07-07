import React, { Component } from "react";

class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      buttonStatus: true
    };
  }

  toggleButtonStatus = () => {
    this.setState(prevState => ({
      buttonStatus: !prevState.buttonStatus
    }));
  };

  incrementCount = () => {
    let { count } = this.state;
    count++;
    this.setState({ count });
  };

  render() {
    const buttonStyle = {
      color: "white",
      backgroundColor: "red"
    };

    const { count, buttonStatus } = this.state;
    return (
      <>
        <button style={buttonStyle} onClick={this.toggleButtonStatus}>
          {buttonStatus ? this.props.onChildren : this.props.offChildren}
        </button>
        <button style={buttonStyle} onClick={this.incrementCount}>
          {count}
        </button>
      </>
    );
  }

  static defaultProps = {
    offChildren: "Off",
    onChildren: "On"
  };
}

export default MyClass;
