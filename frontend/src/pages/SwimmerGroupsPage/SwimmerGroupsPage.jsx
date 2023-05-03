import React, { useState, useEffect } from "react";
import SwimmerGroupPicker from "../../components/SwimmerGroupPicker/SwimmerGroupPicker";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const SwimmerGroupsPage = () => {
  const [swimmers, setSwimmers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchSwimmers = async () => {
      let url = `${BASE_URL}/swimmer?team_id=1`;
      let response = await axios.get(url);
      setSwimmers(response.data);
    };
    const fetchGroups = async () => {
      let url = `${BASE_URL}/groups?team_id=1/`;
      let response = await axios.get(url);
      setGroups(response.data);
    };
    fetchSwimmers();
    fetchGroups();
  }, []);

  return (
    <>
      <h3>Assign swimmers to Groups</h3>
      {swimmers.map((swimmer) => {
        return (
          <div key={swimmer.id}>
            <SwimmerGroupPicker
              key={swimmer.id}
              swimmer={swimmer}
              groups={groups}
            />
            <br />
          </div>
        );
      })}
    </>
  );
};

export default SwimmerGroupsPage;
