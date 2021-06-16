/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i> Browse and connect with
          developers
        </p>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {" "}
            {profiles.map((profile) => (
              <ProfileItem profile={profile} key={profile._id} />
            ))}
          </>
        )}
      </section>
    </>
  );
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps, { getProfiles })(Profiles);
