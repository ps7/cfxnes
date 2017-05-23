import React from 'react';
import PropTypes from 'prop-types';
import {Theme} from '../../enums';
import {Button, Icon, Tooltip} from '../common';
import './ThemeSwitch.css';

const ThemeSwitch = ({value, onSwitch}) => (
  <Button className="theme-switch" onClick={onSwitch}>
    <Icon name={Theme.getIcon(value)}/>
    <Tooltip position="bottom">{Theme.getLabel(value) + ' theme'}</Tooltip>
  </Button>
);

ThemeSwitch.propTypes = {
  value: PropTypes.oneOf(Theme.values).isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default ThemeSwitch;
