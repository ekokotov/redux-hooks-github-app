import React, {Fragment, useEffect, Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "redux2hooks";
import {loadRepositories as load} from '../../store/repos/actions';
import Repo from "./repo";
import {reposCountSelector} from "../../store/repos/selector";

// Check how works class version with new connect
class Repositories extends Component {
  componentDidMount() {
    this.props.loadRepositories();
  }

  render() {
    return (
      <Fragment>
        <h3>Repositories
          {!this.props.inProgress && <span className="badge badge-info mr-1 ml-1">{this.props.reposCount}</span>}
          :</h3>
        {this.props.inProgress && <div className="d-flex justify-content-center mt-5">
        <span className="spinner-border spinner-border-md text-info" role="status">
            <span className="sr-only">in Progress...</span>
          </span>
        </div>}
        <ul className="list-group">
          {this.props.repos.map(repo => <Repo repository={repo}/>)}
        </ul>
      </Fragment>
    );
  }
}

// function Repositories(props) {
//   useEffect(() => {
//     props.loadRepositories()
//   }, []);
//
//   return (
//     <Fragment>
//       <h3>Repositories
//         {!props.inProgress && <span className="badge badge-info mr-1 ml-1">{props.reposCount}</span>}
//         :</h3>
//       {props.inProgress && <div className="d-flex justify-content-center mt-5">
//         <span className="spinner-border spinner-border-md text-info" role="status">
//             <span className="sr-only">in Progress...</span>
//           </span>
//       </div>}
//       <ul className="list-group">
//         {props.repos.map(repo => <Repo repository={repo}/>)}
//       </ul>
//     </Fragment>
//   );
// }

Repositories.propTypes = {
  repos: PropTypes.array,
  reposCount: PropTypes.number,
  inProgress: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    repos: state.repositories.items,
    reposCount: reposCountSelector(state),
    inProgress: state.repositories.inProgress
  }),
  {loadRepositories: load}
)(Repositories);
