const DateCommand = () => {
  const date = new Date().toDateString();
  return <div>{date}</div>;
};

export default DateCommand;
