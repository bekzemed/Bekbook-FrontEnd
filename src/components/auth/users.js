import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import {
  sendFriendRequest,
  deleteFriendRequest,
  getOtherProfiles,
  getCurrentProfile,
} from "../action/profile";

class users extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getOtherProfiles();
  }

  onAddClick(id) {
    this.props.sendFriendRequest(id);
  }
  onDeleteClick(id) {
    this.props.deleteFriendRequest(id);
  }
  render() {
    // const { users, loading, user } = this.props.auth;
    const { profiles, loading, profile } = this.props.profile;

    return (
      <div>
        {loading ? (
          <Spinner />
        ) : profiles.length > 0 ? (
          <div className="container">
            {profiles.map((pro, index) => {
              return (
                <div key={index} className="card-content">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title user-color">
                        <img
                          src={pro.user.avatar}
                          alt="user avatar"
                          className="mr-3 icon-size rounded-circle"
                          style={{ width: "60px" }}
                        />
                        <Link
                          to={`/profile/${pro.handle}`}
                          style={{ textDecoration: "none" }}
                        >
                          {pro.user.firstName} {pro.user.lastName}
                        </Link>

                        {profile.friendRequest.length === 0 ? (
                          <button
                            onClick={this.onAddClick.bind(this, pro.user._id)}
                            className="btn btn-lg btn-dark"
                            style={{ float: "right" }}
                          >
                            <i className="fas fa-user-plus mr-2"></i>Add Friend
                          </button>
                        ) : profiles.length === profile.friendRequest.length ? (
                          <button
                            onClick={this.onDeleteClick.bind(
                              this,
                              pro.user._id
                            )}
                            className="btn btn-lg btn-danger"
                            style={{ float: "right" }}
                          >
                            <i className="fas fa-trash mr-2"></i>
                            Remove Friend
                          </button>
                        ) : (
                          profile.friendRequest.map((friend, index) => {
                            if (pro.user._id === friend.user.toString()) {
                              return (
                                <button
                                  key={index}
                                  onClick={this.onDeleteClick.bind(
                                    this,
                                    pro.user._id
                                  )}
                                  className="btn btn-lg btn-danger"
                                  style={{ float: "right" }}
                                >
                                  <i className="fas fa-trash mr-2"></i>
                                  Remove Friend
                                </button>
                              );
                            } else {
                              return (
                                <button
                                  key={index}
                                  onClick={this.onAddClick.bind(
                                    this,
                                    pro.user._id
                                  )}
                                  className="btn btn-lg btn-dark"
                                  style={{ float: "right" }}
                                >
                                  <i className="fas fa-user-plus mr-2"></i>
                                  Add Friend
                                </button>
                              );
                            }
                          })
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h1 className="display-5 post-text">No User</h1>
          </div>
        )}
      </div>
    );
  }
}

users.PropType = {
  auth: PropType.object.isRequired,
  profile: PropType.object.isRequired,
  sendFriendRequest: PropType.func.isRequired,
  deleteFriendRequest: PropType.func.isRequired,
  getOtherProfiles: PropType.func.isRequired,
  getCurrentProfile: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  sendFriendRequest,
  deleteFriendRequest,
  getOtherProfiles,
  getCurrentProfile,
})(users);
