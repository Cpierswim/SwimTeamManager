import React, { useEffect, useState } from "react";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterCoachPage.css";
import { TextField, Button } from "@mui/material";

const COACH_TYPE = 2;

const RegisterCoachPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "swim",
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    handleRegisterCoach
  );

  async function handleRegisterCoach(data) {
    try {
      let final_data = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.email,
        password: data.password,
        type: COACH_TYPE,
      };
      let groups = [];
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].includes("group") && data[keys[i]]) {
          groups.push(parseInt(keys[i].replace("group", "")));
        }
      }
      final_data.groups = groups;
      console.log(final_data);
      let response = await axios.post(`${process.env.BASE_URL}/auth/register`, final_data);
      if (response.status === 201) {
        console.log("Successful registration! Log in to access token");
        navigate("/");
      } else {
        navigate("/register_coach");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    const fetchGroups = async () => {
      let url = `${process.env.BASE_URL}/groups?team_id=1/`;
      let response = await axios.get(url);
      let temp = response.data;
      for (let i = 0; i < temp.length; i++) {
        defaultValues[`group${temp[i].id}`] = false;
      }
      setGroups(response.data);
    };

    fetchGroups();
  }, []);

  return (
    <form className="register_coach_form" onSubmit={handleSubmit}>
      <h2>Add a Coach Account</h2>
      <div className="split">
        <div className="half">
          <TextField
            color="primary"
            fullWidth
            label="Username"
            multiline={false}
            required
            size="medium"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            InputLabelProps={{ className: "white-label" }}
            inputProps={{ className: "white-text" }}
          />
          <TextField
            color="primary"
            fullWidth
            label="Password"
            multiline={false}
            required
            size="medium"
            name="username"
            value={formData.password}
            onChange={handleInputChange}
            InputLabelProps={{ className: "white-label" }}
            inputProps={{ className: "white-text" }}
          />

          <TextField
            color="primary"
            fullWidth
            label="Email"
            multiline={false}
            required
            size="medium"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            InputLabelProps={{ className: "white-label" }}
            inputProps={{ className: "white-text" }}
          />
        </div>
        <div className="half">
          <TextField
            color="primary"
            fullWidth
            label="First Name"
            multiline={false}
            required
            size="medium"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            InputLabelProps={{ className: "white-label" }}
            inputProps={{ className: "white-text" }}
          />
          <TextField
            color="primary"
            fullWidth
            label="Last Name"
            multiline={false}
            required
            size="medium"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            InputLabelProps={{ className: "white-label" }}
            inputProps={{ className: "white-text" }}
          />
        </div>
      </div>

      <h5 className="group_label">Which groups to coach?</h5>
      <div className="groups_list">
        {groups.map((group) => {
          return (
            <label key={group.id}>
              <input
                type="checkbox"
                value={`${group.id}`}
                name={`group${group.id}`}
                checked={formData[`group${group.id}`]}
                onChange={handleInputChange}
              />{" "}
              {group.group_name}
            </label>
          );
        })}
      </div>
      <div className="group_label">
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegisterCoachPage;
