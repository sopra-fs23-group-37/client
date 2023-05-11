import { useHistory, useParams } from "react-router-dom";
import "styles/views/Home.scss";
import React, { useEffect, useState } from "react";
import { api, handleError } from "../../helpers/api";
import PropTypes from "prop-types";
import noAvatar from "image/noAvatar.png";
import UploadAvatar from 'components/firebase comps/uploadAvatar';
import "styles/views/Header.scss";

const Header = (props) => {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const profileId = sessionStorage.getItem("userId");
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [avatarUrl, setAvatarUrl] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const saveChanges = async () => {

    try {  
        const userId = profileId;
        const requestBody = JSON.stringify({ username, userId, avatarUrl });
        const response = await api.put("/users/" + profileId, requestBody);

        console.log(response);

        sessionStorage.setItem("username", username);
        sessionStorage.setItem("avatarUrl", avatarUrl);

    } catch (error) {
      alert(
        `Something went wrong when trying to save: \n${handleError(error)}`
      );
    }
  };


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

  const showProfile = () => {
    const userId = sessionStorage.getItem("userId");
    history.push(`/game/profile/` + userId);
}

const handleChange = (e) => {
  let selected = e.target.files[0]; // to select the first file (in order someone selects more files)
  console.log(selected); 
  
  if (selected && types.includes(selected.type)) {
    setFile(selected);
    setError('');
  } else {
    setFile(null);
    setError('Please select an image file (png or jpg)');
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


useEffect(() => {
  if (avatarUrl) {
    saveChanges();
  }
}, [avatarUrl]);

  return (
    <div className="header container" style={{ height: props.height }}>
      <div className="title">  Welcome </div>
      {profile &&
          <div class = "image">
              <div class="image-upload">
                <label for="file-input">
                  {avatarUrl && <img alt="Avatar" src={avatarUrl}></img>}
                  {profile.avatarUrl && !avatarUrl && <img alt="Avatar" src={profile.avatarUrl}></img>}
                  {!profile.avatarUrl && !avatarUrl && <img alt="Avatar" src={noAvatar}></img>}
                  

                </label>
                <input id="file-input" type="file" onChange={handleChange}/>
            </div>
            { error && <div className="uploadAvatar output"><div className="error">{ error }</div></div>}
            { file && <div className="uploadAvatar output"><UploadAvatar file={file} setFile={setFile} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} /> </div>}
            <h1>{sessionStorage.getItem("username")}</h1>
            </div>
        }
      <div className="buttons">
        <button className="button" onClick={() => logout()}>
          Logout
        </button>
        <button
          className="button"
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
