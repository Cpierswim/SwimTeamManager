import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SwimmerMeetSignupPicker from "../../components/SwimmerMeetSignupPicker/SwimmerMeetSignupPicker";
const BASE_URL = "http://127.0.0.1:5000/api";

const MeetSignupPage = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const swimmer_id = queryParameters.get("s");
  const [user, token] = useAuth();
  const [swimmerInFamily, setSwimmerInFamily] = useState(false);
  const [swimmer, setSwimmer] = useState({});
  const [meets, setMeets] = useState([]);
  const [signups, setSignups] = useState([]);

  useEffect(() => {
    let swimmer;
    const fetchSwimmer = async () => {
      let url = `${BASE_URL}/swimmer/${swimmer_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      swimmer = response.data;
      setSwimmerInFamily(swimmer.family_id === user.family_id);
      setSwimmer(swimmer);
    };
    const fetchMeets = async () => {
      let url = `${BASE_URL}/meet?team_id=1`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      let meets = response.data;
      setMeets(meets);
    };
    const fetchMeetsRegisteredFor = async () => {
      let url = `${BASE_URL}/signups/${swimmer_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      let signups = response.data;
      setSignups(signups);
    };
    fetchSwimmer();
    fetchMeets();
    fetchMeetsRegisteredFor();
  }, []);

  return !swimmerInFamily ? (
    <p>UNAUTHORIZED</p>
  ) : (
    <>
      <h2>
        {swimmer.preferred_first_name
          ? swimmer.preferred_first_name
          : swimmer.first_name}{" "}
        Meet Signup
      </h2>
      {meets.map((meet, index) => {
        return (
          <SwimmerMeetSignupPicker
            key={index}
            swimmer={swimmer}
            meet={meet}
            meetSignups={signups}
            setSignups={setSignups}
          />
        );
      })}
    </>
  );
};

export default MeetSignupPage;
