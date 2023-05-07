// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import RegisterCoachPage from "./pages/RegisterCoachPage/RegisterCoachPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import SwimmerGroupsPage from "./pages/SwimmerGroupsPage/SwimmerGroupsPage";
import MapPage from "./pages/MapPage/MapPage";
import MeetSignupPage from "./pages/MeetSignupPage/MeetSignupPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register_coach"
          element={
            <PrivateRoute>
              <RegisterCoachPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <PrivateRoute>
              <GroupsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/swimmersgroups"
          element={
            <PrivateRoute>
              <SwimmerGroupsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <MapPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/meetsignup"
          element={
            <PrivateRoute>
              <MeetSignupPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/results"
          element={
            <PrivateRoute>
              <ResultsPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
