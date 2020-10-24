import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class ProfileEducation extends Component {
  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.auth;
    return (
      <div className="card-content">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Basic Info</h5>
            {
              <p className="card-text">
                <i className="fas fa-gamepad mr-2 icon-size"></i>Hobbies{" "}
                <span className="info-value ml-2">
                  {profile.hobbies
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(", ")}
                </span>
              </p>
            }
            {
              <p className="card-text">
                {profile.gender === "Male" ? (
                  <span>
                    <i className="fas fa-male mr-2 icon-size"></i>Gender{" "}
                    <span className="info-value ml-2">{profile.gender}</span>
                  </span>
                ) : (
                  <span>
                    <i className="fas fa-female mr-2 icon-size"></i>Gender{" "}
                    <span className="info-value ml-2">{profile.gender}</span>
                  </span>
                )}
              </p>
            }

            {
              <p className="card-text">
                <i className="fas fa-birthday-cake icon-size mr-2"></i>Born Date{" "}
                <span className="info-value ml-2">
                  <Moment format="DD-MM-YYYY">{profile.birth}</Moment>
                </span>
              </p>
            }

            {profile.language && (
              <p className="card-text">
                <i className="fas fa-language mr-2 icon-size"></i>Language
                Spoken{" "}
                <span className="info-value ml-2">
                  {profile.language
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(", ")}
                </span>
              </p>
            )}

            {profile.religion && (
              <p className="card-text">
                {profile.religion.charAt(0).toUpperCase() +
                  profile.religion.slice(1) ===
                "Muslim" ? (
                  <span>
                    <i className="fas fa-quran mr-2 icon-size"></i>Gender{" "}
                    <span className="info-value ml-2">
                      {profile.religion.charAt(0).toUpperCase() +
                        profile.religion.slice(1)}
                    </span>
                  </span>
                ) : (
                  <span>
                    <i className="fas fa-bible mr-2 icon-size"></i>Gender{" "}
                    <span className="info-value ml-2">
                      {profile.religion.charAt(0).toUpperCase() +
                        profile.religion.slice(1)}
                    </span>
                  </span>
                )}
              </p>
            )}

            {profile.interestedIn && (
              <p className="card-text">
                <i className="fas fa-venus-mars icon-size mr-2"></i>Interested
                In{" "}
                <span className="info-value ml-2">
                  {profile.interestedIn.charAt(0).toUpperCase() +
                    profile.interestedIn.slice(1)}
                </span>
              </p>
            )}

            {profile.status && (
              <p className="card-text">
                <i className="fas fa-heart icon-size mr-2"></i>
                <span className="info-value">
                  {profile.status.charAt(0).toUpperCase() +
                    profile.status.slice(1)}
                </span>
              </p>
            )}

            {/* {profile.bio && (
              <p className="card-text">
                <i className="fas fa-comment icon-size mr-2"></i>Bio{" "}
                <span className="info-value ml-2 card-text">
                  {profile.bio.charAt(0).toUpperCase() + profile.bio.slice(1)}
                </span>
              </p>
            )} */}

            {profile.website && (
              <p className="card-text">
                <i className="fas fa-globe icon-size mr-2"></i>
                <span className="info-value card-text">
                  <a
                    href={profile.website}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {profile.website}
                  </a>
                </span>
              </p>
            )}

            {user.id.toString() === profile.user._id ? (
              <Link
                to="/edit-profile"
                className="btn button-color btn-block mb-3"
              >
                Edit Profile
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProfileEducation.PropType = {
  profile: PropType.object.isRequired,
  auth: PropType.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProfileEducation);
