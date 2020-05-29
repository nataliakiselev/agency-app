import React from "react";

const List = (props) => {
  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4>Models</h4>
        </li>
        {props.profiles.map((item) => (
          <a
            href="#!"
            className="collection-item"
            key={item._id}
            onClick={props.updateCurrentProfile.bind(this, item)}
          >
            {item.firstName}
            {item.lastName}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default List;
