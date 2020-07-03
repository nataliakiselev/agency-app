import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListTemplate from "../components/ListTemplate";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const ProfilesList = () => {
  const userId = useParams().userId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProfiles, setLoadedProfiles] = useState();

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const doFetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/profiles/user/${userId}`,
        );

        console.log(userId, "userId");
        const resJson = await response.json();
        if (!response.ok) {
          throw new Error(resJson.message);
        }
        console.log(resJson);
        setLoadedProfiles(resJson.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message);
      }
    };
    doFetch();
  }, [userId]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedProfiles && (
        <ListTemplate profiles={loadedProfiles} />
      )}
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
    </>
  );
};

export default ProfilesList;
