import React, { useState } from "react";
import PageGrid from "../../shared/UI/PageGrid";
import AddProfileForm from "../components/AddProfileForm";
import ErrorBar from "../../shared/UI/ErrorBar";
import "./NewProfile.css";

const NewProfile = () => {
  const [error, setError] = useState();
  const clearError = () => {
    setError(null);
  };

  return (
    <PageGrid>
      <AddProfileForm />

      {/* <ErrorBar error={error} errorMessage={error} onClear={clearError} /> */}
    </PageGrid>
  );
};

export default NewProfile;
