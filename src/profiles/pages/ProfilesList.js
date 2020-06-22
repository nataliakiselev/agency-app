import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListTemplate from "../components/ListTemplate";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const DUMMY_PROFILES = [
  {
    id: "v1",
    name: {
      first: "Linda",
      last: "Cara",
    },

    height: "177",
    waist: "58",
    hips: "88",
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
    location: {
      city: "London",
      country: "UK",
    },
    height: "179",
    waist: "60",
    hips: "89",
    shoeSize: "7",
    hairColour: "blonde",
    eyeColour: "green",
    email: "v.pawlowska@me.com",
    phone: 7788555555,
    agent: "u1",
  },
];

const ProfilesList = () => {
  const userId = useParams().userId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

  // const loadedProfiles = DUMMY_PROFILES.filter((item) => item.agent === userId);

  console.log(loadedProfiles);
  return <ListTemplate profiles={loadedProfiles} />;
  // state = {
  //   profiles: [],
  //   currentProfile: {},
  // };

  // async getProfiles( {
  //   const url = "http://localhost:4000/mern/profiles";
  //   try {
  //     const response = await fetch(url);
  //     if (response.status >= 200 && response.status < 300) {
  //       const resJson = await response.json();
  //       this.setState({ profiles: resJson.data });
  //     } else {
  //       throw response;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // componentDidMount() {
  //   // this.getProfiles();
  //   const url = "http://localhost:4000/mern/profiles";
  //   axios
  //     .get(url)
  //     .then((Response) => {
  //       console.log(Response, "response");
  //       this.setState({
  //         profiles: Response.data.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // updateCurrentProfile = (item) => {
  //   this.setState({
  //     currentProfile: item,
  //   });
  // };

  // render() {
  // }
};

export default ProfilesList;
