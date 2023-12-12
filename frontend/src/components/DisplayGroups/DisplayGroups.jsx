import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./DisplayGroups.css";
import { Button } from "@mui/material";

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
    let url = `${process.env.BASE_URL}/groups?team_id=1/`;
    let response = await axios.get(url);
    setGroups(response.data);
  };

  const fetchCoach = async () => {
    let url = `${process.env.BASE_URL}/coach/${user.coach_id}`;
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
    let url = `${process.env.BASE_URL}/groups`;
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

  function cancelAddGroup() {
    setStatus(STATUS_DISPLAYING_GROUPS);
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

  const displayGroups = () => {
    return (
      <>
        <h2 className="groups_label">Currently Available Groups</h2>
        <div className="group_list">
          {groups.map((group) => {
            return (
              <div className="fullWidth" key={group.id}>
                <h4>{group.group_name}</h4>
                <p className="indent">
                  {" "}
                  Start Time: {getTimeString(group.start_time)}
                </p>
              </div>
            );
          })}
        </div>
        {displayAddGroup && (
          <Button
            variant="contained"
            onClick={() => {
              setStatus(STATUS_ADDING_GROUPS);
            }}
          >
            Add Group
          </Button>
        )}
      </>
    );
  };

  const addGroups = () => {
    return (
      <form className="add_groups_form" onSubmit={addNewGroup}>
        <div className="single_line">
          <label htmlFor="newGroupName">Group Name: </label>
          <input
            type="text"
            required
            id="newGroupName"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          ></input>
        </div>
        <div className="single_line">
          <label htmlFor="newGroupStartTime">Start Time: </label>
          <input
            type="time"
            required
            id="newGroupStartTime"
            value={newGroupStartTime}
            onChange={(e) => setNewGroupStartTime(e.target.value)}
          ></input>
        </div>
        <div className="button_row">
          <Button
            type="submit"
            className="add_group_button"
            variant="contained"
          >
            Add Group
          </Button>
          <Button
            type="button"
            onClick={cancelAddGroup}
            className="add_group_button"
            variant="contained"
          >
            Cancel
          </Button>
        </div>
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

  return <div className="main_container">{displayByDisplayingStatus()}</div>;
};

export default DisplayGroups;
