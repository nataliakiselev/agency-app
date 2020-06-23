import React, { useState, useEffect } from "react";
import ListTemplate from "../components/ListTemplate";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
// const DUMMY_PROFILES = [
//   {
//     id: "v1",
//     name: {
//       first: "Linda",
//       last: "Cara",
//     },

//     height: "177",
//     waist: "58",
//     hips: "88",
//     shoeSize: "6",
//     hairColour: "brown",
//     eyeColour: "grey-blue",
//     email: "linda.cara@gmail.com",
//     phone: 7588442244,
//     agent: "u1",
//   },
//   {
//     id: "v2",
//     name: {
//       first: "Vanda",
//       last: "Pawlowska",
//     },
//     location: {
//       city: "London",
//       country: "UK",
//     },
//     height: "179",
//     waist: "60",
//     hips: "89",
//     shoeSize: "7",
//     hairColour: "blonde",
//     eyeColour: "green",
//     email: "v.pawlowska@me.com",
//     phone: 7788555555,
//     agent: "u1",
//   },
// ];

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
  return <ListTemplate profiles={loadedProfiles} />;
};

export default AllProfiles;
