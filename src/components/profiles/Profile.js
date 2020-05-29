import React from "react";

const Profile = (props) => {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-image">
            <img src="/images/20190730_15233950_M.jpeg" alt="profile_image" />
            <span className="card-title ">
              {props.profile.firstName} {props.profile.lastName}
            </span>
          </div>
          <div className="card-content">
            <p>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively.
            </p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
