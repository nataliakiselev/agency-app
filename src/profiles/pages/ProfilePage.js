import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import Profile from "../components/Profile";
import UpdateProfile from "../components/UpdateProfile";
import WarningModal from "../../shared/UI/WarningModal";
import { AuthContext } from "../../shared/context/AuthContext";
import "../components/Profile.css";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const ProfilePage = () => {
  const auth = useContext(AuthContext);
  const profileId = useParams().profileId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProfile, setLoadedProfile] = useState();
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const doFetch = async () => {
      setError(null);
      setIsLoading(true);
      try {
        console.log(profileId, "profileId");
        console.log("calling");
        const response = await fetch(
          `http://localhost:4000/api/profiles/${profileId}`,
        );

        console.log(response);

        const resJson = await response.json();
        if (!response.ok) {
          throw new Error(resJson.message);
        }
        console.log(resJson);
        setLoadedProfile(resJson.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };
    doFetch();
  }, [profileId]);

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
      {isLoading && <LoadingSpinner />}
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
      {viewMode ? (
        <React.Fragment>
          <WarningModal
            open={showConfirmModal}
            onClose={cancelDeleteHandler}
            header="Are you sure?"
            footer={
              <React.Fragment>
                <Button variant="contained" onClick={cancelDeleteHandler}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={confirmDeleteHandler}>
                  Delete
                </Button>
              </React.Fragment>
            }
          />
          {!isLoading && loadedProfile && <Profile profile={loadedProfile} />}
        </React.Fragment>
      ) : (
        <UpdateProfile profile={loadedProfile} onClick={handleCancel} />
      )}
      {auth.isLoggedIn && viewMode && (
        <div className="profile-item__actions">
          <Button onClick={handleUpdate}>Edit</Button>
          <Button onClick={showWarningHandler}>Delete</Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
