import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import RelayEventPicker from "../../components/RelayEventPicker/RelayEventPicker";
import "./RelayPickerPage.css";

const RelayPickerPage = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const meet_id = queryParameters.get("m");
  const [user, token] = useAuth();
  const [meet, setMeet] = useState({});
  const [signedUpSwimmers, setSignedUpSwimmers] = useState([]);
  const [meetEvents, setMeetEvents] = useState([]);
  const [teamBestTimes, setTeamBestTimes] = useState([]);

  useEffect(() => {
    let signups;
    const fetchMeet = async () => {
      let url = `${process.env.BASE_URL}/meet/${meet_id}`;
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
      let url = `${process.env.BASE_URL}/signupsbymeet/${meet_id}`;
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
      let url = `${process.env.BASE_URL}/swimmer?team_id=1`;
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
      let url = `${process.env.BASE_URL}/meetevent?meet_id=${meet_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      //   console.log(response.data);
      let events = response.data;
      events = events.filter((event) => event.event_type === 2);
      setMeetEvents(events);
    };
    const fetchTeamBestTimes = async () => {
      let url = `${process.env.BASE_URL}/besttimes?team_id=1`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      //   debugger;
      let tempBestTimes = response.data;

      tempBestTimes = tempBestTimes.filter((bestTime) => {
        for (let i = 0; i < signups.length; i++)
          if (signups[i].swimmer_id === bestTime.swimmer_id) return true;
        return false;
      });
      //   console.log(tempBestTimes);
      setTeamBestTimes(tempBestTimes);
    };
    fetchMeet();
    fetchSignUps();
    fetchSignedUpSwimmers();
    fetchEvents();
    fetchTeamBestTimes();
  }, []);

  return (
    <div className="relayPickingContainer">
      <h1>Picking relays for {meet.name}</h1>

      {meetEvents.map((event, index) => {
        return (
          <RelayEventPicker
            key={index}
            enteredSwimmers={signedUpSwimmers}
            relayEvent={event}
            bestTimes={teamBestTimes}
          />
        );
      })}
    </div>
  );
};

export default RelayPickerPage;
