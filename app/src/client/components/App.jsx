import React, {PropTypes} from 'react';
import {Header} from './header';
import './App.css';

const App = ({main, toolbar}) => (
  <div className="app">
    <Header toolbar={toolbar}/>
    {main}
  </div>
);

App.propTypes = {
  main: PropTypes.element.isRequired,
  toolbar: PropTypes.element,
};

App.defaultProps = {
  toolbar: null,
};

export default App;
