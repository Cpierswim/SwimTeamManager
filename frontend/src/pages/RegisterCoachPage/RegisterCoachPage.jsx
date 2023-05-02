import React, { useEffect, useState } from "react";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:5000/api";

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
      let response = await axios.post(`${BASE_URL}/auth/register`, final_data);
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
      let url = `${BASE_URL}/groups?team_id=1/`;
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
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add a coach account</h2>
      <label>
        Userame:{" "}
        <input
          type="text"
          required
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Password:{" "}
        <input
          type="text"
          required
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <label>
        First Name:{" "}
        <input
          type="text"
          required
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Last Name:{" "}
        <input
          type="text"
          required
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        email:{" "}
        <input
          type="text"
          required
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <h6>Which groups to coach?</h6>
      {groups.map((group) => {
        return (
          <div key={group.id}>
            <label>
              <input
                type="checkbox"
                value={`${group.id}`}
                name={`group${group.id}`}
                checked={formData[`group${group.id}`]}
                onChange={handleInputChange}
              />{" "}
              {group.group_name}
            </label>
            <br />
          </div>
        );
      })}
      <button>Sumit</button>
    </form>
  );
};

export default RegisterCoachPage;
