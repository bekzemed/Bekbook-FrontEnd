import React, { Component } from "react";
import className from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropType from "prop-types";

import { registerUser } from "../action/auth";

class register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
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

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.props.errors;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Bekbook Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.firstName,
                    })}
                    placeholder="First name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.firstName}</div>

                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.lastName,
                    })}
                    placeholder="Last name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.lastName}</div>

                  <input
                    type="text"
                    className={className(
                      "disabled form-control form-control-lg",
                      {
                        "is-invalid": errors.email,
                      }
                    )}
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    autoComplete="email"
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                  <span
                    style={{ float: "left" }}
                    className="form-text text-muted"
                  >
                    This site uses Gravatar so if you want profile image, use
                    Gravatar email
                  </span>

                  <input
                    type="password"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    autoComplete="new-password"
                  />
                  <div className="invalid-feedback">{errors.password}</div>

                  <input
                    type="password"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    autoComplete="new-password"
                  />
                  <div className="invalid-feedback">{errors.password2}</div>
                  <input
                    type="submit"
                    className="btn btn-dark btn-block mt-4"
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

register.PropType = {
  auth: PropType.object.isRequired,
  errors: PropType.object.isRequired,
  registerUser: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(register));
