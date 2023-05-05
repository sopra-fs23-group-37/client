import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { Link, useHistory } from "react-router-dom";
import { ButtonLight } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={(e) => {
          props.onKeyDown(e);
        }}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Login = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.put("/login", requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("userId", user.userId);
      sessionStorage.setItem("username", user.username);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && password && username) {
      doLogin();
    }
  };

  return (
    <BaseContainer>
      <div className="login form">
        <h1 className="login title">Welcome to 2-10</h1>
        <h2 className="login subtitle">Login</h2>
        <FormField
          label="Username"
          value={username}
          onChange={(un) => setUsername(un)}
          onKeyDown={handleKeyDown}
        />
        <FormField
          label="Password"
          value={password}
          type="password"
          onChange={(n) => setPassword(n)}
          onKeyDown={handleKeyDown}
        />
        <div className="login button-container">
          <ButtonLight
            disabled={!username || !password}
            width="80%"
            onClick={() => doLogin()}>
            Login
          </ButtonLight>
          <div class="hr-sect"> or </div>
          <Link to="/registration">
            <ButtonLight width="80%">Register</ButtonLight>
          </Link>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
