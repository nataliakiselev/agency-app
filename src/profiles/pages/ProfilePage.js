import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../shared/UI/Card";
import Button from "../../shared/FormElements/Button";
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
    avatar:
      "https://r.search.yahoo.com/_ylt=AwrJ7B0ZjedeKfsAbsX.3olQ;_ylu=X3oDMTBpcGszamw0BHNlYwNmcC1pbWcEc2xrA2ltZw--/RV=2/RE=1592262041/RO=11/RU=https%3a%2f%2fwallpapersite.com%2fimages%2fwallpapers%2fgigi-hadid-1440x2560-fashion-model-hd-11260.jpg/RK=2/RS=xIGnMETOMA3T9y8jussyfTqbC7U-",
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
