const getMillsfromTimeString = (timeString) => {
  //   debugger;
  let parts = timeString.split(":");
  let minutes = 0;
  let seconds = 0;
  let hundredths = 0;
  if (parts.length > 2) throw Error("Too many colons");
  if (parts.length == 2) {
    minutes = parseInt(parts[0]);
    parts[0] = parts[1];
  }
  parts = parts[0].split(".");
  if (parts.length != 2) throw Error("No period");
  seconds = parseInt(parts[0]);
  if (seconds > 59) throw Error("seconds too high");
  if (parts[1].length != 2) throw Error("after period length wrong");
  hundredths = parseInt(parts[1]);
  let time = hundredths * 10 + seconds * 1000 + minutes * 60 * 1000;
  return time;
};

export default getMillsfromTimeString;
