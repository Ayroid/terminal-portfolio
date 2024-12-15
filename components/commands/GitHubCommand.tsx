import React, { useMemo } from "react";

const GitHubCommand: React.FC = () => {
  useMemo(() => {
    const openLinkedIn = () => {
      window.open("https://github.com/Ayroid", "_blank");
    };

    openLinkedIn();
  }, []);

  return null;
};

export default GitHubCommand;
