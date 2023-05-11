import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";
const STATUS_DISPLAYING_GROUPS = 1;
const STATUS_ADDING_GROUPS = 2;

const DisplayGroups = () => {
  const [displayAddGroup, setdisplayAddGroup] = useState(false);
  const [status, setStatus] = useState(STATUS_DISPLAYING_GROUPS);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupStartTime, setNewGroupStartTime] = useState("");
  const [groups, setGroups] = useState([]);
  const [user, token] = useAuth();
  const [coach, setCoach] = useState({});

  const fetchGroups = async () => {
    let url = `${BASE_URL}/groups?team_id=1/`;
    let response = await axios.get(url);
    setGroups(response.data);
  };

  const fetchCoach = async () => {
    let url = `${BASE_URL}/coach/${user.coach_id}`;
    let response = await axios.get(url);
    setCoach(response.data);
    if (response.data.isHeadCoach) setdisplayAddGroup(true);
  };

  useEffect(() => {
    fetchGroups();
    fetchCoach();
  }, []);

  const addNewGroup = async (e) => {
    e.preventDefault();
    let url = `${BASE_URL}/groups`;
    let data = {
      group_name: newGroupName,
      team_id: 1,
      start_time: newGroupStartTime,
    };
    let headers = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    await axios.post(url, data, headers);
    fetchGroups();
    setStatus(STATUS_DISPLAYING_GROUPS);
    setNewGroupName("");
  };

  const displayGroups = () => {
    return (
      <>
        {groups.map((group) => {
          return (
            <p key={group.id}>
              {group.group_name} {group.start_time}
            </p>
          );
        })}
        {displayAddGroup && (
          <button
            onClick={() => {
              setStatus(STATUS_ADDING_GROUPS);
            }}
          >
            Add Group
          </button>
        )}
      </>
    );
  };

  const addGroups = () => {
    return (
      <form onSubmit={addNewGroup}>
        <label>
          Group Name:{" "}
          <input
            type="text"
            required
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          ></input>
        </label>
        <br />
        <label>
          Start Time:{" "}
          <input
            type="time"
            required
            value={newGroupStartTime}
            onChange={(e) => setNewGroupStartTime(e.target.value)}
          ></input>
        </label>
        <button>Add Group</button>
      </form>
    );
  };

  function displayByDisplayingStatus() {
    switch (status) {
      case STATUS_DISPLAYING_GROUPS:
        return displayGroups();
      case STATUS_ADDING_GROUPS:
        return addGroups();
      default:
        return <></>;
    }
  }

  return <div>{displayByDisplayingStatus()}</div>;
};

export default DisplayGroups;
