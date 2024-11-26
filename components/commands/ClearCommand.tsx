import { useCommandLineHistory } from "@/store/commandLineHistoryStore";
import { useEffect } from "react";

const ClearCommand = () => {
  const { clearHistory } = useCommandLineHistory((state) => state);
  useEffect(() => {
    clearHistory();
  }, [clearHistory]);
  return null;
};

export default ClearCommand;
