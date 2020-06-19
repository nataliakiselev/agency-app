import React from "react";
import User from "./User";
import Card from "../../shared/UI/Card";
import "./UsersList.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card className="center">
        <h2>No users found</h2>
      </Card>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <User
          key={user._id}
          id={user._id}
          // image={user.image}
          name={user.name}
          description={user.location}
          profilesCount={user.profiles.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
