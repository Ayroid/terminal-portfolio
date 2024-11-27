interface EchoCommandProps {
  text: string;
}

const EchoCommand: React.FC<EchoCommandProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default EchoCommand;