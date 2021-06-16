/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUserProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Alert from "../layout/Alert";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  auth: { user, loading },
  profile: { profile },
  getCurrentUserProfile,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Alert />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardAction />
          <Experience />
          <Education />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile,please add some info.</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};
export default connect(mapStateToProps, {
  getCurrentUserProfile,
  deleteAccount,
})(Dashboard);
