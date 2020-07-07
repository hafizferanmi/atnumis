import React, { Component } from "react";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class Notification extends Component {


  // componentWillMount() {
  //   this.createNotification("error");
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.createNotification(nextProps.type);
  // }

  render() {
    return (
      <>
        <div>
          {/* <button
            className="btn btn-info"
            onClick={this.createNotification("info")}
          >
            Info
          </button> */}
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default Notification;
