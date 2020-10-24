import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import {
  getPost,
  updateLike,
  deletePost,
  addComment,
  deleteComment,
} from "../action/post";
import Moment from "react-moment";
import { getAllUser } from "../action/auth";
import { Link } from "react-router-dom";

class ListUserPost extends Component {
  constructor() {
    super();
    this.state = {
      comments: false,
      commentPostID: "",
      postId: "",
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCommentClick = this.onCommentClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getPost();
    this.props.getAllUser();
  }

  onCommentClick(e, postID) {
    e.preventDefault();
    this.setState({ commentPostID: postID });
    this.setState((prevState) => ({
      comments: !prevState.comments,
    }));
  }
  handleChange(e, postID) {
    e.preventDefault();

    this.setState({
      postId: postID,
    });

    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e, postID) {
    e.preventDefault();
    const formData = {
      text: this.state.text,
    };
    this.props.addComment(postID, formData);
    this.setState({ text: "" });
  }
  render() {
    const { posts } = this.props.posts;
    const { profile } = this.props.profile;
    const { user, users } = this.props.auth;
    return (
      <div>
        <div className="card-content">
          <div className="card">
            <div className="card-body">
              <h1
                style={{ fontWeight: "700", fontSize: "23px" }}
                className="display-5"
              >
                Posts
              </h1>
              <hr />
            </div>
          </div>
        </div>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <h1 className="display-5 post-text">No Post</h1>
          </div>
        ) : (
          posts.map((post, index) => {
            return post.user._id === profile.user._id ? (
              <div key={post._id}>
                <div className="card-content">
                  <div className="card">
                    <div className="card-body">
                      <span
                        style={{
                          display: "flex",
                          paddingBottom: "16px",
                        }}
                      >
                        <img
                          className="rounded-circle mr-2"
                          src={post.user.avatar}
                          alt="user"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <div style={{ display: "grid" }}>
                          <Link
                            to={`/profile/${profile.handle}`}
                            style={{
                              fontWeight: "600",
                              fontSize: "15px",
                              color: "black",
                            }}
                          >
                            {post.user.firstName.charAt(0).toUpperCase() +
                              post.user.firstName.slice(1)}{" "}
                            {post.user.lastName.charAt(0).toUpperCase() +
                              post.user.lastName.slice(1)}
                          </Link>

                          <div style={{ fontSize: "13px", opacity: "0.8" }}>
                            <Moment format="MMMM Do, YYYY">{post.date}</Moment>
                            <i
                              style={{ marginLeft: "5px" }}
                              className="fas fa-globe-africa"
                            ></i>
                          </div>
                        </div>
                      </span>
                      <span style={{ fontSize: "24px" }}>{post.text}</span>
                      {post.images ? (
                        <div>
                          <img
                            src={"http://localhost:5000/" + post.images}
                            alt="Post"
                            className="mt-2"
                          />
                        </div>
                      ) : null}
                      <div>
                        {post.likes.length === 0
                          ? null
                          : post.likes.length === 1
                          ? users.map((user) => {
                              return post.likes.map((like) => {
                                return user._id === like.user ? (
                                  <span
                                    key={user._id}
                                    style={{
                                      display: "flex",
                                      fontSize: "15px",
                                      margin: "0px 16px",
                                      padding: "10px 0px",
                                    }}
                                  >
                                    <div>
                                      <i
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                        className="fas fa-thumbs-up mr-2"
                                      ></i>
                                      {user.firstName.charAt(0).toUpperCase() +
                                        user.firstName.slice(1)}{" "}
                                      {user.lastName.charAt(0).toUpperCase() +
                                        user.lastName.slice(1)}
                                    </div>

                                    <div style={{ marginLeft: "auto" }}>
                                      {post.comments.length === 0
                                        ? null
                                        : post.comments.length + " Comments"}
                                    </div>
                                  </span>
                                ) : null;
                              });
                            })
                          : users.map((allUser) => {
                              return post.likes.map((like) => {
                                return allUser._id === like.user ? (
                                  <span
                                    key={allUser._id}
                                    style={{
                                      display: "flex",
                                      fontSize: "15px",
                                      margin: "0px 16px",
                                      padding: "10px 0px",
                                    }}
                                  >
                                    <div>
                                      <i
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                        className="fas fa-thumbs-up mr-2"
                                      ></i>
                                      {allUser._id === user.id ? (
                                        <div>
                                          {"You, and" +
                                            post.likes.length +
                                            " others"}
                                        </div>
                                      ) : (
                                        <div>
                                          {" "}
                                          {allUser.firstName
                                            .charAt(0)
                                            .toUpperCase() +
                                            allUser.firstName.slice(1)}{" "}
                                          {allUser.lastName
                                            .charAt(0)
                                            .toUpperCase() +
                                            allUser.lastName.slice(1)}{" "}
                                          {" and "} {post.likes.length}{" "}
                                          {" others"}
                                        </div>
                                      )}
                                    </div>

                                    <div style={{ marginLeft: "auto" }}>
                                      {post.comments.length === 0
                                        ? null
                                        : post.comments.length + " Comments"}
                                    </div>
                                  </span>
                                ) : null;
                              });
                            })}
                      </div>
                      <div>
                        <hr />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          fontSize: "17px",
                          paddingBottom: "10px",
                          paddingTop: "10px",
                        }}
                      >
                        <button
                          className="post-button"
                          onClick={() => this.props.updateLike(post._id)}
                        >
                          {post.likes.length === 0 ? (
                            <div>
                              <i className="far fa-thumbs-up mr-2"></i>
                              <span>Like</span>
                            </div>
                          ) : (
                            post.likes.map((like, index) => {
                              return (
                                <div key={index}>
                                  {post.user._id === like.user ? (
                                    <div>
                                      <i className="fas fa-thumbs-up mr-2"></i>
                                      <span>Like</span>
                                    </div>
                                  ) : (
                                    <div>
                                      <i className="far fa-thumbs-up mr-2"></i>
                                      <span>Like</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </button>

                        <button
                          className="post-button"
                          onClick={() => {
                            for (let i = 0; i <= index; i++) {
                              document.getElementById(i).focus();
                            }
                          }}
                        >
                          <i className="far fa-comment-alt mr-2"></i>Comment
                        </button>
                      </div>
                      <hr style={{ paddingBottom: "10px" }} />
                      {post.comments.length === 0 ? (
                        <div></div>
                      ) : post.comments.length === 1 ? (
                        <span style={{ display: "flex" }}>
                          <img
                            className="rounded-circle mr-2"
                            src={post.comments[0].avatar}
                            style={{ width: "32px", height: "32px" }}
                            alt="user"
                          />
                          <span
                            style={{
                              background: "#F0F2F5",
                              padding: "8px 12px",
                              borderRadius: "15px",
                            }}
                          >
                            <div
                              style={{ fontSize: "13px", fontWeight: "600" }}
                            >
                              {post.comments[0].firstName}{" "}
                              {post.comments[0].lastName}
                            </div>
                            <div
                              style={{
                                fontSize: "15px",
                                lineHeight: "1.3333",
                              }}
                            >
                              {post.comments[0].text}
                            </div>
                          </span>
                        </span>
                      ) : (
                        <div>
                          <button
                            id={post._id}
                            onClick={(e) => {
                              this.onCommentClick(e, post._id);
                            }}
                            style={{
                              color: "black",
                              opacity: "0.7",
                              paddingBottom: "10px",
                              textDecoration: "none",
                              fontWeight: "600",
                              display: "block",
                              outline: "none",
                              border: "none",
                              background: "white",
                            }}
                          >
                            View {post.comments.length - 1} more comments
                          </button>
                          <span style={{ display: "flex" }}>
                            <img
                              className="rounded-circle mr-2"
                              src={post.comments[0].avatar}
                              style={{ width: "32px", height: "32px" }}
                              alt="user"
                            />
                            <span
                              style={{
                                background: "#F0F2F5",
                                padding: "8px 12px",
                                borderRadius: "15px",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                {post.comments[0].firstName}{" "}
                                {post.comments[0].lastName}
                              </div>
                              <div
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "1.3333",
                                }}
                              >
                                {post.comments[0].text}
                              </div>
                            </span>
                          </span>
                          {this.state.comments &&
                            post._id === this.state.commentPostID &&
                            post.comments.slice(1).map((comment) => {
                              return (
                                <span
                                  key={comment._id}
                                  className="mb-3 mt-3"
                                  style={{ display: "flex" }}
                                >
                                  <img
                                    className="rounded-circle mr-2"
                                    src={comment.avatar}
                                    style={{ width: "32px", height: "32px" }}
                                    alt="user"
                                  />
                                  <span
                                    style={{
                                      background: "#F0F2F5",
                                      padding: "8px 12px",
                                      borderRadius: "15px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: "13px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {comment.firstName} {comment.lastName}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "15px",
                                        lineHeight: "1.3333",
                                      }}
                                    >
                                      {comment.text}
                                    </div>
                                  </span>
                                </span>
                              );
                            })}
                        </div>
                      )}

                      <div
                        style={{ paddingTop: "10px", paddingBottom: "10px" }}
                      >
                        <span style={{ display: "flex" }}>
                          <img
                            className="rounded-circle mr-2"
                            src={profile.user.avatar}
                            style={{ width: "32px", height: "32px" }}
                            alt="user"
                          />

                          <form
                            onSubmit={(e) => {
                              this.onSubmit(e, post._id);
                            }}
                            style={{ width: "100%" }}
                          >
                            {
                              <input
                                id={index}
                                className="comment btn-block post-comment"
                                type="text"
                                onChange={(e) => {
                                  this.handleChange(e, post._id);
                                }}
                                placeholder="Write a comment..."
                                value={
                                  this.state.postId === post._id
                                    ? this.state.text
                                    : ""
                                }
                                name="text"
                              />
                            }
                            <input type="submit" id="submitbtn" />
                          </form>
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ marginBottom: "0", fontSize: "12px" }}>
                          Press Enter to post.
                        </p>
                        {user.id === post.user._id ? (
                          <button
                            className="post-button"
                            onClick={() => this.props.deletePost(post._id)}
                            style={{
                              display: "flex",
                            }}
                          >
                            <i className="far fa-trash-alt mr-2"></i>
                            <p
                              style={{ fontSize: "13px", marginBottom: "0px" }}
                            >
                              Delete Post
                            </p>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })
        )}
      </div>
    );
  }
}

ListUserPost.PropType = {
  posts: PropType.object.isRequired,
  profile: PropType.object.isRequired,
  auth: PropType.object.isRequired,
  getPost: PropType.func.isRequired,
  updateLike: PropType.func.isRequired,
  deletePost: PropType.func.isRequired,
  addComment: PropType.func.isRequired,
  deleteComment: PropType.func.isRequired,
  getAllUser: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  updateLike,
  deletePost,
  addComment,
  deleteComment,
  getAllUser,
})(ListUserPost);
