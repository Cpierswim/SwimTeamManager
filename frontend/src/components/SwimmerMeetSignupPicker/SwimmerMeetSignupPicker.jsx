import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Address from "../Address/Address";
import "./SwimmerMeetSignupPicker.css";

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
      let url = `${process.env.BASE_URL}/signups`;
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
      let url = `${process.env.BASE_URL}/signups/${swimmer.id}/${meet.id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.delete(url, config);
    }

    let url = `${process.env.BASE_URL}/signups/${swimmer.id}`;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let response = await axios.get(url, config);
    let signups = response.data;
    setSignups(signups);
  }

  function getTimeString(time) {
    if (time) {
      let arr = time.split(":");
      let hour = parseInt(arr[0]);
      let AMPM = "AM";
      if (hour > 12) {
        hour -= 12;
        AMPM = "PM";
      }
      return hour + ":" + arr[1] + " " + AMPM;
    } else return "unknown start time";
  }

  return (
    <div className="signup_card">
      <h2>{meet.name}</h2>
      <div className="split_evenly">
        <div>
          <h6>Meet Date: {meet.date}</h6>
          <p>Start time: {getTimeString(meet.start_time)}</p>
        </div>
        <div>
          <div>
            Location: {meet.location_name}
            <Address address={meet.address} />
          </div>
        </div>
      </div>
      <select
        className="more_space"
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
