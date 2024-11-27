import { useCurrentPath } from "@/store/currentPathStore";

const PwdCommand: React.FC = () => {
  const { currentPath } = useCurrentPath((state) => state);
  return <div>{currentPath}</div>;
};

export default PwdCommand;
