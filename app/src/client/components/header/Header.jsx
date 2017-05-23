import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Theme} from '../../enums';
import {switchTheme} from '../../actions';
import Brand from './Brand';
import Nav from './Nav';
import ThemeSwitch from './ThemeSwitch';
import './Header.css';

const Header = ({theme, onThemeSwitch, children}) => (
  <header>
    <Brand/>
    <Nav>
      <Nav.Link to="/emulator" label="Emulator" icon="gamepad"/>
      <Nav.Link to="/library" label="Library" icon="book"/>
      <Nav.Link to="/settings" label="Settings" icon="cog"/>
    </Nav>
    {children}
    <ThemeSwitch value={theme} onSwitch={onThemeSwitch}/>
    <Nav>
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
