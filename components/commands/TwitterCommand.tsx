import React, { useMemo } from "react";

const TwitterCommand: React.FC = () => {
  useMemo(() => {
    const openLinkedIn = () => {
      window.open("https://x.com/ayroids", "_blank");
    };

    openLinkedIn();
  }, []);

  return null;
};

export default TwitterCommand;
