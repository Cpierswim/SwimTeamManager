import React, { useState, useEffect } from "react";
import SwimmerGroupPicker from "../../components/SwimmerGroupPicker/SwimmerGroupPicker";
import axios from "axios";
import "./SwimmerGroupsPage.css";

const SwimmerGroupsPage = () => {
  const [swimmers, setSwimmers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchSwimmers = async () => {
      let url = `${process.env.BASE_URL}/swimmer?team_id=1`;
      let response = await axios.get(url);
      setSwimmers(response.data);
    };
    const fetchGroups = async () => {
      let url = `${process.env.BASE_URL}/groups?team_id=1/`;
      let response = await axios.get(url);
      setGroups(response.data);
    };
    fetchSwimmers();
    fetchGroups();
  }, []);

  return (
    <div className="card">
      <h3>Assign swimmers to Groups</h3>
      {swimmers.map((swimmer) => {
        return (
          <div style={{ width: "100%" }} key={swimmer.id}>
            <SwimmerGroupPicker
              key={swimmer.id}
              swimmer={swimmer}
              groups={groups}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SwimmerGroupsPage;
