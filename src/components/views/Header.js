import React from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "styles/views/Header.scss";

// TODO: Rulebook anzeigen lassen


const Header = (props) => {
  const history = useHistory();

  const logout = async () => {
    try {
      const localId = localStorage.getItem("userId");

      await api.put("logout/" + localId);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Redirect to the login page
      window.location.reload();
    } catch (error) {
      alert(`Changes could not be stored: \n${handleError(error)}`);
      console.error("Error logging out:", error);
    }
  };

  const showRulebook = () => {
    history.push("/rulebook");
  };

  return (
    <div className="header container" style={{ height: props.height }}>
      <h1 className="header title">{props.title}</h1>
      <div className="header buttons">
        <button className="header logoutButton" onClick={() => logout()}>
          Logout
        </button>
        <button className="header rulebookButton" onClick={() => showRulebook()}>
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
