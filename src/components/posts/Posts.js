import React, { Component } from "react";
import {
  getCurrentProfile,
  getOtherProfiles,
  getAllProfiles,
} from "../action/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import Spinner from "../common/Spinner";
import CreatePost from "../post/CreatePost";
import ListAllUser from "../post/ListAllUserPost";

class Posts extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getOtherProfiles();
    this.props.getAllProfiles();
  }
  // componentWillMount() {
  //   this.props.getAllProfiles();
  // }

  render() {
    const { profile, loading, profiles } = this.props.profile;
    const { user } = this.props.auth;

    let postContent;
    if (profile === null || loading) {
      postContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        postContent = (
          <div className="container postContainer">
            {/* <p className="lead text-muted">
              Welcome{" "}
              <Link
                style={{ textDecoration: "none" }}
                to={`/profile/${profile.handle}`}
              >
                {user.firstName}
              </Link>
            </p> */}
            <div className="card-content">
              <div className="card horizontalCard">
                <div className="card-body horizontalCardBody">
                  <div className="items">
                    {profile.friendRequest.map((friend) => {
                      return profiles.map((profile) => {
                        if (friend.user === profile.user._id) {
                          return (
                            <div key={friend._id} className="item">
                              <img
                                style={{ height: "100%", borderRadius: "14px" }}
                                src={profile.user.avatar}
                                alt="Friend"
                              />
                              <div className="Imageitem">
                                {profile.user.firstName} {profile.user.lastName}
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      });
                    })}
                  </div>
                </div>
              </div>
            </div>
            <CreatePost />
            <ListAllUser />
          </div>
        );
        //    a lot of shits
      } else {
        postContent = (
          <div>
            <p className="lead text-muted">Welcome {user.firstName}</p>
            <p>You have not setup profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-dark">
              {" "}
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-5 post-text">{postContent}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.PropType = {
  getCurrentProfile: PropType.func.isRequired,
  getOtherProfiles: PropType.func.isRequired,
  getAllProfiles: PropType.func.isRequired,
  profile: PropType.object.isRequired,
  auth: PropType.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getOtherProfiles,
  getAllProfiles,
})(Posts);
