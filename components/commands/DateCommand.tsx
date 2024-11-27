const DateCommand = () => {
  const date = new Date().toDateString();
  return <div className="text-orange">{date}</div>;
};

export default DateCommand;
