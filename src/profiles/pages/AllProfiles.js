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
        console.log("calling");
        const response = await fetch(`http://localhost:4000/api/profiles`);
        console.log("calling");

        console.log(response);

        const resJson = await response.json();
        if (!response.ok) {
          throw new Error(resJson.message);
        }
        console.log(resJson);
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
      {isLoading && <LoadingSpinner />}
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
      {!isLoading && loadedProfiles && (
        <ListTemplate profiles={loadedProfiles} />
      )}
      ;
    </PageGrid>
  );
};

export default AllProfiles;
