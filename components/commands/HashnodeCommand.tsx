import React, { useMemo } from "react";

const HashnodeCommand: React.FC = () => {
  useMemo(() => {
    const openLinkedIn = () => {
      window.open("https://ayroid.hashnode.dev/", "_blank");
    };

    openLinkedIn();
  }, []);

  return null;
};

export default HashnodeCommand;
