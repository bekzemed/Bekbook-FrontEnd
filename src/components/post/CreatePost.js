import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
// import { addPost } from "../action/post";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "axios";

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      filename: "Choose File",
      text: "",
      setOpen: false,
      buttonDisable: true,
      images: null,
    };
    this.changeBackground = this.changeBackground.bind(this);
    this.changeHoverBackground = this.changeHoverBackground.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  handleClose() {
    this.setState({ setOpen: false });
  }
  handleOpen(e) {
    e.target.style.outline = "none";
    this.setState({ setOpen: true });
  }

  changeHoverBackground(e) {
    e.target.style.background = "#E4E6E8";
  }
  changeBackground(e) {
    e.target.style.background = "#f0f2f5";
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, buttonDisable: false });
  }
  onFileChange(event) {
    this.setState({ images: event.target.files[0] });
    this.setState({ filename: event.target.files[0].name });
  }
  async onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", this.state.images);
    formData.append("text", this.state.text);

    axios

      .post("/api/post", formData)
      .then(() => this.props.history.push("/posts"))
      .catch((err) => console.log(err.response.data));
  }
  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.auth;

    return (
      <div className="card-content">
        <div className="card">
          <div className="card-body">
            <span style={{ display: "flex" }}>
              <img
                className="rounded-circle mr-2"
                src={profile.user.avatar}
                style={{ width: "40px", height: "40px" }}
                alt="user"
              />
              {profile.user.firstName === user.firstName &&
              profile.user.lastName === user.lastName ? (
                <div style={{ width: "100%" }}>
                  <button
                    className="btn-block btn btn-lg post-input"
                    onMouseOver={this.changeHoverBackground}
                    onMouseOut={this.changeBackground}
                    onClick={this.handleOpen}
                  >
                    What's on your mind?{" "}
                  </button>

                  <Dialog open={this.state.setOpen} onClose={this.handleClose}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <span>
                        <DialogTitle className="form-dialog-title">
                          Create Post
                        </DialogTitle>
                      </span>
                      <div
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "12px",
                        }}
                      >
                        <DialogActions>
                          <Button
                            onClick={this.handleClose}
                            className="dialogButton"
                            style={{ padding: "0 !important", outline: "none" }}
                          >
                            <span
                              className="rounded-circle"
                              style={{
                                width: "36px",
                                height: "36px",
                                background: "#E4E6EB",
                              }}
                            >
                              <i
                                style={{ paddingTop: "10px" }}
                                className="fas fa-times"
                              ></i>
                            </span>
                          </Button>
                        </DialogActions>
                      </div>
                    </div>

                    {
                      <div>
                        <hr />
                        <span
                          style={{ display: "flex", paddingBottom: "16px" }}
                        >
                          <img
                            className="rounded-circle mr-2"
                            src={profile.user.avatar}
                            alt="user"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span
                            style={{
                              fontWeight: "600",
                              marginTop: "5px",
                              fontSize: "15px",
                            }}
                          >
                            {profile.user.firstName.charAt(0).toUpperCase() +
                              profile.user.firstName.slice(1)}{" "}
                            {profile.user.lastName.charAt(0).toUpperCase() +
                              profile.user.lastName.slice(1)}
                          </span>
                        </span>
                        <form
                          onSubmit={this.onSubmit}
                          className="form-group"
                          encType="multipart/form-data"
                        >
                          <input
                            type="textarea"
                            onChange={this.handleChange}
                            placeholder="What's on your mind?"
                            value={this.state.text}
                            name="text"
                            style={{
                              border: "none",
                              width: "100%",
                              fontSize: "25px",
                              fontWeight: "400",
                              opacity: "0.6",
                              outline: "none",
                            }}
                          />
                          {/* <input
                            type="file"
                            className="form-control-file"
                            onChange={this.onFileChange}
                          /> */}
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                                onChange={this.onFileChange}
                                aria-describedby="inputGroupFileAddon01"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="inputGroupFile01"
                              >
                                {this.state.filename}
                              </label>
                            </div>
                          </div>

                          <div
                            style={{
                              paddingTop: "16px",
                              paddingBottom: "16px",
                            }}
                          >
                            <input
                              type="submit"
                              value="Post"
                              className={
                                this.state.buttonDisable ||
                                this.state.post === ""
                                  ? "btn btn-block btn-dark disabled"
                                  : "btn btn-block btn-dark"
                              }
                            />
                          </div>
                        </form>
                      </div>
                    }
                  </Dialog>
                </div>
              ) : (
                <div>
                  <button
                    className="btn-block btn btn-lg post-input"
                    onMouseOver={this.changeHoverBackground}
                    onMouseOut={this.changeBackground}
                    onClick={this.handleOpen}
                  >
                    Write something to {profile.user.firstName}
                    {"..."}
                  </button>

                  <Dialog open={this.state.setOpen} onClose={this.handleClose}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <span>
                        <DialogTitle className="form-dialog-title">
                          Create Post
                        </DialogTitle>
                      </span>
                      <div
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "12px",
                        }}
                      >
                        <DialogActions>
                          <Button
                            onClick={this.handleClose}
                            style={{
                              padding: "0 !important",
                              outline: "none",
                              color: "#f0f2f5",
                            }}
                          >
                            <span
                              className="rounded-circle"
                              style={{
                                width: "36px",
                                height: "36px",
                                background: "#E4E6EB",
                              }}
                            >
                              <i
                                style={{ paddingTop: "10px" }}
                                className="fas fa-times"
                              ></i>
                            </span>
                          </Button>
                        </DialogActions>
                      </div>
                    </div>

                    {
                      <div>
                        <hr />
                        <span
                          style={{ display: "flex", paddingBottom: "16px" }}
                        >
                          <img
                            className="rounded-circle mr-2"
                            src={profile.user.avatar}
                            alt="user"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span
                            style={{
                              fontWeight: "600",
                              marginTop: "5px",
                              fontSize: "15px",
                            }}
                          >
                            {user.firstName.charAt(0).toUpperCase() +
                              user.firstName.slice(1)}{" "}
                            {user.lastName.charAt(0).toUpperCase() +
                              user.lastName.slice(1)}
                          </span>
                        </span>
                        <form onSubmit={this.onSubmit}>
                          <input
                            type="textarea"
                            onChange={this.handleChange}
                            placeholder={`Write something to ${profile.user.firstName}...`}
                            value={this.state.text}
                            name="text"
                            style={{
                              border: "none",
                              width: "100%",
                              fontSize: "25px",
                              fontWeight: "400",
                              opacity: "0.6",
                              outline: "none",
                            }}
                          />
                          <div
                            style={{
                              paddingTop: "16px",
                              paddingBottom: "16px",
                            }}
                          >
                            <input
                              type="submit"
                              value="Post"
                              className={
                                this.state.buttonDisable ||
                                this.state.post === ""
                                  ? "btn btn-block btn-dark disabled"
                                  : "btn btn-block btn-dark"
                              }
                            />
                          </div>
                        </form>
                      </div>
                    }
                  </Dialog>
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

CreatePost.PropType = {
  auth: PropType.object.isRequired,
  profile: PropType.object.isRequired,
  post: PropType.object.isRequired,
  // addPost: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {})(withRouter(CreatePost));
