import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import Alert from "../layout/Alert";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <>
      <section class="container">
        <Alert />
        <h1 class="large text-primary">Add Your Education</h1>
        <p class="lead">
          <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
          that you have attended
        </p>
        <small>* = required field</small>
        <form
          class="form"
          onSubmit={(e) => {
            e.preventDefault();
            addEducation(formData, history);
          }}
        >
          <div class="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              required
              value={school}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              required
              value={degree}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Field Of Study"
              name="fieldOfStudy"
              value={fieldOfStudy}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                onChange={(e) =>
                  setFormData({ ...formData, current: !current })
                }
              />{" "}
              Current School or Bootcamp
            </p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              disabled={current}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <Link class="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </>
  );
};

export default connect(null, { addEducation })(withRouter(AddEducation));
