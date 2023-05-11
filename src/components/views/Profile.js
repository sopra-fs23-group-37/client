import { useHistory, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import { useEffect, useState } from "react";
import { api, handleError } from "../../helpers/api";
import { Spinner } from "../ui/Spinner";
import { Button } from "../ui/Button";
import noAvatar from "image/noAvatar.png";
import Header from "components/views/Header";
import "styles/views/Profile.scss";

const Profile = () => {
  const history = useHistory();
  const profileId = useParams().profileId;
  const [profile, setProfile] = useState(null);

  const logout = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await api.put("/logout/" + userId);
      console.log(response);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      history.push("/login");
    } catch (error) {
      alert(
        `Something went wrong when trying to logout: \n${handleError(error)}`
      );
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      history.push("/login");
    }
  };

  const editProfile = () => {
    history.push("/game/profile-edit/" + profileId);
  };

  const goToOverview = () => {
    history.push("/game/dashboard");
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

  if (profile) {
    let bday = "";
    if (profile.birthday != null) {
      bday = profile.birthday.split("T")[0];
    }
    let cday = "";
    if (profile.creation_date != null) {
      cday = profile.creation_date.split("T")[0];
    }
    content = (
      <div className="profile" >
      <div className="profile container">
            <div className="profile form">
              <div className = "avatar">
                { profile.avatarUrl && (<img alt="Avatar" src={profile.avatarUrl}></img>)}
                { !profile.avatarUrl && (<img alt="Avatar" src={noAvatar}></img>)}
              </div>
                  {profile.username && <h1>Username: {profile.username}</h1>}
                  {<h1>Birthday: {bday}</h1>}
                  <Button width="100%" onClick={() => editProfile()}>
                    Edit Profile
                  </Button>
                  <Button width="100%" onClick={() => goToOverview()}>
                    Return to Overview
                  </Button>
                  <Button width="100%" onClick={() => logout()}>
                    Logout
                  </Button>
            </div>
            


            </div>
      </div>
    );
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default Profile;
