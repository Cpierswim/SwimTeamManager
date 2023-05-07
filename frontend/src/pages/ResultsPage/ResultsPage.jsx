import React, { useEffect, useState } from "react";
import axios from "axios";
import getTimeString from "../../utils/CustonTime.js";
import useAuth from "../../hooks/useAuth";

const BASE_URL = "http://127.0.0.1:5000/api";

const ResultsPage = () => {
  const [user, token] = useAuth();
  const [results, setResults] = useState([]);
  const [meets, setMeets] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const swimmer_id = queryParameters.get("s");

  useEffect(() => {
    const fetchResults = async () => {
      let url = `${BASE_URL}/result?swimmer_id=${swimmer_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      setResults(response.data);
    };

    const fetchMeets = async () => {
      let url = `${BASE_URL}/meet?team_id=1`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      setMeets(response.data);
    };

    fetchResults();
    fetchMeets();
  }, []);

  function getMeetName(meet_id) {
    for (let i = 0; i < meets.length; i++)
      if (meets[i].id === meet_id) return meets[i].name;
    return "--Meet Unknown--";
  }

  function getResultString(result) {
    let built_string = "";
    built_string += result.distance + " ";
    switch (result.stroke) {
      case 1:
        built_string += "Free: ";
        break;
      case 2:
        built_string += "Back: ";
        break;
      case 3:
        built_string += "Breast: ";
        break;
      case 4:
        built_string += "Fly: ";
        break;
      case 5:
        built_string += "IM: ";
        break;
    }
    if (result.DQCode) built_string += "DQ";
    else built_string += getTimeString(result.time);

    built_string += " " + getMeetName(result.meet_id);
    result.place
      ? (built_string += " Place:" + result.place)
      : (built_string += " Place: unknown");
    built_string += " Points: ";
    result.points ? (built_string += result.points) : (built_string += "0");
    return built_string;
  }

  return (
    <>
      {results.map((result, index) => {
        return <p key={index}>{getResultString(result)}</p>;
      })}
    </>
  );
};

export default ResultsPage;
