import React from "react";
import { api, handleError } from "helpers/api";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import { useHistory } from "react-router-dom";

const rulebook = () => {
  console.log(localStorage.getItem("token"));
  console.log(localStorage.getItem("userId"));
};

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

  return (
    <div className="header container" style={{ height: props.height }}>
      <h1 className="header title">Welcome User</h1>{" "}
      <div className="header buttons">
        {" "}
        <button className="header logoutButton" onClick={() => logout()}>
          Logout{" "}
        </button>{" "}
        <button className="header rulebookButton" onClick={() => rulebook()}>
          Rulebook{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;
