import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorBar from "../../shared/UI/ErrorBar";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedUsers, setLoadedUsers] = useState(null);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const doFetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/users");
        const resJson = await response.json();
        if (!response.ok) {
          throw new Error(resJson.message);
        }
        console.log(resJson);
        setLoadedUsers(resJson.data);
      } catch (err) {
        console.log(err);

        setError(err.message);
      }
      setIsLoading(false);
    };
    doFetch();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
    </>
  );
};

export default Users;
