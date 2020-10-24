import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropType from "prop-types";
import { logoutUser } from "../action/auth";
import { clearCurrentProfile } from "../action/profile";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  onClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push("/login");
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;

    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const authLink = (
      <ul className="navbar-nav ml-auto">
        {/* <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li> */}
        <Link
          to={profile === null ? "" : `/profile/${profile.handle}`}
          style={{ fontWeight: "bold" }}
          className="nav-link"
        >
          {user.firstName}
        </Link>
        <li className="nav-item">
          <Link className="nav-link" to="/users" style={{ fontWeight: "bold" }}>
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/posts" style={{ fontWeight: "bold" }}>
            Post
          </Link>
        </li>

        {/* <Link
          style={{ textDecoration: "none" }}
          to={`/profile/${profile.handle}`}
        >
          {user.firstName}
        </Link> */}

        <a
          href="/#"
          className="nav-link"
          onClick={this.onClick.bind(this)}
          style={{ fontWeight: "bold" }}
        >
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.firstName}
            style={{ width: "25px", marginRight: "5px" }}
          />
          Logout
        </a>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-light sticky-top navbar-color">
        <div className="container">
          <Link className="navbar-brand brand" to="/posts">
            Bekbook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {isAuthenticated ? authLink : guestLink}
        </div>
      </nav>
    );
  }
}

Navbar.PropType = {
  auth: PropType.object.isRequired,
  profile: PropType.object.isRequired,
  logoutUser: PropType.func.isRequired,
  clearCurrentProfile: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentProfile,
})(withRouter(Navbar));
