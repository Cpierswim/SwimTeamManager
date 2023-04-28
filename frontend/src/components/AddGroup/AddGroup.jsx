import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:5000/api";

const AddGroup = ({ makeGroupAPICall }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [user, token] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = `${BASE_URL}/groups/`;
    new_group = {
      group_name: newGroupName,
      team_id: 1, //should be set programmatically in the future
    };
    let response = await axios.post(url, new_group, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    makeGroupAPICall();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Group</h2>
      <label>
        Username:{" "}
        <input
          type="text"
          name="group_name"
          required
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
      </label>
      <button>Add</button>
    </form>
  );
};

export default AddGroup;
