import React, { useState, useEffect } from "react";
import getTimeString from "../../utils/CustonTime.js";
import getMillsfromTimeString from "../../utils/ParseTimeString.js";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./EventPicker.css";

const BASE_URL = "http://127.0.0.1:5000/api";

const EventPicker = ({ swimmer, meetEvent, swimmerEntries, bestTimes }) => {
  const [entered, setEntered] = useState(false);
  const [bonusStatus, setBonusStatus] = useState(false);
  const [exhibitionStatus, setexhibitionStatus] = useState(false);
  const [time, setTime] = useState("");
  const [user, token] = useAuth();
  const [entry, setEntry] = useState({});

  useEffect(() => {
    // debugger;
    // if (swimmerEntries.length > 0) console.log("Entry found");
    // else console.log("No entries");
    // for (let i = 0; i < swimmerEntries.length; i++)
    //   if (swimmerEntries[i].event_id === meetEvent.id) {
    //     setEntered(true);
    //     setBonusStatus(swimmerEntries[i].bonus);
    //     setexhibitionStatus(swimmerEntries[i].exhibition);
    //     swimmerEntries[i].time
    //       ? setTime(getTimeString(swimmerEntries[i].time))
    //       : setTime("NT");
    //     break;
    //   } else setEntered(false);

    // THE ABOVE DOESN"T WORK DUE TO CHILDREN BEING REDERED BEFORE PARENTS
    const isEnteredInThisEvent = async () => {
      let url = `${BASE_URL}/entry?swimmer_id=${swimmer.id}&event_id=${meetEvent.id}`;
      //   let config = {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //   };
      let response = await axios.get(url);
      let entry = response.data;
      if (Object.keys(entry).length !== 0) {
        setEntered(true);
        setEntry(entry);
        entry.time ? setTime(getTimeString(entry.time)) : setTime("NT");
        setBonusStatus(entry.bonus);
        setexhibitionStatus(entry.exhibition);
      }
    };
    isEnteredInThisEvent();
  }, []);

  function checkChanged(e) {
    // debugger;
    let checked = e.target.checked;
    //handle the entry or delete it
    if (checked) {
      //   debugger;
      let bestTimeFound = false;
      let bestTimeMiliseconds = 0;
      for (let i = 0; i < bestTimes.length; i++) {
        if (
          bestTimes[i].distance === meetEvent.distance &&
          bestTimes[i].stroke === meetEvent.stroke
        ) {
          bestTimeMiliseconds = bestTimes[i].time;
        }
      }
      if (bestTimeMiliseconds === 0) setTime("NT");
      else setTime(getTimeString(bestTimeMiliseconds));
      createInitialEntryInDataBase(bestTimeMiliseconds);
    } else {
      setTime("");
      setBonusStatus(false);
      setexhibitionStatus(false);
      setEntry({});
      deleteEntry(entry.id);
      let temp = e.target;
      temp.parentElement.children[1].style.backgroundColor = "none";
      //   debugger;
    }

    setEntered(checked);
  }

  function getStroke(stroke) {
    // debugger;
    switch (stroke) {
      case 1:
        return "Free";
      case 2:
        return "Back";
      case 3:
        return "Breast";
      case 4:
        return "Fly";
      case 5:
        return "IM";
    }
  }

  async function createInitialEntryInDataBase(time) {
    let url = `${BASE_URL}/entryworkaround`; //CORS Problem if I don't do this
    // let config = {
    //   headers: {
    //     // Authorization: "Bearer " + token,
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    let data = {
      swimmer_id: swimmer.id,
      event_id: meetEvent.id,
      exhibition: false,
      bonus: false,
      entry_type: "I",
    };
    if (time != 0) data.time = time;
    let response = await axios.post(url, data);
    // console.log(response);
    setEntry(response.data);
  }

  async function deleteEntry(entry_id) {
    let url = `${BASE_URL}/entry/${entry_id}`;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let response = await axios.delete(url, config);
  }

  function timeChanged(e) {
    // debugger;
    let text = e.target.value;
    try {
      let time = 0;
      if (text !== "NT") time = getMillsfromTimeString(text);
      e.target.style.backgroundColor = "#e2fcb8";
      setTime(text);
      //If we get here, we have a valid time, and can update the entry
      let data = {
        time: time,
      };
      updateEntry(data);
    } catch {
      e.target.style.backgroundColor = "yellow";
      setTime(text);
    }
  }

  async function updateEntry(data) {
    debugger;
    let url = `${BASE_URL}/entry/${entry.id}`;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let response = await axios.put(url, data, config);
    debugger;
  }

  function bonusChanged(e) {
    let data = { bonus: e.target.checked };
    updateEntry(data);
    setBonusStatus(e.target.checked);
  }

  function exhibitionChanged(e) {
    let data = { exhibition: e.target.checked };
    updateEntry(data);
    setexhibitionStatus(e.target.checked);
  }

  return (
    <>
      {meetEvent.event_type === 1 ? (
        <div className="event_container">
          <div>Event #{meetEvent.event_number} </div>
          <div>
            <input
              type="checkbox"
              checked={entered}
              onChange={checkChanged}
            ></input>
            {meetEvent.distance} {getStroke(meetEvent.stroke)}
          </div>
          <div>
            Time:{" "}
            <input
              type="text"
              value={time}
              disabled={!entered}
              onChange={timeChanged}
            ></input>
          </div>
          <div>
            {" Bonus: "}
            <input
              type="checkbox"
              disabled={!entered}
              checked={bonusStatus}
              onChange={bonusChanged}
            ></input>
          </div>
          <div>
            {" Exhibition: "}
            <input
              type="checkbox"
              disabled={!entered}
              checked={exhibitionStatus}
              onChange={exhibitionChanged}
            ></input>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default EventPicker;
