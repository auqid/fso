import React from "react";
import "../index.css";
const Notification = ({ message }) => {
  if (message === null || message === "") {
    return;
  }

  return <div className="notificationSuccess">{message}</div>;
};

export default Notification;
