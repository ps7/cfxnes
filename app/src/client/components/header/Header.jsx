import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {logoSvg} from '../../images';
import {Theme} from '../../enums';
import {switchTheme} from '../../actions';
import {Button, Icon, Tooltip} from '../common';
import Nav from './Nav';
import './Header.css';

const Header = ({theme, onThemeSwitch, children}) => (
  <header>
    <NavLink className="header-logo" to="/">
      <img src={logoSvg} alt="cfxnes logo"/> cfxnes
    </NavLink>
    <Nav type="main">
      <Nav.Link to="/emulator" label="Emulator" icon="gamepad"/>
      <Nav.Link to="/library" label="Library" icon="book"/>
      <Nav.Link to="/settings" label="Settings" icon="cog"/>
    </Nav>
    {children}
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
  theme: PropTypes.oneOf(Theme.values).isRequired,
  onThemeSwitch: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
  theme: state.settings.values.theme,
});

const mapDispatchToProps = dispatch => ({
  onThemeSwitch: () => dispatch(switchTheme()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
