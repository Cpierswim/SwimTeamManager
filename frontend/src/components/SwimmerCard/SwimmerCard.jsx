import React from "react";

const SwimmerCard = ({ swimmer }) => {
  return (
    <div>
      <h5>
        {swimmer.preferred_first_name
          ? swimmer.preferred_first_name
          : swimmer.first_name}{" "}
        {swimmer.last_name}
      </h5>
      <p>{swimmer.birthdate}</p>
      <p>Group: {swimmer.group && swimmer.group}</p>
    </div>
  );
};

export default SwimmerCard;
