import React from "react";
import ProfileCard from "./ProfileCard";

const Profile = ({ props }) => {
  return <ProfileCard props={props} />;
  //GridList
};

export default Profile;

// {/* <div>
//   {/* {photos && GridList} */}
//   <h2>
//     {props.name.first} {props.name.last}
//   </h2>
//   <div className="place-item__image">
//     <img
//       src={`http://localhost:4000/${props.mainImg}`}
//       alt={props.name.first}
//     />
//   </div>
//   <dl>
//     <dt>Height</dt>
//     <dd>{props.height} cm</dd>
//     <dt>Waist</dt>
//     <dd>{props.waist} cm</dd>
//     <dt>Hips</dt>
//     <dd>{props.hips} cm</dd>
//     <dt>Shoes</dt>
//     <dd>{props.shoeSize}</dd>
//     <dt>Hair</dt>
//     <dd>{props.hair}</dd>
//     <dt>Eyes</dt>
//     <dd>{props.eyes}</dd>
//     <dt>Agent</dt>
//     <dd>{props.agent}</dd>
//     {auth.isLoggedIn && (
//       <dl>
//         <dt>Email</dt>
//         <dd>{props.email}</dd>
//         <dt>Phone</dt>
//         <dd>{props.phone}</dd>

//         <dt>Notes</dt>
//         <dd>{props.notes}</dd>
//       </dl>
//     )}
//   </dl>

//   {auth.isLoggedIn && (
//     <div>
//       <Button variant="outlined">Add Photos</Button>
//     </div>
//   )}
// </div>; */}
