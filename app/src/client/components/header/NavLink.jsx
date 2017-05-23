import React from 'react';
import PropTypes from 'prop-types';
import {NavLink as BaseNavLink} from 'react-router-dom';
import {Icon, Tooltip} from '../common';
import './NavLink.css';

const NavLink = ({to, label, icon}) => (
  <BaseNavLink to={to} className="nav-link">
    <Icon className="nav-link-icon" name={icon}/>
    {' '}
    <span className="nav-link-label">{label}</span>
    <Tooltip className="nav-link-tooltip" position="bottom">{label}</Tooltip>
  </BaseNavLink>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default NavLink;
