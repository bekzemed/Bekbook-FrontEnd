import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteLocation } from "../action/profile";

class ProfileLocation extends Component {
  onDeleteLocation(id) {
    this.props.deleteLocation(id);
  }
  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.auth;
    return (
      <div>
        {user.id.toString() === profile.user._id ? (
          profile.placeLived.length === 0 ? (
            <div className="card-content">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Location</h5>
                  <p className="card-text">Please fill your location.</p>
                  <Link
                    to="/location"
                    className="btn button-color btn-block mb-3"
                  >
                    Add Location
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {profile.placeLived.map((location, index) => {
                return (
                  <div key={index} className="card-content">
                    <div className="card" style={{ width: "30rem" }}>
                      <div className="card-body">
                        <h5 className="card-title">Location Status</h5>
                        {
                          <p className="card-text">
                            <i className="fas fa-home mr-2 icon-size"></i>Lives
                            in{" "}
                            <span className="info-value ml-2">
                              {location.livesIn.charAt(0).toUpperCase() +
                                location.livesIn.slice(1)}
                            </span>
                          </p>
                        }

                        {
                          <p className="card-text">
                            <i className="fas fa-calendar-day mr-2 icon-size"></i>
                            Started From{" "}
                            <span className="info-value ml-2">
                              <Moment format="DD-MM-YYYY">
                                {location.from}
                              </Moment>
                            </span>
                            {" - "}
                            <span className="info-value ml-2">
                              {location.current ? (
                                <span>Now</span>
                              ) : (
                                <Moment format="DD-MM-YYYY">
                                  {location.to}
                                </Moment>
                              )}
                            </span>
                          </p>
                        }

                        <button
                          onClick={this.onDeleteLocation.bind(
                            this,
                            location._id
                          )}
                          className="btn btn-danger btn-block mb-3"
                        >
                          Delete Location
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : profile.placeLived.length === 0 ? (
          <div></div>
        ) : (
          <div>
            {profile.placeLived.map((location, index) => {
              return (
                <div key={index} className="card-content">
                  <div className="card" style={{ width: "30rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">Location Status</h5>
                      {
                        <p className="card-text">
                          <i className="fas fa-home mr-2 icon-size"></i>Lives in{" "}
                          <span className="info-value ml-2">
                            {location.livesIn.charAt(0).toUpperCase() +
                              location.livesIn.slice(1)}
                          </span>
                        </p>
                      }

                      {
                        <p className="card-text">
                          <i className="fas fa-calendar-day mr-2 icon-size"></i>
                          Started From{" "}
                          <span className="info-value ml-2">
                            <Moment format="DD-MM-YYYY">{location.from}</Moment>
                          </span>
                          {" - "}
                          <span className="info-value ml-2">
                            {location.current ? (
                              <span>Now</span>
                            ) : (
                              <Moment format="DD-MM-YYYY">{location.to}</Moment>
                            )}
                          </span>
                        </p>
                      }

                      <button
                        onClick={this.onDeleteLocation.bind(this, location._id)}
                        className="btn btn-danger btn-block mb-3"
                      >
                        Delete Location
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

ProfileLocation.PropType = {
  profile: PropType.object.isRequired,
  auth: PropType.object.isRequired,
  deleteLocation: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteLocation })(ProfileLocation);
