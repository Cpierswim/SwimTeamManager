import React from "react";

const getTimeString = (time_in_mills) => {
  let seconds = time_in_mills / 1000;
  time_in_mills = time_in_mills % 1000;
  let minutes = seconds / 60;
  seconds = seconds % 60;
  let hundredths = time_in_mills / 10;
  let minutes_string = minutes > 0 ? `${minutes}:` : "";
  let seconds_string =
    minutes > 0 && seconds < 10 ? `0${seconds}` : seconds.toString();
  let hundredths_string =
    hundredths < 10 ? `:0${hundredths}` : `:${hundredths}`;
};

const TimeDisplayer = ({ time, meet_name }) => {
  return (
    <p>
      {getTimeString(time)} {meet_name && meet_name}
    </p>
  );
};

export default TimeDisplayer;
