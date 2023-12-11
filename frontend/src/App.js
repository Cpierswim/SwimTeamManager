// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import {
  GroupsPage, 
  HomePage, 
  LoginPage,
  MapPage,
  MeetSignupPage,
  PickEventsForMeetPage,
  RegisterCoachPage,
  RegisterPage,
  RelayPickerPage,
  ResultsPage,
  SwimmerGroupsPage,
  TestPage
} from "./pages"
// ^^ this is more stylistic but also just more representative of exactly
// what's happening.. see the pages/index.js for how the export is done from
// there. You could do the same thing with components, hooks, utils.. just cleaner

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

//Material UI Imports
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import TestPage from "./pages/TestPage/TestPage";

function App() {
  return (
    <div style={{ height: "100%" }}>
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
        <Route
          path="/selectmeet"
          element={
            <PrivateRoute>
              <PickEventsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/selectformeet"
          element={
            <PrivateRoute>
              <PickEventsForMeetPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/relays"
          element={
            <PrivateRoute>
              <RelayPickerPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
