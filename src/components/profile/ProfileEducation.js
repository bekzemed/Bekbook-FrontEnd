import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteEducation } from "../action/profile";

class ProfileEducation extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.auth;
    return (
      <div>
        {user.id.toString() === profile.user._id ? (
          profile.education.length === 0 ? (
            <div className="card-content">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Education Status</h5>
                  <p className="card-text">
                    Please fill your education status.
                  </p>
                  <Link
                    to="/education"
                    className="btn button-color btn-block mb-3"
                  >
                    Add Education
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {profile.education.map((userProfile, index) => (
                <div key={index} className="card-content">
                  <div className="card" style={{ width: "30rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">Education Status</h5>
                      {
                        <p className="card-text">
                          <i className="fas fa-school mr-2 icon-size"></i>School{" "}
                          <span className="info-value ml-2">
                            {userProfile.school}
                          </span>
                        </p>
                      }

                      {
                        <p className="card-text">
                          <i className="fas fa-user-graduate mr-2  icon-size"></i>
                          Degree{" "}
                          <span className="info-value ml-2">
                            {userProfile.degree}
                          </span>
                        </p>
                      }

                      {
                        <p className="card-text">
                          <i className="fas fa-book-open mr-2 icon-size"></i>
                          Degree{" "}
                          <span className="info-value ml-2">
                            {userProfile.fieldofstudy}
                          </span>
                        </p>
                      }

                      {
                        <p className="card-text">
                          <i className="fas fa-calendar-day mr-2 icon-size"></i>
                          Started From{" "}
                          <span className="info-value ml-2">
                            <Moment format="DD-MM-YYYY">
                              {userProfile.from}
                            </Moment>
                          </span>
                          {" - "}
                          <span className="info-value ml-2">
                            {userProfile.current ? (
                              <span>Now</span>
                            ) : (
                              <Moment format="DD-MM-YYYY">
                                {userProfile.to}
                              </Moment>
                            )}
                          </span>
                        </p>
                      }

                      {userProfile.description && (
                        <p className="card-text">
                          <i className="fas fa-comment-alt mr-2 icon-size"></i>
                          Description{" "}
                          <span className="info-value ml-2 card-text">
                            {userProfile.description.charAt(0).toUpperCase() +
                              userProfile.description.slice(1)}
                          </span>
                        </p>
                      )}

                      <button
                        onClick={this.onDeleteClick.bind(this, userProfile._id)}
                        className="btn btn-danger btn-block mb-3"
                      >
                        Delete Education
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : profile.education.length === 0 ? (
          <div></div>
        ) : (
          <div>
            <div>
              {profile.education.map((userProfile, index) => (
                <div key={index} className="card-content">
                  <div className="card" style={{ width: "30rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">Education Status</h5>
                      {
                        <p className="card-text">
                          <i className="fas fa-school mr-2 icon-size"></i>School{" "}
                          <span className="info-value ml-2">
                            {userProfile.school}
                          </span>
                        </p>
                      }

                      {
                        <p className="card-text">
                          <i className="fas fa-user-graduate mr-2  icon-size"></i>
                          Degree{" "}
                          <span className="info-value ml-2">
                            {userProfile.degree}
                          </span>
                        </p>
                      }

                      {
                        <p className="card-text">
                          <i className="fas fa-book-open mr-2 icon-size"></i>
                          Degree{" "}
                          <span className="info-value ml-2">
                            {userProfile.fieldofstudy}
                          </span>
                        </p>
                      }

                      {
                        <p className="card-text">
                          <i className="fas fa-calendar-day mr-2 icon-size"></i>
                          Started From{" "}
                          <span className="info-value ml-2">
                            <Moment format="DD-MM-YYYY">
                              {userProfile.from}
                            </Moment>
                          </span>
                          {" - "}
                          <span className="info-value ml-2">
                            {userProfile.current ? (
                              <span>Now</span>
                            ) : (
                              <Moment format="DD-MM-YYYY">
                                {userProfile.to}
                              </Moment>
                            )}
                          </span>
                        </p>
                      }

                      {userProfile.description && (
                        <p className="card-text">
                          <i className="fas fa-comment-alt mr-2 icon-size"></i>
                          Description{" "}
                          <span className="info-value ml-2 card-text">
                            {userProfile.description.charAt(0).toUpperCase() +
                              userProfile.description.slice(1)}
                          </span>
                        </p>
                      )}

                      <button
                        onClick={this.onDeleteClick.bind(this, userProfile._id)}
                        className="btn btn-danger btn-block mb-3"
                      >
                        Delete Education
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

ProfileEducation.PropType = {
  profile: PropType.object.isRequired,
  auth: PropType.object.isRequired,
  deleteEducation: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteEducation })(ProfileEducation);
