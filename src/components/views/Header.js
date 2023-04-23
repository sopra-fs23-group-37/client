import React from "react";
import { api } from "helpers/api";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "styles/views/Header.scss";

const Header = (props) => {
  const history = useHistory();

  const logout = async () => {
    try {
      const localId = sessionStorage.getItem("userId");

      await api.put("logout/" + localId);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");

      // Redirect to the login page
      history.push("/login");
    } catch (error) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      history.push("/login");
    }
  };

  const showRulebook = () => {
    history.push("/rulebook");
  };

  return (
    <div className="header container" style={{ height: props.height }}>
      <h1 className="header title">{props.title}</h1>
      <h1>
        {" "}
        {props.text}
        {sessionStorage.getItem("username")}{" "}
      </h1>
      <div className="header buttons">
        <button className="header logoutButton" onClick={() => logout()}>
          Logout
        </button>
        <button
          className="header rulebookButton"
          onClick={() => showRulebook()}>
          Rulebook
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;
