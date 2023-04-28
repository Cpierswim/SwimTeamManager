import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const HomePage = () => {
  const [user, token] = useAuth();

  const loggedInUser = () => {
    return <h1>Home Page for {user.username}!</h1>;
  };

  const anonymousUser = () => {
    return <h1>JCC Stingrays</h1>;
  };
  return (
    <div className="container">{user ? loggedInUser() : anonymousUser()}</div>
  );
};

export default HomePage;
