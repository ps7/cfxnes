/* eslint-disable react/forbid-component-props */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {logoSvg} from '../../images';
import Nav from './Nav';

const Header = ({toolbar}) => (
  <header>
    <Link className="header-logo" to="/">
      <img src={logoSvg} alt="cfxnes logo"/> cfxnes
    </Link>
    <Nav type="main">
      <Nav.Item path="/emulator" caption="Emulator" icon="gamepad"/>
      <Nav.Item path="/library" caption="Library" icon="book"/>
      <Nav.Item path="/settings" caption="Settings" icon="cog"/>
    </Nav>
    {toolbar}
    <Nav type="help">
      <Nav.Item path="/about" caption="About" icon="question-circle"/>
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
