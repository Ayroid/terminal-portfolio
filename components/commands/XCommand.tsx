import React, { useMemo } from "react";

const XCommand: React.FC = () => {
  useMemo(() => {
    const openLinkedIn = () => {
      window.open("https://x.com/ayroids", "_blank");
    };

    openLinkedIn();
  }, []);

  return null;
};

export default XCommand;
