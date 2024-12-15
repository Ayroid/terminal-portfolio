import React, { useMemo } from "react";

const LinkedInCommand: React.FC = () => {
  useMemo(() => {
    const openLinkedIn = () => {
      window.open(
        "https://www.linkedin.com/in/ayroid/",
        "_blank"
      );
    };

    openLinkedIn();
  }, []);

  return null;
};

export default LinkedInCommand;
