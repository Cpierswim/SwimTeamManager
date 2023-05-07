import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const PickEventsPage = () => {
  const [meets, setMeets] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    const fetchMeets = async () => {
      let url = `${BASE_URL}/meet?team_id=1`;
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
    <>
      {meets.map((meet) => {
        return (
          <Link key={meet.id} className="" to={`/selectformeet?m=${meet.id}`}>
            Pick events for {meet.name}
          </Link>
        );
      })}
    </>
  );
};

export default PickEventsPage;
