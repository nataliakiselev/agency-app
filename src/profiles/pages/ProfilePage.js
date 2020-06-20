import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import Profile from "../components/Profile";
import UpdateProfile from "../components/UpdateProfile";
import WarningModal from "../../shared/UI/WarningModal";
import { AuthContext } from "../../shared/context/AuthContext";
import "../components/Profile.css";
import { useContext } from "react";

const DUMMY_PROFILES = [
  {
    id: "v1",
    name: {
      first: "Linda",
      last: "Cara",
    },

    height: "177 cm",
    waist: "58 cm",
    hips: "88 cm",
    shoeSize: "6",
    hairColour: "brown",
    eyeColour: "grey-blue",
    email: "linda.cara@gmail.com",
    phone: 7588442244,
    agent: "u1",
  },
  {
    id: "v2",
    name: {
      first: "Vanda",
      last: "Pawlowska",
    },

    height: "179 cm",
    waist: "60 cm",
    hips: "89 cm",
    shoeSize: "7",
    hairColour: "blonde",
    eyeColour: "green",
    email: "v.pawlowska@me.com",
    phone: 7788555555,
    agent: "u1",
  },
];

const ProfilePage = () => {
  const auth = useContext(AuthContext);
  const profileId = useParams().profileId;

  const identifiedProfile = DUMMY_PROFILES.find((p) => p.id === profileId);
  // console.log(profileId);
  // console.log(identifiedProfile);

  const [viewMode, setViewMode] = useState(true);

  const handleUpdate = () => {
    setViewMode(false);
  };
  const handleCancel = () => {
    setViewMode(true);
  };
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const confirmDeleteHandler = () => {
    console.log("deleting..");
    //.....
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  return (
    <div>
      {viewMode ? (
        <React.Fragment>
          <WarningModal
            open={showConfirmModal}
            onClose={cancelDeleteHandler}
            header="Are you sure?"
            footer={
              <React.Fragment>
                <Button onClick={cancelDeleteHandler}>Cancel</Button>
                <Button onClick={confirmDeleteHandler}>Delete</Button>
              </React.Fragment>
            }
          />
          <Profile props={identifiedProfile} />
        </React.Fragment>
      ) : (
        <UpdateProfile props={(identifiedProfile, { onClick: handleCancel })} />
      )}
      {auth.isLoggedIn && (
        <div className="profile-item__actions">
          <Button onClick={handleUpdate}>Edit</Button>
          <Button danger onClick={showWarningHandler}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
