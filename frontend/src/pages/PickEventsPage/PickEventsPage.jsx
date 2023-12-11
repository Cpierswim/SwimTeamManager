import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PickEventsPage.css";
import { Button } from "@mui/material";

const PickEventsPage = () => {
  const [meets, setMeets] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    const fetchMeets = async () => {
      let url = `${process.env.BASE_URL}/meet?team_id=1`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      let meets = response.data;
      setMeets(meets);
      console.log(meets);
    };

    fetchMeets();
  }, []);

  return (
    <div className="card_for_pickeventspage">
      <h3>Meets Currently Open to Pick Events For</h3>
      <br />
      {meets.map((meet) => {
        return (
          <Button
            key={meet.id}
            variant="contained"
            href={`/selectformeet?m=${meet.id}`}
          >
            Pick events for {meet.name}
          </Button>
        );
      })}
    </div>
  );
};

export default PickEventsPage;
