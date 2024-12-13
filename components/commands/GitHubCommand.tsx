// This commands opens a link on a new tab to the LinkedIn profile of the user

import React from "react";

const GitHubCommand: React.FC = () => {
  const openLinkedIn = () => {
    window.open(
      "https://github.com/Ayroid",
      "_blank"
    );
  };

  openLinkedIn();

  return null;
};

export default GitHubCommand;
