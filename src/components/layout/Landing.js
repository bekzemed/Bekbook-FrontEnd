import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">User Connector</h1>
                <p className="lead">
                  {" "}
                  Create an account or log into{" "}
                  <i>
                    <strong>Bekbook</strong>
                  </i>
                  . Connect with friends, family and other people you know.
                  Share photos and videos, send messages and get updates.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-light mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-dark">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
