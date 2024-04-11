import React from "react";

const HandleNotification = ({ setNotification }, message) => {
  setNotification(message);
  setTimeout(() => {
    setNotification(null);
  }, 1500);
};

export default HandleNotification;
