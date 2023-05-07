import React, { useEffect } from "react";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:5000/api";

const MeetSignupPicker = ({ swimmer }) => {
  const [meets, setMeets] = useState([]);
  useEffect(() => {
    const fetchMeets = async () => {
      let url = `${BASE_URL}/meet?team_id=1`;
      let response = await axios.get(url);
      setMeets(response.data);
    };
    fetchMeets();
  }, []);

  return <></>;
};

export default MeetSignupPicker;
