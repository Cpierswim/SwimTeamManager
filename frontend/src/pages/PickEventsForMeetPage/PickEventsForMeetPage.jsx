import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SwimmerEventPicker from "../../components/SwimmerEventPicker/SwimmerEventPicker";

const BASE_URL = "http://127.0.0.1:5000/api";

const PickEventsForMeetPage = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const meet_id = queryParameters.get("m");
  const [user, token] = useAuth();
  const [meet, setMeet] = useState({});
  const [signedUpSwimmers, setSignedUpSwimmers] = useState([]);
  const [meetEvents, setMeetEvents] = useState([]);

  useEffect(() => {
    let signups;
    const fetchMeet = async () => {
      let url = `${BASE_URL}/meet/${meet_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      let meet = response.data;
      setMeet(meet);
      //   console.log(meet);
    };
    const fetchSignUps = async () => {
      let url = `${BASE_URL}/signupsbymeet/${meet_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      signups = response.data;
      //   setSignUps(response.data);
      //   console.log(response.data);
    };
    const fetchSignedUpSwimmers = async () => {
      let url = `${BASE_URL}/swimmer?team_id=1`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      let swimmers = response.data;
      swimmers = swimmers.filter((swimmer) => {
        for (let i = 0; i < signups.length; i++)
          if (signups[i].swimmer_id === swimmer.id) return true;
        return false;
      });
      //   console.log(swimmers);
      setSignedUpSwimmers(swimmers);
    };
    const fetchEvents = async () => {
      let url = `${BASE_URL}/meetevent?meet_id=${meet_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      //   console.log(response.data);
      setMeetEvents(response.data);
    };
    fetchMeet();
    fetchSignUps();
    fetchSignedUpSwimmers();
    fetchEvents();
  }, []);

  return (
    <>
      <h1>Picking Events for: {meet.name}</h1>
      {signedUpSwimmers.map((swimmer) => {
        return (
          <SwimmerEventPicker
            key={"swmr" + swimmer.id}
            swimmer={swimmer}
            meet={meet}
            meetEvents={meetEvents}
          />
        );
      })}
    </>
  );
};

export default PickEventsForMeetPage;
