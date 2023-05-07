const getTimeString = (time_in_mills) => {
  let seconds = Math.floor(time_in_mills / 1000);
  time_in_mills = time_in_mills % 1000;
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hundredths = Math.floor(time_in_mills / 10);
  let minutes_string = minutes > 0 ? `${minutes}:` : "";
  let seconds_string =
    minutes > 0 && seconds < 10 ? `0${seconds}` : seconds.toString();
  let hundredths_string =
    hundredths < 10 ? `:0${hundredths}` : `:${hundredths}`;
  let full_string = minutes_string + seconds_string + hundredths_string;
  return full_string;
};

export default getTimeString;
