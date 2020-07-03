import React from "react";
import User from "./User";
import Card from "../../shared/UI/Card";
import "./UsersList.css";

const UsersList = ({ items }) => {
  if (!items.length) {
    return (
      <Card className="center">
        <h2>No users found</h2>
      </Card>
    );
  }
  return (
    <ul className="users-list">
      {items.map((user) => (
        <User
          key={user._id}
          id={user._id}
          // image={user.image}
          name={user.name}
          description={user.location}
          email={user.email}
        />
      ))}
    </ul>
  );
};

export default UsersList;
