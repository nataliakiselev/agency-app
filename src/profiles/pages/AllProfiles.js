import React, { useState, useEffect } from "react";
import ListTemplate from "../components/ListTemplate";
import PageGrid from "../../shared/UI/PageGrid";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const AllProfiles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProfiles, setLoadedProfiles] = useState();
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const doFetch = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/profiles",
        );

        const resJson = await response.json();
        if (!response.ok) {
          throw new Error(resJson.message);
        }
        setLoadedProfiles(resJson.data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    doFetch();
  }, []);
  return (
    <PageGrid>
      {isLoading && <LoadingSpinner open={isLoading} />}
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
      {!isLoading && loadedProfiles && (
        <ListTemplate profiles={loadedProfiles} />
      )}
    </PageGrid>
  );
};

export default AllProfiles;
