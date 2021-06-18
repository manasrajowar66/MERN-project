/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";

const ProfileGithub = ({
  profile: { gitHubUsername },
  repos,
  getGithubRepos,
}) => {
  useEffect(() => {
    getGithubRepos(gitHubUsername);
  }, []);
  return (
    <>
      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github"></i> Github Repos
        </h2>
        {!repos ? (
          <Spinner />
        ) : (
          repos.map((repo, ind) => {
            return (
              <div key={ind} className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description && repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">
                      Stars: {repo.stargazers_count}
                    </li>
                    <li className="badge badge-dark">
                      Watchers: {repo.watchers_count}
                    </li>
                    <li className="badge badge-light">
                      Forks: {repo.forks_count}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return { repos: state.profile.repos };
}

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
