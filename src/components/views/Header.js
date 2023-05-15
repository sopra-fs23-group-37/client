import { useHistory } from "react-router-dom";
import "styles/views/Home.scss";
import React, { useEffect, useState } from "react";
import { api, handleError } from "../../helpers/api";
import PropTypes from "prop-types";
import noAvatar from "image/noAvatar.png";
import UploadAvatar from "components/firebase comps/uploadAvatar";
import "styles/views/Header.scss";

const Header = (props) => {
  const history = useHistory();
  const userId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");
  const types = ["image/png", "image/jpeg"];

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

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

  const handleChange = (e) => {
    let selected = e.target.files[0]; // to select the first file (in order someone selects more files)
    console.log(selected);

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError(
        <div
          style={{
            color: "red",
            marginLeft: "20px",
            marginTop: "22px",
            fontSize: "10px",
          }}
        >
          Please select an
          <p style={{ marginTop: "5px" }}>image file</p>
          <p style={{ marginTop: "2px" }}>(png or jpg)!</p>
        </div>
      );
    }
  };

  useEffect(() => {
    const fetchProfile = async (profileId) => {
      try {
        const response = await api.get("/users/" + profileId);

        setProfile(response.data);

        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);
      } catch (error) {
        alert(
          `Something went wrong while fetching the Profile: \n${handleError(
            error
          )}`
        );
      }
    };
    fetchProfile(userId);
  }, [userId]);

  useEffect(() => {
    const saveChanges = async () => {
      try {
        const requestBody = JSON.stringify({ userId, avatarUrl });
        const response = await api.put("/users/" + userId, requestBody);

        console.log(response);
        sessionStorage.setItem("avatarUrl", avatarUrl);
      } catch (error) {
        alert(
          `Something went wrong when trying to save: \n${handleError(error)}`
        );
      }
    };
    if (avatarUrl) {
      saveChanges().catch((error) => {
        console.error(error);
        // handle the error
      });
    }
  }, [avatarUrl, userId, username]);

  return (
    <div className="header container" style={{ height: props.height }}>
      {profile && (
        <div class="image">
          <div class="image-upload">
            <label for="file-input">
              {avatarUrl && <img alt="Avatar" src={avatarUrl}></img>}
              {profile.avatarUrl && !avatarUrl && (
                <img alt="Avatar" src={profile.avatarUrl}></img>
              )}
              {!profile.avatarUrl && !avatarUrl && (
                <img alt="Avatar" src={noAvatar}></img>
              )}
            </label>
            <input id="file-input" type="file" onChange={handleChange} />
          </div>
          {error && (
            <div className="uploadAvatar output">
              <div className="error">{error}</div>
            </div>
          )}
          {file && (
            <div className="uploadAvatar output">
              <UploadAvatar
                file={file}
                setFile={setFile}
                avatarUrl={avatarUrl}
                setAvatarUrl={setAvatarUrl}
              />{" "}
            </div>
          )}
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
