import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Address from "../Address/Address";

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
    <>
      <select
        name={`group_selector${swimmer.id}`}
        id={`group_selector${swimmer.id}`}
        value={meetSignedUpFor()}
        onChange={selectChanged}
      >
        <option value="N">No</option>
        <option value="Y">Yes</option>
      </select>{" "}
      {meet.name} at {meet.location_name} {meet.date} {meet.start_time}{" "}
      <Address address={meet.address} />
    </>
  );
};

export default SwimmerMeetSignupPicker;
