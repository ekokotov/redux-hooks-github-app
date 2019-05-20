import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
  if (!rest.initialized) {
    return null;
  }
  return <Route {...rest} render={props => rest.authenticated ? <Component {...props} />
    : <Redirect to={'/login'}/>}
  />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(state => ({
  initialized: state.auth.initialized,
  authenticated: state.auth.me
}))(PrivateRoute);
