import React from "react";
import "./List.css";
import { Link } from "react-router-dom";
import Avatar from "../../shared/UI/Avatar";
import Card from "../../shared/UI/Card";

const List = ({ profiles = [] }) => {
  // console.log(props);
  if (profiles.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2> No profiles found. Create one?</h2>
          <Link to="/profiles/new">
            <button>Create Profile</button>
          </Link>
        </Card>
      </div>
    );
  }
  return (
    <>
      <h2>Profiles</h2>
      <ul className="profiles-list">
        {profiles.map((item) => (
          <li key={item.id}>
            <Link
              to={`/profiles/${item.id}`}
              key={item.id}
              id={item.id}
              agent={item.agent}
            >
              <Avatar avatar={item.avatar} alt={item.name.first} />
              <h3>{`${item.name.first} ${item.name.last}`} </h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
