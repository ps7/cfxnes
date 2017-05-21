import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Theme} from '../enums';
import './App.css';

const App = ({theme, children}) => (
  <div id="app" className={`${theme}-theme`}>
    {children}
  </div>
);

App.propTypes = {
  theme: PropTypes.oneOf(Theme.values).isRequired,
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
  theme: state.settings.values.theme,
});

export default withRouter(connect(mapStateToProps)(App));
