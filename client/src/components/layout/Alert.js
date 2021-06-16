import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

Alert.prototype = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return { alerts: state.alert };
};
export default connect(mapStateToProps)(Alert);
