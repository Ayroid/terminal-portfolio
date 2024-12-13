// This commands opens a link on a new tab to the LinkedIn profile of the user

import React from "react";

const LinkedInCommand: React.FC = () => {
  const openLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/ayroid/",
      "_blank"
    );
  };

  openLinkedIn();

  return null;
};

export default LinkedInCommand;
