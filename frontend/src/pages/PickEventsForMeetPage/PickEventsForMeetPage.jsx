import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SwimmerEventPicker from "../../components/SwimmerEventPicker/SwimmerEventPicker";
import { Link } from "react-router-dom";
import "./PickEventsForMeetPage.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";

const PickEventsForMeetPage = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const meet_id = queryParameters.get("m");
  const [user, token] = useAuth();
  const [meet, setMeet] = useState({});
  const [signedUpSwimmers, setSignedUpSwimmers] = useState([]);
  const [meetEvents, setMeetEvents] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    let signups;
    const fetchMeet = async () => {
      let url = `${process.env.BASE_URL}/meet/${meet_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      let meet = response.data;
      setMeet(meet);
      //   console.log(meet);
    };
    const fetchSignUps = async () => {
      let url = `${process.env.BASE_URL}/signupsbymeet/${meet_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      signups = response.data;
      //   setSignUps(response.data);
      //   console.log(response.data);
    };
    const fetchSignedUpSwimmers = async () => {
      let url = `${process.env.BASE_URL}/swimmer?team_id=1`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      let swimmers = response.data;
      swimmers = swimmers.filter((swimmer) => {
        for (let i = 0; i < signups.length; i++)
          if (signups[i].swimmer_id === swimmer.id) return true;
        return false;
      });
      //   console.log(swimmers);
      setSignedUpSwimmers(swimmers);
    };
    const fetchEvents = async () => {
      let url = `${process.env.BASE_URL}/meetevent?meet_id=${meet_id}`;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let response = await axios.get(url, config);
      //   console.log(response.data);
      setMeetEvents(response.data);
    };
    fetchMeet();
    fetchSignUps();
    fetchSignedUpSwimmers();
    fetchEvents();
  }, []);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="card_for_picking_events_page">
      <h1>Picking Events for: {meet.name}</h1>
      <br />
      <div className="accordion_container">
        {signedUpSwimmers.map((swimmer) => {
          return (
            <Accordion
              key={"swmr" + swimmer.id}
              expanded={expanded === "panel" + swimmer.id}
              onChange={handleAccordionChange("panel" + swimmer.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {swimmer.preferred_first_name
                    ? swimmer.preferred_first_name
                    : swimmer.first_name}{" "}
                  {swimmer.last_name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SwimmerEventPicker
                  key={"swmr" + swimmer.id}
                  swimmer={swimmer}
                  meet={meet}
                  meetEvents={meetEvents}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      <br />
      <br />
      <Button variant="contained" href={`/relays?m=${meet.id}`}>
        Pick relays for this meet
      </Button>
      {/* <Link to={`/relays?m=${meet.id}`}>Pick relays for this meet</Link> */}
    </div>
  );
};

export default PickEventsForMeetPage;
