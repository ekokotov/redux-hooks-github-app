import React, {Component, Fragment} from 'react';
import {loadFeed, loadNextPage} from "../../store/feed/actions";
import Event from "./event";

import {connect} from "react-redux";

class Feed extends Component {
  componentDidMount() {
    this.props.loadFeed();
  }

  loadNextPage = () => {
    this.props.loadNextPage();
    this.props.loadFeed();
  }

  render() {
    const feeds = this.props.feeds;

    return (
      <Fragment>
        <h3>Feed
          {!feeds.inProgress && <span className="badge badge-info mr-1 ml-1">{feeds.events.length}</span>}
          :</h3>
        {feeds.inProgress && <div className="d-flex justify-content-center mt-5">
        <span className="spinner-border spinner-border-md text-info" role="status">
            <span className="sr-only">in Progress...</span>
          </span>
        </div>}
        <ul className="list-group">
          {feeds.events.map(event => <Event data={event}/>)}
        </ul>
        <div className="d-flex justify-content-center">
          {feeds.events.length ?
            <button className="btn btn-outline-success btn-sm m-3" onClick={this.loadNextPage}>
              {feeds.inProgress ?
                <Fragment>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                  <span className="sr-only">Loading...</span> Loading...
                </Fragment> :
                <span>Load more</span>}
            </button> : null}
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  feeds: state.feeds
}), {
  loadFeed,
  loadNextPage
})(Feed);
