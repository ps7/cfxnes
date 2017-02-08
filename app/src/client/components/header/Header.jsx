import React from 'react';
import {Link} from 'react-router';
import {logoSvg} from '../../images';
import Nav from './Nav';
import NavItem from './NavItem';

const Header = ({toolbar}) => (
  <header>
    <Link className="header-logo" to="/">
      <img src={logoSvg} alt="cfxnes logo"/> cfxnes
    </Link>
    <Nav type="main">
      <NavItem path="emulator" caption="Emulator" icon="gamepad"/>
      <NavItem path="library" caption="Library" icon="book"/>
      <NavItem path="settings" caption="Settings" icon="cog"/>
    </Nav>
    {toolbar}
    <Nav type="help">
      <NavItem path="about" caption="About" icon="question-circle"/>
    </Nav>
  </header>
);

Header.propTypes = {
  toolbar: React.PropTypes.element,
};

Header.defaultProps = {
  toolbar: null,
};

export default Header;
