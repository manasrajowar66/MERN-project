/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Alert from "../layout/Alert";

const Posts = ({ getPosts, posts, loading }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return loading ? (
    <section className="container">
      <Spinner />
    </section>
  ) : (
    <>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community!
        </p>
        <PostForm />
        <div className="posts">
          {posts.map((post, ind) => {
            return <PostItem key={ind} post={post} showActionButton={true} />;
          })}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.post.loading,
});

export default connect(mapStateToProps, { getPosts })(Posts);
