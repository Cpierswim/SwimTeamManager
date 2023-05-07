import React, { useEffect, useState } from "react";
import getTimeString from "../../utils/CustonTime.js";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const BASE_URL = "http://127.0.0.1:5000/api";

const RelayEventPicker = ({ enteredSwimmers, relayEvent, bestTimes }) => {
  const [user, token] = useAuth();
  const [bestTimeDistance, setBestTimeDistance] = useState(
    relayEvent.distance / 4
  );
  const [relaySwimmersNames, setRelaySwimmersNames] = useState({
    swimmer1: "Swimmer 1",
    swimmer2: "Swimmer 2",
    swimmer3: "Swimmer 3",
    swimmer4: "Swimmer 4",
  });
  const [relaySwimmers, setRelaySwimmers] = useState({
    swimmer1: null,
    swimmer2: null,
    swimmer3: null,
    swimmer4: null,
  });
  const [relaySwimmersTimesDisplayValues, setRelaySwimmersTimesDisplayValues] =
    useState({
      swimmer1: "NT",
      swimmer2: "NT",
      swimmer3: "NT",
      swimmer4: "NT",
    });
  const [relaySwimmersTimesActualValues, setRelaySwimmersTimesActualValues] =
    useState({
      swimmer1: 0,
      swimmer2: 0,
      swimmer3: 0,
      swimmer4: 0,
    });
  const [stroke, setStroke] = useState("");
  const [letterCurrentlyPicking, setLetterCurrentlyPicking] = useState("A");
  const [entry, setEntry] = useState({});
  const [autopickVisible, setAutopickVisible] = useState(true);

  useEffect(() => {
    switch (relayEvent.stroke) {
      case 1:
        setStroke("Free Relay");
        break;
      case 2:
        setStroke("Backstroke Relay");
        break;
      case 3:
        setStroke("Breaststroke Relay");
        break;
      case 4:
        setStroke("Butterfly Relay");
        break;
      case 5:
        setStroke("Medley Relay");
        break;
    }
  }, []);

  function autoPickRelay() {
    // debugger;
    if (relayEvent.stroke !== 5) {
      //will only handle stroke relays for now, picking a medley relay is much more difficult
      //I know how to program it (I have programmed it before, but I ran out of time)
      let bestTimeList = bestTimes;
      let swimmerList = enteredSwimmers;
      let temprelaySwimmersTimesActualValues = {
        ...relaySwimmersTimesActualValues,
      };
      let temprelaySwimmersNames = { ...relaySwimmersNames };
      let temprelaySwimmers = { ...relaySwimmers };
      let temprelaySwimmersTimesDisplayValues = {
        ...relaySwimmersTimesDisplayValues,
      };
      for (let i = 1; i <= 4; i++) {
        try {
          let result = getFastestSwimmerAndTime(
            swimmerList,
            bestTimeList,
            relayEvent.stroke
          );
          //   console.log(result);
          //   debugger;
          temprelaySwimmersTimesActualValues["swimmer" + i] = result[0];
          temprelaySwimmersTimesDisplayValues["swimmer" + i] = getTimeString(
            result[0].time
          );
          temprelaySwimmersNames["swimmer" + i] =
            (result[1].preferred_first_name
              ? result[1].preferred_first_name
              : result[1].first_name) +
            " " +
            result[1].last_name;

          temprelaySwimmers["swimmer" + i] = result[1];

          swimmerList = result[2];
          bestTimeList = result[3];
        } catch {
          i = 100;
        }
      }
      //   console.log(temprelaySwimmersTimesActualValues);
      //   console.log(temprelaySwimmersTimesDisplayValues);
      //   console.log(temprelaySwimmersNames);
      //   console.log(temprelaySwimmers);
      setRelaySwimmersTimesActualValues(temprelaySwimmersTimesActualValues);
      setRelaySwimmersNames(temprelaySwimmersNames);
      setRelaySwimmers(temprelaySwimmers);
      setRelaySwimmersTimesDisplayValues(temprelaySwimmersTimesDisplayValues);
      enterRelay(temprelaySwimmers, temprelaySwimmersTimesActualValues);
    }
  }

  function getFastestSwimmerAndTime(swimmerList, bestTimeList, stroke) {
    let bestTime = Number.POSITIVE_INFINITY;
    // debugger;
    for (let i = 0; i < bestTimeList.length; i++)
      if (
        bestTimeList[i].stroke === stroke &&
        bestTimeList[i].time < bestTime &&
        bestTimeList[i].distance === bestTimeDistance
      )
        bestTime = bestTimeList[i];

    // debugger;

    let fastestSwimmer = null;
    for (let i = 0; i < swimmerList.length; i++)
      if (swimmerList[i].id === bestTime.swimmer_id) {
        fastestSwimmer = swimmerList[i];
        break;
      }

    // debugger;
    let removedBestTime = bestTimeList.filter(
      (bestTimeChecking) =>
        !(
          bestTime.swimmer_id === bestTimeChecking.swimmer_id &&
          bestTime.distance === bestTimeChecking.distance &&
          bestTime.stroke === bestTimeChecking.stroke
        )
    );
    let removedFastestSwimmer = swimmerList.filter(
      (checkingSwimmer) => checkingSwimmer.id !== fastestSwimmer.id
    );

    return [bestTime, fastestSwimmer, removedFastestSwimmer, removedBestTime];
  }

  async function enterRelay(swimmers) {
    // debugger;
    let url = `${BASE_URL}/relay`;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let relay_data = {
      relay_identifier: letterCurrentlyPicking,
      swimmer1: swimmers.swimmer1 ? swimmers.swimmer1.id : null,
      swimmer2: swimmers.swimmer2 ? swimmers.swimmer2.id : null,
      swimmer3: swimmers.swimmer3 ? swimmers.swimmer3.id : null,
      swimmer4: swimmers.swimmer4 ? swimmers.swimmer4.id : null,
    };
    // debugger;
    for (let i = 1; i <= 4; i++)
      if (relay_data["swimmer" + i] == null) delete relay_data["swimmer" + i];

    // debugger;
    let relay_response = await axios.post(url, relay_data, config);
    let relay = relay_response.data;
    let relay_id = relay.id;
    url = `${BASE_URL}/entryworkaround`; //CORS Problem if I don't do this
    // let config = {
    //   headers: {
    //     // Authorization: "Bearer " + token,
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    let entry_data = {
      relay_id: relay_id,
      event_id: relayEvent.id,
      exhibition: false,
      bonus: false,
      entry_type: "R",
    };
    // debugger;
    let entry_response = await axios.post(url, entry_data);
    // console.log(response);
    setEntry(entry_response.data);
    setAutopickVisible(false);
  }

  return (
    <>
      <h3>
        {relayEvent.distance} {stroke} - {letterCurrentlyPicking} Relay
      </h3>
      <input
        readOnly={true}
        type="text"
        value={relaySwimmersNames.swimmer1}
      ></input>
      <input
        readOnly={true}
        type="text"
        value={relaySwimmersTimesDisplayValues.swimmer1}
      ></input>
      <br />
      <input
        readOnly={true}
        type="text"
        value={relaySwimmersNames.swimmer2}
      ></input>
      <input
        readOnly={true}
        type="text"
        value={relaySwimmersTimesDisplayValues.swimmer2}
      ></input>
      <br />
      <input
        readOnly={true}
        type="text"
        value={relaySwimmersNames.swimmer3}
      ></input>
      <input
        readOnly={true}
        type="text"
        value={relaySwimmersTimesDisplayValues.swimmer3}
      ></input>
      <br />
      <input
        readOnly={true}
        type="text"
        value={relaySwimmersNames.swimmer4}
      ></input>
      <input
        readOnly={true}
        type="text"
        value={relaySwimmersTimesDisplayValues.swimmer4}
      ></input>
      <br />
      <input readOnly={true} type="text" value={"Entry Time: NT"}></input>
      <br />
      <button disabled={!autopickVisible} onClick={autoPickRelay}>
        Auto Pick Relay
      </button>
      <button disabled={true}>Add Another Relay</button>
    </>
  );
};

export default RelayEventPicker;
