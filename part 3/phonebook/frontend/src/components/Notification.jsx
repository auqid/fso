import React from "react";
import "../index.css";

const Notification = ({ message, type }) => {
  if (message === null || message === "") {
    return null;
  }

  const className =
    type === "error" ? "notificationError" : "notificationSuccess";

  return <div className={className}>{message}</div>;
};

export default Notification;
