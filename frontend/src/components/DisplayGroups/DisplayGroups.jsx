import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const DisplayGroups = () => {
  const [displayAddGroup, setdisplayAddGroup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    const fetchGroup = async () => {
      let url = `${BASE_URL}/groups?team_id=1`;
      let response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
      setGroups(response.data);
      debugger;
      let temp = user;
    };
    fetchGroup();
  }, []);

  return (
    <div>
      {groups.map((group) => {
        <p>group.group_name</p>;
      })}
      {displayAddGroup && (
        <button onClick={() => setdisplayAddGroup(false)}>Add Group</button>
      )}
    </div>
  );
};

export default DisplayGroups;
