// This commands opens a link on a new tab to the LinkedIn profile of the user

import React from "react";

const HashnodeCommand: React.FC = () => {
  const openLinkedIn = () => {
    window.open(
      "https://ayroid.hashnode.dev/",
      "_blank"
    );
  };

  openLinkedIn();

  return null;
};

export default HashnodeCommand;
