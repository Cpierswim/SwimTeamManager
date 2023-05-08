import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Address from "../Address/Address";
import "./SwimmerMeetSignupPicker.css";

const BASE_URL = "http://127.0.0.1:5000/api";

const SwimmerMeetSignupPicker = ({
  swimmer,
  meet,
  meetSignups,
  setSignups,
}) => {
  const [user, token] = useAuth();

  function meetSignedUpFor() {
    for (let i = 0; i < meetSignups.length; i++) {
      if (meetSignups[i].meet_id === meet.id) return "Y";
    }
    return "N";
  }

  async function selectChanged(e) {
    let value = e.target.value;
    if (value === "Y") {
      let url = `${BASE_URL}/signups`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let data = {
        swimmer_id: swimmer.id,
        meet_id: meet.id,
      };
      let response = await axios.post(url, data, config);
    } else {
      let url = `${BASE_URL}/signups/${swimmer.id}/${meet.id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.delete(url, config);
    }

    let url = `${BASE_URL}/signups/${swimmer.id}`;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let response = await axios.get(url, config);
    let signups = response.data;
    setSignups(signups);
  }

  return (
    <div className="signup_card">
      <h3>{meet.name}</h3>
      <h6>Meet Date: {meet.date}</h6>
      <p>Start time: {meet.start_time}</p>{" "}
      <p>
        Location: {meet.location_name}
        <Address address={meet.address} />
      </p>
      <select
        name={`group_selector${swimmer.id}`}
        id={`group_selector${swimmer.id}`}
        value={meetSignedUpFor()}
        onChange={selectChanged}
      >
        <option value="N">
          No,{" "}
          {swimmer.preferred_first_name
            ? swimmer.preferred_first_name
            : swimmer.first_name}{" "}
          {swimmer.last_name} is not available for this meet
        </option>
        <option value="Y">
          Yes, sign{" "}
          {swimmer.preferred_first_name
            ? swimmer.preferred_first_name
            : swimmer.first_name}{" "}
          {swimmer.last_name} up for this meet
        </option>
      </select>
    </div>
  );
};

export default SwimmerMeetSignupPicker;
