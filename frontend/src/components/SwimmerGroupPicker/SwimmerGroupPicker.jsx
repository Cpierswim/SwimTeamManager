import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./SwimmerGroupPicker.css";

const SwimmerGroupPicker = ({ swimmer, groups }) => {
  const [group, setGroup] = useState(swimmer.group_id);
  const [user, token] = useAuth();

  useEffect(() => {
    setGroup(swimmer.group_id);
  }, []);

  const updateGroup = async (test_group) => {
    if (test_group != swimmer.group_id) {
      let url = `${process.env.BASE_URL}/swimmer/${swimmer.id}`;
      let data;
      if (test_group !== "-1") data = { group_id: test_group };
      else data = { group_id: null };
      let config = {
        headers: { Authorization: "Bearer " + token },
      };
      let response = await axios.put(url, data, config);
    }
  };

  const test = async (e) => {
    // debugger;
    let value = e.target.value;
    updateGroup(value);
    setGroup(value);
  };

  return (
    <div className="swimmergrouppicker">
      <div className="name">
        {swimmer.preferred_first_name
          ? swimmer.preferred_first_name
          : swimmer.first_name}{" "}
        {swimmer.last_name}:{" "}
      </div>
      <select
        name={`group_selector${swimmer.id}`}
        id={`group_selector${swimmer.id}`}
        value={group ? group : undefined}
        // onChange={({ target: { value } }) => setGroup(value)}
        onChange={test}
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
    </div>
  );
};

export default SwimmerGroupPicker;
