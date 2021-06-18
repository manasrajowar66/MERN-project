import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  match,
  profile: { profile, loading },
  auth,
  getProfileById,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [match.params.id, getProfileById]);
  return (
    <>
      {profile == null || loading ? (
        <section className="container">
          <Spinner />
        </section>
      ) : (
        <>
          <section className="container">
            <Link to="/profiles" className="btn btn-light">
              Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileExperience profile={profile} />
              <ProfileEducation profile={profile} />
              {profile.gitHubUsername && <ProfileGithub profile={profile} />}
            </div>
          </section>
        </>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { getProfileById })(Profile);
