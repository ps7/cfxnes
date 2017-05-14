/* eslint-disable react/forbid-component-props */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {logoSvg} from '../../images';
import Nav from './Nav';
import './Header.css';

const Header = ({toolbar}) => (
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
    <Nav type="help">
      <Nav.Link to="/about" label="About" icon="question-circle"/>
    </Nav>
  </header>
);

Header.propTypes = {
  toolbar: PropTypes.element,
};

Header.defaultProps = {
  toolbar: null,
};

export default Header;
