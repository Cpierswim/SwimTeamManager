const getTimeString = (time_in_mills) => {
  // I would const anything that never changes again, let for things that change.
  let seconds = Math.floor(time_in_mills / 1000);
  time_in_mills = time_in_mills % 1000;
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  const hundredths = Math.floor(time_in_mills / 10);
  const minutes_string = minutes > 0 ? `${minutes}:` : "";
  const seconds_string =
    minutes > 0 && seconds < 10 ? `0${seconds}` : seconds.toString();
  const hundredths_string =
    hundredths < 10 ? `:0${hundredths}` : `.${hundredths}`;
  const full_string = minutes_string + seconds_string + hundredths_string;
  return full_string;
};

export default getTimeString;
