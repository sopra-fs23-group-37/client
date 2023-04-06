import { useHistory, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import React, { useEffect, useState } from "react";
import { api, handleError } from "../../helpers/api";
import { Spinner } from "../ui/Spinner";
import { Button } from "../ui/Button";
import PropTypes from "prop-types";

const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

const ProfileEdit = () => {
  const history = useHistory();
  const profileId = useParams().profileId;
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [birthday, setBirthday] = useState(localStorage.getItem('birthday'));

  const logout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.put("/logout/" + userId);
      console.log(response);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      history.push("/login");
    } catch (error) {
      alert(
        `Something went wrong when trying to logout: \n${handleError(error)}`
      );
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      history.push("/login");
    }
  };

  const returnToProfile = () => {
    history.push("/game/profile/" + profileId);
  };

  const saveUpdates = async () => {
    try {
      const requestBody = JSON.stringify({ username, birthday });
      const response = await api.put("/users/" + profileId, requestBody);
      
      console.log(response);

      localStorage.setItem("username", username);
      localStorage.setItem("birthday", birthday);
      // Registration successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game/profile/` + profileId);
    } catch (error) {
      alert(
        `Something went wrong when trying to save: \n${handleError(error)}`
      );
    }
  };

  useEffect(() => {
    async function fetchProfile(profileId) {
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
    }
    fetchProfile(profileId);
  }, [profileId]);

  let content = <Spinner />;

  if (profileId !== localStorage.getItem("userId")) {
    content = (
      <div className="profile">
        <p>
          This is not your profile and you are not allowed to edit it. <br />{" "}
          Please go to your own profile if you want to make edits
        </p>
        <Button width="100%" onClick={() => returnToProfile()}>
          Back
        </Button>
        <Button width="100%" onClick={() => logout()}>
          Logout
        </Button>{" "}
      </div>
    );
    console.log("profile ID: ", profileId);
    console.log("user ID: ", localStorage.getItem("userId"));
  } else if (profile) {
    content = (
      <div className="profile">
        <div>Profile id: {profileId}</div>
        <FormField
          label="New Username:"
          value={username}
          onChange={(un) => setUsername(un)}
          type="text"
          placeholder={profile.username}
        />
        <FormField
          label="New Birthday:"
          value={birthday}
          onChange={(bd) => setBirthday(bd)}
          type="date"
          placeholder={profile.birthday}
        />
        <Button width="100%" onClick={() => saveUpdates()}>
          Save
        </Button>
        <Button width="100%" onClick={() => returnToProfile()}>
          Back
        </Button>
        <Button width="100%" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="game container">
      <h2>Edit Profile</h2>
      {content}
    </BaseContainer>
  );
};

export default ProfileEdit;
