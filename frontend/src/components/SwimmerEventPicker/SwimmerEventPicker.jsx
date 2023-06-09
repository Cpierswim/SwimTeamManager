import React, { useEffect, useState } from "react";
import EventPicker from "../EventPicker/EventPicker";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const SwimmerEventPicker = ({ swimmer, meet, meetEvents }) => {
  const [entries, setEntries] = useState([]);
  const [user, token] = useAuth();
  const [bestTimes, setbestTimes] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      let url = `${BASE_URL}/entry?swimmer_id=${swimmer.id}`;
      //   let config = {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //   };
      let response = await axios.get(url);
      //   debugger;
      setEntries(response.data);
      //   console.log("Entries");
      //   console.log(response.data);
    };

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
    fetchEntries();
    fetchBestTimes();
  }, []);

  return (
    <>
      {/* <h3>
        Events for{" "}
        {swimmer.preferred_first_name
          ? swimmer.preferred_first_name
          : swimmer.first_name}{" "}
        {swimmer.last_name}
      </h3> */}
      {meetEvents.map((meetEvent) => {
        return meetEvent.event_type === 1 ? (
          <EventPicker
            key={"me" + meetEvent.id}
            swimmer={swimmer}
            meetEvent={meetEvent}
            swimmerEntries={entries}
            bestTimes={bestTimes}
          />
        ) : (
          <div key={"me" + meetEvent.id}></div>
        );
      })}
    </>
  );
};

export default SwimmerEventPicker;
