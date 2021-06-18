/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPost, removeComment } from "../../actions/post";
import PostItem from "./PostItem";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import Alert from "../layout/Alert";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Post = ({ getPost, match, post, loading, auth, removeComment }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, []);
  return (
    <>
      <div className="container">
        <Alert />
        {loading || post === null ? (
          <Spinner />
        ) : (
          <>
            <PostItem post={post} showActionButton={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
              {post.comments.map((comment, ind) => {
                return (
                  <div className="post bg-white p-1 my-1" key={ind}>
                    <div>
                      <Link to={`/profile/${comment.user}`}>
                        <img
                          className="round-img"
                          src={comment.avatar}
                          alt=""
                        />
                        <h4>{comment.name}</h4>
                      </Link>
                    </div>
                    <div>
                      <p className="my-1">{comment.text}</p>
                      <p className="post-date">
                        <Moment format="YYYY/MM/DD">{comment.date}</Moment>
                      </p>
                      {auth.user && auth.user._id === comment.user && (
                        <button
                          onClick={() => removeComment(post._id, comment._id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost, removeComment })(Post);
