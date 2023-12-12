import React, { useEffect } from "react";
import axios from "axios";
const MeetSignupPicker = ({ swimmer }) => {
  const [meets, setMeets] = useState([]);
  useEffect(() => {
    const fetchMeets = async () => {
      let url = `${process.env.BASE_URL}/meet?team_id=1`;
      let response = await axios.get(url);
      setMeets(response.data);
    };
    fetchMeets();
  }, []);

  return <></>;
};

export default MeetSignupPicker;
