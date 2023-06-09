import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import ParentCard from "../../components/ParentCard/ParentCard";
import SwimmerCard from "../../components/SwimmerCard/SwimmerCard";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { Button } from "@mui/material";

const HomePage = () => {
  const [user, token] = useAuth();
  const [parents, setParents] = useState([]);
  const [swimmers, setSwimmers] = useState([]);
  const [coach, setCoach] = useState({});
  const BASE_URL = "http://127.0.0.1:5000/api";
  const PARENT_TYPE = 1;
  const COACH_TYPE = 2;

  useEffect(() => {
    const fetchFamily = async () => {
      if (user.type === PARENT_TYPE) {
        let url = `${BASE_URL}/family?family_id=${user.family_id}/`;
        let response = await axios.get(
          url
          // {
          //   headers: {
          //     Authorization: "Bearer " + token,
          //   },
          // }
        );
        setParents(response.data.parents);
        setSwimmers(response.data.swimmers);
      } else if (user.type === COACH_TYPE) {
        let url = `${BASE_URL}/coach/${user.coach_id}`;
        let response = await axios.get(url);
        setCoach(response.data);
      }
    };
    fetchFamily();
  }, []);

  const loggedInUser = () => {
    switch (user.type) {
      case PARENT_TYPE:
        return parentUser();
      case COACH_TYPE:
        return coachUser();
      default:
        return <></>;
    }
  };

  const coachUser = () => {
    return (
      <div className="coach_display">
        <h3 className="coach_headline">Hello Coach {coach.first_name}</h3>
        {coach.isHeadCoach && (
          <>
            <Button variant="contained" href="/groups">
              Add Groups (Head Coach)
            </Button>
            <Button variant="contained" href="/register_coach">
              Add Coach (Head Coach)
            </Button>
            <Button variant="contained" href="/swimmersgroups">
              Assign Swimmers to Groups (Head Coach)
            </Button>
          </>
        )}
        <Button variant="contained" href="/map">
          Map of all Swimmers
        </Button>
        <Button variant="contained" href="/selectmeet">
          Pick Swimmer's Events
        </Button>
      </div>
    );
  };

  const parentUser = () => {
    return (
      <>
        <h1>Home Page for {user.username}!</h1>
        {parents.map((parent) => (
          <ParentCard key={parent.id} parent={parent} />
        ))}
        {swimmers.map((swimmer) => (
          <SwimmerCard key={swimmer.id} swimmer={swimmer} />
        ))}
      </>
    );
  };

  const anonymousUser = () => {
    return <h1>JCC Stingrays</h1>;
  };
  return <>{user ? loggedInUser() : anonymousUser()}</>;
};

export default HomePage;
