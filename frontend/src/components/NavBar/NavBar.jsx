import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box className="forceheight" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Swim Team Manager
          </Typography>
          {user != null ? (
            user.type === 1 ? (
              <Button color="inherit" onClick={() => navigate("/")}>
                Parent Page
              </Button>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {user != null ? (
            user.type === 2 ? (
              <Button color="inherit" onClick={() => navigate("/")}>
                Coach Page
              </Button>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {!user ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          )}

          {console.log("USER:")}
          {console.log(user)}
        </Toolbar>
      </AppBar>
    </Box>

    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark height-40">
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarsExample08"
    //     aria-controls="navbarsExample08"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>

    //   <div
    //     className="collapse navbar-collapse justify-content-md-center"
    //     id="navbarsExample08"
    //   >
    //     <ul className="navbar-nav">
    //       <li className="nav-item active">
    //         <a className="nav-link" href="#">
    //           Swim Team Manager
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/">
    //           Home
    //         </Link>
    //       </li>
    //       {/* <li className="nav-item">
    //         <a className="nav-link disabled" href="#">
    //           Parent
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link disabled" href="#">
    //           Coach
    //         </a>
    //       </li> */}
    //       <li className="nav-item">
    //         {user ? (
    //           <button onClick={logoutUser}>Logout</button>
    //         ) : (
    //           <button onClick={() => navigate("/login")}>Login</button>
    //         )}
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default Navbar;
