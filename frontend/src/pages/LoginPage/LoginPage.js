import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { TextField, Button } from "@mui/material";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="main_part">
      <form className="inputform" onSubmit={handleSubmit}>
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
          type="password"
          multiline={false}
          required
          size="medium"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link className="link" to="/register">
          Click to create an account and register for the team!
        </Link>
        <Button
          type="submit"
          className="buttonpadding"
          size="large"
          variant="contained"
        >
          Login!
        </Button>
        {/* <button>Login!</button> */}
      </form>
    </div>
  );
};

export default LoginPage;
