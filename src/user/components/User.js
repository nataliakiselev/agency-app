import React from "react";
import { Link } from "react-router-dom";
import "./User.css";
import Card from "../../shared/UI/Card";

const User = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/profiles`}>
          {/* <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div> */}
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>{props.description}</h3>
            <p>{props.email}</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default User;
