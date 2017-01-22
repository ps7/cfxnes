import React from 'react';
import {Link} from 'react-router';
import Icon from './Icon';

const HederMenuItem = ({path, caption, icon}) => (
  <li className="header-menu-item">
    <Link to={path} activeClassName="active">
      <Icon name={icon}/> {caption}
    </Link>
  </li>
);

HederMenuItem.propTypes = {
  path: React.PropTypes.string.isRequired,
  caption: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
};

export default HederMenuItem;
