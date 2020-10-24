import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import ProfileTop from "./ProfileTop";
import BasicProfile from "./BasicProfile";
import ProfileEducation from "./ProfileEducation";
import ProfileLocation from "./ProfileLocation";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { getProfileByHandle } from "../action/profile";
import CreatePost from "../post/CreatePost";
import ListUserPost from "../post/ListUserPost";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.handle);
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    return (
      <div>
        {profile === null || loading ? (
          <Spinner />
        ) : user.id.toString() === profile.user._id ? (
          <div>
            {/* <Link to="/posts" className="btn btn-light m-3">
              Back to posts
            </Link> */}
            <ProfileTop />

            <div className="container">
              <div className="row ">
                <div className="col-sm">
                  <BasicProfile />
                  <ProfileEducation />
                  <ProfileLocation />
                </div>
                <div className="col-sm">
                  <CreatePost />
                  <ListUserPost />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* <Link to="/users" className="btn btn-light m-3">
              Back to users
            </Link> */}
            <div>
              {/* <Link to="/posts" className="btn btn-light m-3">
              Back to posts
            </Link> */}
              <ProfileTop />

              <div className="container">
                <div className="row ">
                  <div className="col-sm">
                    <BasicProfile />
                    <ProfileEducation />
                    <ProfileLocation />
                  </div>
                  <div className="col-sm">
                    <CreatePost />
                    <ListUserPost />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Profile.PropType = {
  profile: PropType.object.isRequired,
  getProfileByHandle: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByHandle })(
  withRouter(Profile)
);
