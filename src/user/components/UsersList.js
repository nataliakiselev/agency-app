import React from "react";
import User from "./User";
import PageGrid from "../../shared/UI/PageGrid";
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
    <PageGrid>
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
    </PageGrid>
  );
};

export default UsersList;
