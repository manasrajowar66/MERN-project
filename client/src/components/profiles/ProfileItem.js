import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <>
      <div className="profiles">
        <div className="profile bg-light">
          <img className="round-img" src={avatar} alt="" />
          <div>
            <h2>{name}</h2>
            <p>
              {status} {company && <span>at {company}</span>}
            </p>
            <p>{location}</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">
              View Profile
            </Link>
          </div>

          <ul>
            {skills.slice(0, 4).map((skill) => (
              <li className="text-primary" key={skill}>
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
