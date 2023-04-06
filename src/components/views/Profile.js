import { useHistory, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import { useEffect, useState } from "react";
import { api, handleError } from "../../helpers/api";
import { Spinner } from "../ui/Spinner";
import { Button } from "../ui/Button";

const Profile = () => {
  const history = useHistory();
  const profileId = useParams().profileId;
  const [profile, setProfile] = useState(null);

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
      <div className="profile overview">
        <div>Profile id: {profileId}</div>
        <div>Username: {profile.username}</div>
        <div>Status: {profile.status}</div>
        <div>Created on: {cday}</div>
        <div>Birthday: {bday}</div>
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
    );
  }

  return (
    <BaseContainer className="game container">
      <h2>Profile Overview</h2>
      {content}
    </BaseContainer>
  );
};

export default Profile;
