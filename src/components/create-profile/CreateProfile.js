import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropType from "prop-types";
import className from "classnames";
import { createProfile } from "../action/profile";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      disableSocialInput: false,
      handle: "",
      gender: "",
      birth: "",
      religion: "",
      interestedIn: "",
      status: "",
      bio: "",
      website: "",
      hobbies: "",
      language: "",
      twitter: "",
      youtube: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.errors) {
      this.setState({ errors: nextProp.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProfile = {
      handle: this.state.handle,
      gender: this.state.gender,
      birth: this.state.birth,
      religion: this.state.religion,
      interestedIn: this.state.interestedIn,
      status: this.state.status,
      bio: this.state.bio,
      website: this.state.website,
      hobbies: this.state.hobbies,
      language: this.state.language,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      twitter: this.state.twitter,
    };

    this.props.createProfile(newProfile, this.props.history);
  }

  onClick() {
    this.setState((prevState) => ({
      disableSocialInput: !prevState.disableSocialInput,
    }));
  }

  render() {
    const { disableSocialInput } = this.state;
    const { errors } = this.props.errors;

    let socialInputs;

    if (disableSocialInput) {
      socialInputs = (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-twitter" />
              </span>
              <input
                type="text"
                className={className("form-control form-control-lg", {
                  "is-invalid": errors.twitter,
                })}
                placeholder="Twitter Profile URL"
                name="twitter"
                value={this.state.twitter}
                onChange={this.onChange}
              />
              <div className="invalid-feedback">{errors.twitter}</div>
            </div>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-facebook" />
              </span>
            </div>
            <input
              type="text"
              className={className("form-control form-control-lg", {
                "is-invalid": errors.facebook,
              })}
              placeholder="Facebook Profile URL"
              name="facebook"
              value={this.state.facebook}
              onChange={this.onChange}
            />
            <div className="invalid-feedback">{errors.facebook}</div>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-instagram" />
              </span>
            </div>
            <input
              type="text"
              className={className("form-control form-control-lg", {
                "is-invalid": errors.instagram,
              })}
              placeholder="Instagram Profile URL"
              name="instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              icon="fas fa-instagram"
            />
            <div className="invalid-feedback">{errors.instagram}</div>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-youtube" />
              </span>
            </div>
            <input
              type="text"
              className={className("form-control form-control-lg", {
                "is-invalid": errors.youtube,
              })}
              placeholder="Youtube Profile URL"
              name="youtube"
              value={this.state.youtube}
              onChange={this.onChange}
            />
            <div className="invalid-feedback">{errors.youtube}</div>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-linkedin" />
              </span>
            </div>
            <input
              type="text"
              className={className("form-control form-control-lg", {
                "is-invalid": errors.linkedin,
              })}
              placeholder="Linkedin Profile URL"
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
            />
            <div className="invalid-feedback">{errors.linkedin}</div>
          </div>
        </div>
      );
    }

    const selectGenderOption = [
      { label: "* Gender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ];

    const selectYourInterestedGender = [
      { label: "Select your Interested Gender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ];

    const genderOption = selectGenderOption.map((option) => (
      <option key={option.value} label={option.label} value={option.value}>
        {option.label}
      </option>
    ));
    const interestedOption = selectYourInterestedGender.map((option) => (
      <option key={option.value} label={option.label} value={option.value}>
        {option.label}
      </option>
    ));

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Lets get some of your basic information.
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.handle,
                    })}
                    placeholder="* Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    A unique handle for your profile URL.
                  </small>
                  <div className="invalid-feedback">{errors.handle}</div>

                  <select
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.gender,
                    })}
                    placeholder="* Gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChange}
                  >
                    {genderOption}
                  </select>
                  <small className="form-text text-muted">
                    A Specfic Gender of yourself.
                  </small>
                  <div className="invalid-feedback">{errors.gender}</div>

                  <input
                    type="date"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.birth,
                    })}
                    placeholder="* BirthDate"
                    name="birth"
                    value={this.state.birth}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Birth Day of your self.
                  </small>
                  <div className="invalid-feedback">{errors.birth}</div>

                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.hobbies,
                    })}
                    placeholder="* Hobbies"
                    name="hobbies"
                    value={this.state.hobbies}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    State your hobbies as a comma separated value like
                    reading,coding etc... .
                  </small>
                  <div className="invalid-feedback">{errors.hobbies}</div>

                  <select
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.interestedIn,
                    })}
                    placeholder="You are interested on gender?"
                    name="interestedIn"
                    value={this.state.interestedIn}
                    onChange={this.onChange}
                  >
                    {interestedOption}
                  </select>
                  <small className="form-text text-muted">
                    Gender your are interested on.
                  </small>
                  <div className="invalid-feedback">{errors.interestedIn}</div>

                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.status,
                    })}
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Your Current Status.
                  </small>
                  <div className="invalid-feedback">{errors.status}</div>

                  <textarea
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.bio,
                    })}
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us a little about yourself.
                  </small>
                  <div className="invalid-feedback">{errors.bio}</div>

                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.website,
                    })}
                    placeholder="Your own website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Give us your own website.
                  </small>
                  <div className="invalid-feedback">{errors.website}</div>

                  <input
                    type="text"
                    className={className("form-control form-control-lg", {
                      "is-invalid": errors.language,
                    })}
                    placeholder="Language"
                    name="language"
                    value={this.state.language}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Give us the languages you can fluently spoken. list them in
                    comma separated values like English, Amharic etc...
                  </small>
                  <div className="invalid-feedback">{errors.language}</div>

                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={this.onClick}
                      className="btn btn-light"
                    >
                      Add Social Network Links
                    </button>
                    <span className="text-muted">Optional</span>
                  </div>
                  {socialInputs}
                  <input
                    className="btn btn-block btn-dark mt-4"
                    type="submit"
                    value="Submit"
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

CreateProfile.PropType = {
  profile: PropType.object.isRequired,
  errors: PropType.object.isRequired,
  createProfile: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
