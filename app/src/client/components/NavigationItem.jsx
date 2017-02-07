import React from 'react';
import {Link} from 'react-router';
import Icon from './Icon';

const NavigationItem = ({path, caption, icon}) => (
  <Link to={path} activeClassName="active">
    <Icon name={icon}/> {caption}
  </Link>
);

NavigationItem.propTypes = {
  path: React.PropTypes.string.isRequired,
  caption: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
};

export default NavigationItem;
