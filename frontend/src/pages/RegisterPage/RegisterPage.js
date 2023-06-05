import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "./RegisterPage.css";
import { TextField, Button } from "@mui/material";

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
    // formData.password = formData.password.trim();
    // formData.password_check = formData.password_check.trim();
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

  const SwimmerForm = () => {
    return (
      <form className="form3" onSubmit={partThreeSubmit}>
        <h2>Add the first swimmer</h2>
        <label>
          Legal First Name:{" "}
          <input
            type="text"
            required
            name="swimmerFirstName"
            value={swimmerFirstName}
            onChange={(event) => setSwimmerFirstName(event.target.value)}
          />
        </label>
        <label>
          Preferred First Name:{" "}
          <input
            type="text"
            name="swimmerPreferredFirstName"
            value={swimmerPreferredFirstName}
            onChange={(event) =>
              setSwimmerPreferredFirstName(event.target.value)
            }
          />
        </label>
        <label>
          Middle Name:{" "}
          <input
            type="text"
            required
            name="swimmerMiddleName"
            value={swimmerMiddleName}
            onChange={(event) => setSwimmerMiddleName(event.target.value)}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            required
            name="swimmerLastName"
            placeholder={formData.lastName}
            value={swimmerLastName}
            onChange={(event) => setSwimmerLastName(event.target.value)}
          />
        </label>
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
