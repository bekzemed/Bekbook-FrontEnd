import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { withRouter } from "react-router-dom";
// import verification from "../img/verified.png";
import { Link } from "react-router-dom";

class ProfileTop extends Component {
  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.auth;

    return (
      <div className="row">
        <div
          className="col-md-12"
          style={{
            height: "425px",
            background: "white",
            boxShadow: "1px 1px #E7E9EC",
          }}
        >
          <div
            className="card card-body profile-background  mb-3 card-style container"
            style={{ height: "308px", border: "0px" }}
          >
            <div className="row">
              <div
                className="col-4 col-md-3"
                style={{
                  marginTop: "118px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: "25px",
                }}
              >
                <img
                  className="rounded-circle"
                  style={{
                    width: "170px",
                    display: "block",
                    margin: "auto",
                  }}
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h5
                style={{
                  fontSize: "35px",
                  display: "block",
                  margin: "auto",
                  paddingBottom: "16px",
                }}
                className="display-2 text-center"
              >
                {profile.user.firstName.charAt(0).toUpperCase() +
                  profile.user.firstName.slice(1)}{" "}
                {profile.user.lastName.charAt(0).toUpperCase() +
                  profile.user.lastName.slice(1)}
              </h5>
              {profile.bio ? (
                <p
                  style={{
                    color: "black",
                    fontSize: "1.1rem",
                    lineHeight: "1.18rem",
                  }}
                >
                  {profile.bio.charAt(0).toUpperCase() + profile.bio.slice(1)}
                </p>
              ) : (
                user.id === profile.user._id && (
                  <Link to="/edit-profile">Add Bio</Link>
                )
              )}
              {/* <img
                src={verification}
                alt="verification"
                style={{ width: "5%" }}
              /> */}

              {/* <p className="lead text-center">
                              {status} {company && <span> at {company}</span>}
                            </p> */}
              {/* <p>{location && <span>{location}</span>}</p> */}
              <p>
                {/* {profile !== null && profile.website && (
                    <a className="text-white p-2" href={profile.website}>
                      <i className="fas fa-globe fa-2x"></i>
                    </a>
                  )} */}

                {profile !== null && profile.social && profile.social.twitter && (
                  <a className="text-white p-2" href={profile.social.twitter}>
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                )}
                {profile !== null && profile.social && profile.social.facebook && (
                  <a className="text-white p-2" href={profile.social.facebook}>
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )}
                {profile !== null && profile.social && profile.social.linkedin && (
                  <a className="text-white p-2" href={profile.social.linkedin}>
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                )}
                {profile !== null &&
                  profile.social &&
                  profile.social.instagram && (
                    <a
                      className="text-white p-2"
                      href={profile.social.instagram}
                    >
                      <i className="fab fa-instagram fa-2x"></i>
                    </a>
                  )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
    // }
    // });
  }
}

ProfileTop.PropType = {
  profile: PropType.object.isRequired,
  auth: PropType.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(ProfileTop));
