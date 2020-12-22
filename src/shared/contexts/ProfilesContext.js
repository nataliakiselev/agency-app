import React, { createContext, useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex
import { AuthContext } from "./AuthContext";

export const ProfilesContext = createContext({
  // fetchProfiles: () => [],
  addProfile: () => {},
  // updatePerson: () => {},
  // deletePerson: () => {},
  loaded: false,
  loading: false,
  error: null,
  profiles: [],
});

export const ProfilesProvider = (props) => {
  // const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToasts();
  const { userId, token } = useContext(AuthContext);

  const addProfile = async (data) => {
    try {
      // console.log("addingProfile");

      data.append("agent", userId);
      //console.log(e.target, "form");

      console.log(Object.fromEntries(data), "data");

      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/profiles",
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      if (!response.ok) {
        throw new Error(response.message || response.statusText);
      }
      // console.log(response);
      addToast("New profile saved", {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong");
      addToast(
        `${err.message || err.statusText || "Failed to create profile"}`,
        {
          appearance: "error",
        },
      );
    }
  };
  return (
    <ProfilesContext.Provider
      value={{
        // people,
        loading,
        error,
        // fetchPeople,
        addProfile,
        // updatePerson,
        // deletePerson,
      }}
    >
      {props.children}
    </ProfilesContext.Provider>
  );
};
