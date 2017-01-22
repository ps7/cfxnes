import React from 'react';
import Header from './Header';

const AppLayout = ({main, toolbar}) => (
  <div>
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
