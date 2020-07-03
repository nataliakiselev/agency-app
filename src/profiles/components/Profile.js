import React, { useContext } from "react";
import ProfileCard from "./ProfileCard";
// import { Button } from "@material-ui/core";
// import { AuthContext } from "../../shared/context/AuthContext";
const Profile = ({ profile }) => {
  return <ProfileCard {...profile} />;

  //  GridList
};

export default Profile;
