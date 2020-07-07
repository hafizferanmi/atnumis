import React, { Component } from "react";
import { connect } from 'react-redux';
import { userLogout } from '../actions/user.action';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.logOut();
  }

  render() {
    return (
      <>
        Logging you out. This wiil take some times. Clearing cache and all
        workspace.
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => { dispatch(userLogout()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
