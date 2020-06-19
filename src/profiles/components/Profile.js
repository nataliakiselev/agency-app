import React, { useContext } from "react";
import Card from "../../shared/UI/Card";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../shared/context/AuthContext";
import "./Profile.css";

const Profile = ({ props }) => {
  const auth = useContext(AuthContext);
  return (
    <Card>
      {/* {photos && GridList} */}
      <div>
        <h2>
          {props.name.first} {props.name.last}
        </h2>
        <div className="place-item__image">
          <img src={`http://localhost:4000/${props.avatar}`} alt={props.name} />
        </div>
        <dl>
          <dt>Height</dt>
          <dd>{props.height} cm</dd>
          <dt>Waist</dt>
          <dd>{props.waist} cm</dd>
          <dt>Hips</dt>
          <dd>{props.hips} cm</dd>
          <dt>Shoes</dt>
          <dd>{props.shoeSize}</dd>
          <dt>Hair</dt>
          <dd>{props.hair}</dd>
          <dt>Eyes</dt>
          <dd>{props.eyes}</dd>
          <dt>Agent</dt>
          <dd>{props.agent}</dd>
          {auth.isLoggedIn && (
            <dl>
              <dt>Email</dt>
              <dd>{props.email}</dd>
              <dt>Phone</dt>
              <dd>{props.phone}</dd>

              <dt>Notes</dt>
              <dd>{props.notes}</dd>
            </dl>
          )}
        </dl>
      </div>
      {auth.isLoggedIn && (
        <div className="profile-item__actions">
          <Button variant="contained">Add Photos</Button>
        </div>
      )}
    </Card>
  );
};

export default Profile;
