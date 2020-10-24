import React, { Component } from "react";
import className from "classnames";
import PropType from "prop-types";

import { connect } from "react-redux";

// action
import { loginUser } from "../action/auth";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (nextProp.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(newUser);
  }

  render() {
    const { errors } = this.props.errors;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Enjoy using Bekbook.</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
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

login.PropType = {
  auth: PropType.object.isRequired,
  errors: PropType.object.isRequired,
  loginUser: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(login);
