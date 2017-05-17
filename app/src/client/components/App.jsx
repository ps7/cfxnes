import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Theme} from '../enums';
import {Header} from './header';
import './App.css';

const App = ({main, toolbar, theme}) => (
  <div id="app" className={`${theme}-theme`}>
    <Header toolbar={toolbar}/>
    {main}
  </div>
);

App.propTypes = {
  main: PropTypes.element.isRequired,
  toolbar: PropTypes.element,
  theme: PropTypes.oneOf(Theme.values).isRequired,
};

App.defaultProps = {
  toolbar: null,
};

const mapStateToProps = state => ({
  theme: state.settings.values.theme,
});

export default connect(mapStateToProps)(App);
