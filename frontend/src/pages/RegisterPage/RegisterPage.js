import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "./RegisterPage.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const NOTHING_COMPLETE = 1;
const USER_CREATION_COMPLETE = 2;
const PARENT_CREATION_COMPLETE = 3;

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const [registrationStatus, setRegistrationStatus] =
    useState(NOTHING_COMPLETE);
  const [swimmers, setSwimmers] = useState([]);
  const [swimmerFirstName, setSwimmerFirstName] = useState("");
  const [swimmerPreferredFirstName, setSwimmerPreferredFirstName] =
    useState("");
  const [swimmerMiddleName, setSwimmerMiddleName] = useState("");
  const [swimmerLastName, setSwimmerLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("F");
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    password_check: "",
    firstName: "",
    lastName: "",
    phone: "",
    address_line_one: "",
    address_line_two: "",
    city: "",
    state: "",
    zipcode: "",
    type: 1,
    swimmers: [],
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );
  const [passwordError, setPasswordError] = useState(false);

  const partOneSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.password_check) {
      setPasswordError(false);
      setRegistrationStatus(USER_CREATION_COMPLETE);
    } else {
      formData.password = "";
      formData.password_check = "";
      setPasswordError(true);
    }
  };

  const partTwoSubmit = (e) => {
    e.preventDefault();
    setRegistrationStatus(PARENT_CREATION_COMPLETE);
  };

  const partThreeSubmit = (e) => {
    e.preventDefault();
    let swimmer = addSwimmer();
    let final_swimmers = [...swimmers, swimmer];
    handleSubmit(e, final_swimmers);
  };

  const addSwimmer = () => {
    let swimmer = {
      first_name: swimmerFirstName,
      middle_name: swimmerMiddleName,
      last_name: swimmerLastName,
      preferred_first_name: swimmerPreferredFirstName,
      birthdate: birthdate,
      gender: gender,
    };

    let temp = [...swimmers, swimmer];
    setSwimmers(temp);
    setSwimmerFirstName("");
    setSwimmerPreferredFirstName("");
    setSwimmerMiddleName("");
    setBirthdate("");
    setGender("");
    return swimmer;
  };

  const UserForm = () => {
    return (
      <form className="form1" onSubmit={partOneSubmit}>
        <h2>Create the user account</h2>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <button>Contine to add a Parent</button>
      </form>
    );
  };

  const UserForm2 = () => {
    return (
      <form className="form1" onSubmit={partOneSubmit}>
        <h2 className="white_text">Create the user account</h2>
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
          label="First Name"
          multiline={false}
          required
          size="medium"
          name="firstName"
          value={formData.firstName}
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
          name="lastName"
          value={formData.lastName}
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
          value={formData.email}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />

        {passwordError ? (
          <p className="password_error">Passwords must match</p>
        ) : (
          <></>
        )}

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

        <TextField
          color="primary"
          fullWidth
          label="Please enter password again"
          type="password"
          multiline={false}
          required
          size="medium"
          name="password_check"
          value={formData.password_check}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />

        <Button
          type="submit"
          className="buttonpadding"
          size="large"
          variant="contained"
        >
          Contine to Add a Parent to the Account
        </Button>
      </form>
    );
  };

  const ParentForm = () => {
    return (
      <form className="form2" onSubmit={partTwoSubmit}>
        <h2>Add a parent to the account</h2>
        <label>
          Phone:{" "}
          <input
            type="text"
            required
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address Line One:{" "}
          <input
            type="text"
            required
            name="address_line_one"
            value={formData.address_line_one}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address Line Two:{" "}
          <input
            type="text"
            name="address_line_two"
            value={formData.address_line_two}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:{" "}
          <input
            type="text"
            required
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          State:{" "}
          <select
            type="text"
            required
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </label>
        <label>
          Zipcode:{" "}
          <input
            type="text"
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
          />
        </label>
        <button>Contine to add a Swimmer</button>
      </form>
    );
  };

  const ParentForm2 = () => {
    return (
      <form className="form2" onSubmit={partTwoSubmit}>
        <h2 className="white_text">Add a parent to the account</h2>
        <TextField
          color="primary"
          fullWidth
          label="phone"
          multiline={false}
          required
          size="medium"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />
        <TextField
          color="primary"
          fullWidth
          label="address_line_one"
          multiline={false}
          required
          size="medium"
          name="address_line_one"
          value={formData.address_line_one}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />
        <TextField
          color="primary"
          fullWidth
          label="address_line_two"
          multiline={false}
          size="medium"
          name="address_line_two"
          value={formData.address_line_two}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />
        <div className="inline_flex">
          <TextField
            color="primary"
            fullWidth
            label="city"
            multiline={false}
            required
            size="medium"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            InputLabelProps={{ className: "white-label" }}
            inputProps={{ className: "white-text" }}
            className="more_margin"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.state}
              label="State"
              name="state"
              required
              autoWidth
              className="forceWhite more_margin"
              onChange={handleInputChange}
            >
              <MenuItem value={"AL"}>Alabama</MenuItem>
              <MenuItem value={"AK"}>Alaska</MenuItem>
              <MenuItem value={"AZ"}>Arizona</MenuItem>
              <MenuItem value={"AR"}>Arkansas</MenuItem>
              <MenuItem value={"CA"}>California</MenuItem>
              <MenuItem value={"CO"}>Colorado</MenuItem>
              <MenuItem value={"CT"}>Connecticut</MenuItem>
              <MenuItem value={"DE"}>Delaware</MenuItem>
              <MenuItem value={"DC"}>District of Columbia</MenuItem>
              <MenuItem value={"FL"}>Florida</MenuItem>
              <MenuItem value={"GA"}>Georgia</MenuItem>
              <MenuItem value={"HI"}>Hawaii</MenuItem>
              <MenuItem value={"ID"}>Idaho</MenuItem>
              <MenuItem value={"IL"}>Illinois</MenuItem>
              <MenuItem value={"IN"}>Indiana</MenuItem>
              <MenuItem value={"IA"}>Iowa</MenuItem>
              <MenuItem value={"KS"}>Kansas</MenuItem>
              <MenuItem value={"KY"}>Kentucky</MenuItem>
              <MenuItem value={"LA"}>Louisiana</MenuItem>
              <MenuItem value={"ME"}>Maine</MenuItem>
              <MenuItem value={"MD"}>Maryland</MenuItem>
              <MenuItem value={"MA"}>Massachusetts</MenuItem>
              <MenuItem value={"MI"}>Michigan</MenuItem>
              <MenuItem value={"MN"}>Minnesota</MenuItem>
              <MenuItem value={"MS"}>Mississippi</MenuItem>
              <MenuItem value={"MO"}>Missouri</MenuItem>
              <MenuItem value={"MT"}>Montana</MenuItem>
              <MenuItem value={"NE"}>Nebraska</MenuItem>
              <MenuItem value={"NV"}>Nevada</MenuItem>
              <MenuItem value={"NH"}>New Hampshire</MenuItem>
              <MenuItem value={"NJ"}>New Jersey</MenuItem>
              <MenuItem value={"NM"}>New Mexico</MenuItem>
              <MenuItem value={"NY"}>New York</MenuItem>
              <MenuItem value={"NC"}>North Carolina</MenuItem>
              <MenuItem value={"ND"}>North Dakota</MenuItem>
              <MenuItem value={"OH"}>Ohio</MenuItem>
              <MenuItem value={"OK"}>Oklahoma</MenuItem>
              <MenuItem value={"OR"}>Oregon</MenuItem>
              <MenuItem value={"PA"}>Pennsylvania</MenuItem>
              <MenuItem value={"RI"}>Rhode Island</MenuItem>
              <MenuItem value={"SC"}>South Carolina</MenuItem>
              <MenuItem value={"SD"}>South Dakota</MenuItem>
              <MenuItem value={"TN"}>Tennessee</MenuItem>
              <MenuItem value={"TX"}>Texas</MenuItem>
              <MenuItem value={"UT"}>Utah</MenuItem>
              <MenuItem value={"VT"}>Vermont</MenuItem>
              <MenuItem value={"VA"}>Virginia</MenuItem>
              <MenuItem value={"WA"}>Washington</MenuItem>
              <MenuItem value={"WV"}>West Virginia</MenuItem>
              <MenuItem value={"WI"}>Wisconsin</MenuItem>
              <MenuItem value={"WY"}>Wyoming</MenuItem>
            </Select>
          </FormControl>
          <TextField
            color="primary"
            fullWidth
            label="zipcode"
            multiline={false}
            required
            size="medium"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            InputLabelProps={{ className: "white-label" }}
            inputProps={{ className: "white-text" }}
            className="more_margin"
          />
        </div>
        <Button
          type="submit"
          className="buttonpadding"
          size="large"
          variant="contained"
        >
          Contine to add a Swimmer
        </Button>
      </form>
    );
  };

  const SwimmerForm = () => {
    return (
      <form className="form3 white_text" onSubmit={partThreeSubmit}>
        <h2 className="white_text">Add the First Swimmer</h2>
        <label className="full_width">
          Legal First Name:{" "}
          <input
            type="text"
            required
            name="swimmerFirstName"
            className="full_width curve"
            value={swimmerFirstName}
            onChange={(event) => setSwimmerFirstName(event.target.value)}
          />
        </label>
        <label className="full_width">
          Preferred First Name:{" "}
          <input
            type="text"
            name="swimmerPreferredFirstName"
            className="full_width curve"
            value={swimmerPreferredFirstName}
            onChange={(event) =>
              setSwimmerPreferredFirstName(event.target.value)
            }
          />
        </label>
        <label className="full_width">
          Middle Name:{" "}
          <input
            type="text"
            className="full_width curve"
            name="swimmerMiddleName"
            value={swimmerMiddleName}
            onChange={(event) => setSwimmerMiddleName(event.target.value)}
          />
        </label>
        <label className="full_width">
          Last Name:{" "}
          <input
            type="text"
            required
            className="full_width curve"
            name="swimmerLastName"
            placeholder={formData.lastName}
            value={swimmerLastName}
            onChange={(event) => setSwimmerLastName(event.target.value)}
          />
        </label>
        <div className="inline_flex2">
          <label>
            Birthdate:{" "}
            <input
              type="date"
              required
              name="birthdate"
              placeholder={formData.lastName}
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
            />
          </label>
          <label>
            Gender:{" "}
            <select
              type="text"
              required
              name="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </label>
        </div>
        <div className="muti_buttons">
          <Button
            type="button"
            className="buttonpadding button_margin"
            size="large"
            variant="contained"
            onClick={addSwimmer}
            id="add_another"
          >
            Add Another Swimmer
          </Button>
          <Button
            type="submit"
            className="buttonpadding button_margin"
            size="large"
            variant="contained"
            id="complete"
          >
            Complete Registration
          </Button>
        </div>
        {/* <button type="button" onClick={addSwimmer} id="add_another">
          Add Another Swimmer
        </button>
        <button id="complete">Complete Registration</button> */}
      </form>
    );
  };

  const SwimmerForm2 = () => {
    return (
      <form className="form3" onSubmit={partThreeSubmit}>
        <h2 className="white_text">Add the First Swimmer</h2>
        <TextField
          color="primary"
          fullWidth
          label="Legal First Name as it appears on Birth Certificate"
          multiline={false}
          required
          size="medium"
          name="swimmerFirstName"
          value={formData.swimmerFirstName}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />
        <TextField
          color="primary"
          fullWidth
          label="Preferred First Name as they are Generally Referred to"
          multiline={false}
          size="medium"
          name="swimmerPreferredFirstName"
          value={formData.swimmerPreferredFirstName}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />
        <TextField
          color="primary"
          fullWidth
          label="Middle Name"
          multiline={false}
          size="medium"
          name="swimmerMiddleName"
          value={formData.swimmerMiddleName}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />
        <TextField
          color="primary"
          fullWidth
          label="Last Name"
          required
          multiline={false}
          size="medium"
          name="swimmerLastName"
          value={formData.swimmerLastName}
          onChange={handleInputChange}
          InputLabelProps={{ className: "white-label" }}
          inputProps={{ className: "white-text" }}
        />
        <div className="inline_flex">
          <label className="inline_flex white-label">
            Birthdate:{" "}
            <input
              type="date"
              required
              name="birthdate"
              placeholder={formData.lastName}
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
            />
          </label>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Legal Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.gender}
              label="Legal Gender"
              name="gender"
              required
              autoWidth
              className="forceWhite more_margin share_width"
              onChange={handleInputChange}
              defaultValue={"F"}
            >
              <MenuItem value={"F"}>Female</MenuItem>
              <MenuItem value={"M"}>Male</MenuItem>
            </Select>
          </FormControl>
        </div>

        <button type="button" onClick={addSwimmer} id="add_another">
          Add Another Swimmer
        </button>
        <button id="complete">Complete Registration</button>
      </form>
    );
  };

  const getFormByRegistrationStatus = () => {
    switch (registrationStatus) {
      case NOTHING_COMPLETE:
        return UserForm2();
      case USER_CREATION_COMPLETE:
        return ParentForm2();
      case PARENT_CREATION_COMPLETE:
        return SwimmerForm();
      default:
        return <></>;
    }
  };

  return <div className="main_part">{getFormByRegistrationStatus()}</div>;
};

export default RegisterPage;
