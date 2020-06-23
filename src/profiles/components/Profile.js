import React, { useContext } from "react";
import ProfileCard from "./ProfileCard";
// import { Button } from "@material-ui/core";
// import { AuthContext } from "../../shared/context/AuthContext";
const Profile = ({ profile }) => {
  return <ProfileCard props={profile} />;

  //  GridList
};

export default Profile;

// const auth = useContext(AuthContext);
//
//  <div>

//       <h2>
//         {profile.name.first} {profile.name.last}
//       </h2>
//       <div className="place-props__image">
//         <img
//           src={`http://localhost:4000/${profile.mainImg}`}
//           alt={profile.name.first}
//         />
//       </div>
//       <dl>
//         <dt>Height</dt>
//         <dd>{profile.height} cm</dd>
//         <dt>Waist</dt>
//         <dd>{profile.waist} cm</dd>
//         <dt>Hips</dt>
//         <dd>{profile.hips} cm</dd>
//         <dt>Shoes</dt>
//         <dd>{profile.shoes}</dd>
//         <dt>Hair</dt>
//         <dd>{profile.hair}</dd>
//         <dt>Eyes</dt>
//         <dd>{profile.eyes}</dd>
//         <dt>Agent</dt>
//         <dd>{profile.agent}</dd>
{
  /* {auth.isLoggedIn && (
          <dl>
            <dt>Email</dt>
            <dd>{item.email}</dd>
            <dt>Phone</dt>
            <dd>{item.phone}</dd>
            <dt>Notes</dt>
            <dd>{item.notes}</dd>
          </dl>
        )} */
}
//   </dl>
// </div>
// {
//   auth.isLoggedIn && (
//     <div>
//       <Button variant="outlined">Add Photos</Button>
//     </div>
//   );
// }
