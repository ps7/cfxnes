import React from 'react';
import {Header} from './header';

const AppLayout = ({main, toolbar}) => (
  <div className="app">
    <Header toolbar={toolbar}/>
    {main}
  </div>
);

AppLayout.propTypes = {
  main: React.PropTypes.element.isRequired,
  toolbar: React.PropTypes.element,
};

AppLayout.defaultProps = {
  toolbar: null,
};

export default AppLayout;
