import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "../../store";
import {loadRepositories as load} from '../../store/repos/actions';
import Repo from "./repo";

function Repositories(props) {
  useEffect(() => {
    props.loadRepositories()
  }, []);

  return (
    <Fragment>
      <h3>Repositories
        {!props.inProgress && <span className="badge badge-info mr-1 ml-1">{props.repos.length}</span>}
        :</h3>
      {props.inProgress && <div className="d-flex justify-content-center mt-5">
        <span className="spinner-border spinner-border-md text-info" role="status">
            <span className="sr-only">in Progress...</span>
          </span>
      </div>}
      <ul className="list-group">
        {props.repos.map(repo => <Repo repository={repo}/>)}
      </ul>
    </Fragment>
  );
}

Repositories.propTypes = {
  repos: PropTypes.array,
  inProgress: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    repos: state.repositories.items,
    inProgress: state.repositories.inProgress
  }),
  {loadRepositories: load}
)(Repositories);
