import React from 'react';
import PropTypes from 'prop-types';
import {Theme} from '../../enums';
import ThemeSwitch from './ThemeSwitch';
import Brand from './Brand';
import NavLink from './NavLink';
import connect from './connect';
import './Header.css';

const Header = ({theme, onThemeSwitch, children}) => (
  <header>
    <Brand/>
    <nav>
      <NavLink to="/emulator" label="Emulator" icon="gamepad"/>
      <NavLink to="/library" label="Library" icon="book"/>
      <NavLink to="/settings" label="Settings" icon="cog"/>
    </nav>
    {children}
    <ThemeSwitch value={theme} onSwitch={onThemeSwitch}/>
    <nav>
      <NavLink to="/about" label="About" icon="question-circle"/>
    </nav>
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

export default connect(Header);
