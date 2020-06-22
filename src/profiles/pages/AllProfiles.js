import React from "react";
import ListTemplate from "../components/ListTemplate";

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

const AllProfiles = () => {
  return <ListTemplate profiles={DUMMY_PROFILES} />;
};

export default AllProfiles;
