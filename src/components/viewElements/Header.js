import { useHistory } from "react-router-dom";
import "styles/views/Home.scss";
import React, { useEffect } from "react";
import { api } from "../../helpers/api";
import PropTypes from "prop-types";
import "styles/viewElements/Header.scss";
import { getAvatar } from "helpers/getAvatar";

const Header = (props) => {
  const history = useHistory();
  const username = sessionStorage.getItem("username");

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

  useEffect(() => {});

  return (
    <div className="header container" style={{ height: props.height }}>
      {username && (
        <div className="image">
          <div className="image-upload">
            <img alt="Avatar" src={getAvatar(username)}></img>
          </div>
          <h1>{sessionStorage.getItem("username")}</h1>
        </div>
      )}
      <div className="title"> Welcome to 2-and-10</div>
      <div className="buttons">
        <button className="button" onClick={() => showRulebook()}>
          Rulebook
        </button>
        <button className="button" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;
