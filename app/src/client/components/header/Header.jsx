/* eslint-disable react/forbid-component-props */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {logoSvg} from '../../images';
import {Theme} from '../../enums';
import {switchTheme} from '../../actions';
import {Button, Icon, Tooltip} from '../common';
import Nav from './Nav';
import './Header.css';

const Header = ({toolbar, theme, onThemeSwitch}) => (
  <header>
    <Link className="header-logo" to="/">
      <img src={logoSvg} alt="cfxnes logo"/> cfxnes
    </Link>
    <Nav type="main">
      <Nav.Link to="/emulator" label="Emulator" icon="gamepad"/>
      <Nav.Link to="/library" label="Library" icon="book"/>
      <Nav.Link to="/settings" label="Settings" icon="cog"/>
    </Nav>
    {toolbar}
    <Button id="theme-switch" onClick={onThemeSwitch}>
      <Icon name={Theme.getIcon(theme)}/>
      <Tooltip position="bottom">{Theme.getLabel(theme) + ' theme'}</Tooltip>
    </Button>
    <Nav type="help">
      <Nav.Link to="/about" label="About" icon="question-circle"/>
    </Nav>
  </header>
);

Header.propTypes = {
  toolbar: PropTypes.element,
  theme: PropTypes.oneOf(Theme.values).isRequired,
  onThemeSwitch: PropTypes.func.isRequired,
};

Header.defaultProps = {
  toolbar: null,
};

const mapStateToProps = state => ({
  theme: state.settings.values.theme,
});

const mapDispatchToProps = dispatch => ({
  onThemeSwitch: () => dispatch(switchTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
