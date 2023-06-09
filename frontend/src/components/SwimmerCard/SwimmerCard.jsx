import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import getTimeString from "../../utils/CustonTime.js";
import useAuth from "../../hooks/useAuth";
import "./SwimmerCard.css";
import { Button } from "@mui/material";
const BASE_URL = "http://127.0.0.1:5000/api";

const SwimmerCard = ({ swimmer }) => {
  const [bestTimes, setbestTimes] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    const fetchBestTimes = async () => {
      let url = `${BASE_URL}/besttimes/${swimmer.id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url);
      let temp_bestTimes = response.data;
      setbestTimes(temp_bestTimes);
    };
    fetchBestTimes();
  }, []);

  const displayBestTimes = () => {
    return (
      <>
        {bestTimes.length == 0 ? (
          <h6>No best times recorded</h6>
        ) : (
          <h6>Best Times</h6>
        )}
        {bestTimes.map((bestTime, index) => {
          let built_string = "";
          built_string += bestTime.distance + " ";
          switch (bestTime.stroke) {
            case 1:
              built_string += "Free: ";
              break;
            case 2:
              built_string += "Back: ";
              break;
            case 3:
              built_string += "Breast: ";
              break;
            case 4:
              built_string += "Fly: ";
              break;
            case 5:
              built_string += "IM: ";
              break;
          }
          built_string += getTimeString(bestTime.time);
          return (
            <div key={index}>
              {built_string}
              <br />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="swimmer_card">
      <div className="split_header">
        <h3>
          {swimmer.preferred_first_name
            ? swimmer.preferred_first_name
            : swimmer.first_name}{" "}
          {swimmer.last_name}
        </h3>
        <p>
          {swimmer.birthdate}
          <br />
          Group: {swimmer.group ? swimmer.group.group_name : "unassigned"}
        </p>
      </div>
      <div className="swimmer-divider" />
      {displayBestTimes()}

      <div className="split_buttons">
        <Button variant="contained" href={`/meetsignup?s=${swimmer.id}`}>
          Sign up for a Meet
        </Button>
        <Button variant="contained" href={`/results?s=${swimmer.id}`}>
          See all results
        </Button>
      </div>
    </div>
  );
};

export default SwimmerCard;
