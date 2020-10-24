import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropType from "prop-types";
import className from "classnames";
import { addEducation } from "../action/profile";

class AddEducation extends Component {
  constructor() {
    super();
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      disabled: false,
      description: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.errors) {
      this.setState({ errors: nextProp.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProfile = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };

    this.props.addEducation(newProfile, this.props.history);
  }

  onCheck() {
    this.setState((prevState) => ({
      current: !prevState.current,
      disabled: !prevState.disabled,
    }));
  }

  render() {
    const { errors } = this.props.errors;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Lets get some of your educational status.
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.school,
                    })}
                    placeholder="* School"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us where u were attended.
                  </small>
                  <div className="invalid-feedback">{errors.school}</div>

                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.degree,
                    })}
                    placeholder="* Degree"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us your degree level.
                  </small>
                  <div className="invalid-feedback">{errors.birth}</div>

                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.fieldofstudy,
                    })}
                    placeholder="* Field of study"
                    name="fieldofstudy"
                    value={this.state.fieldofstudy}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us in what major your studied.
                  </small>
                  <div className="invalid-feedback">{errors.fieldofstudy}</div>

                  <h6>From Date</h6>
                  <input
                    type="date"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.from,
                    })}
                    placeholder="* From"
                    name="from"
                    value={this.state.from}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.from}</div>

                  <h6>To Date</h6>
                  <input
                    type="date"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.to,
                    })}
                    placeholder="To"
                    name="to"
                    value={this.state.to}
                    onChange={this.onChange}
                    disabled={this.state.disabled ? "disabled" : ""}
                  />
                  <div className="invalid-feedback">{errors.to}</div>

                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />

                    <label htmlFor="current" className="form-check-label">
                      Current
                    </label>
                  </div>

                  <textarea
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us some description.
                  </small>
                  <div className="invalid-feedback">{errors.description}</div>

                  <input
                    className="btn btn-block btn-dark mt-4"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.PropType = {
  profile: PropType.object.isRequired,
  errors: PropType.object.isRequired,
  addEducation: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
