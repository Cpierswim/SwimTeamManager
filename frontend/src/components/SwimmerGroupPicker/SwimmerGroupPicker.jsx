import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const BASE_URL = "http://127.0.0.1:5000/api";

const SwimmerGroupPicker = ({ swimmer, groups }) => {
  const [group, setGroup] = useState(swimmer.group_id);
  const [user, token] = useAuth();

  useEffect(() => {
    const updateGroup = async () => {
      if (group != swimmer.group_id) {
        let url = `${BASE_URL}/swimmer/${swimmer.id}`;
        let data;
        if (group !== "-1") data = { group_id: group };
        else data = { group_id: null };
        let config = {
          headers: { Authorization: "Bearer " + token },
        };
        let response = await axios.put(url, data, config);
      }
    };
    updateGroup();
  }, [group]);

  return (
    <>
      <select
        name={`group_selector${swimmer.id}`}
        id={`group_selector${swimmer.id}`}
        value={swimmer.group_id ? swimmer.group_id : undefined}
        onChange={({ target: { value } }) => setGroup(value)}
      >
        <option key={-1} value={-1}>
          --group unassigned--
        </option>
        {groups.map((group) => {
          return (
            <option key={group.id} value={group.id}>
              {group.group_name}
            </option>
          );
        })}
      </select>{" "}
      {swimmer.preferred_first_name
        ? swimmer.preferred_first_name
        : swimmer.first_name}{" "}
      {swimmer.last_name}
    </>
  );
};

export default SwimmerGroupPicker;
