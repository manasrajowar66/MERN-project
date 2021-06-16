import React from "react";

const ProfileAbout = ({
  profile: {
    user: { name },
    bio,
    skills,
  },
}) => {
  const Fname = name.split(" ").slice(0, -1).join(" ");
  return (
    <>
      <div className="profile-about bg-light p-2">
        {bio && (
          <>
            <h2 className="text-primary">{`${Fname}'s`} Bio</h2>
            <p>{bio}</p>
            <div className="line"></div>
          </>
        )}

        {skills.length > 0 && (
          <>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
              {skills.map((skill) => (
                <div className="p-1" key={skill}>
                  <i className="fa fa-check"></i> {skill}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileAbout;
