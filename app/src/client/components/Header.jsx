import React from 'react';
import {Link} from 'react-router';
import Navigation from './Navigation';
import NavigationItem from './NavigationItem';

const Header = ({toolbar}) => (
  <header>
    <Link to="/">cfxnes</Link>
    <Navigation>
      <NavigationItem path="/emulator" caption="Emulator" icon="gamepad"/>
      <NavigationItem path="/library" caption="Library" icon="book"/>
      <NavigationItem path="/settings" caption="Settings" icon="cog"/>
    </Navigation>
    {toolbar}
    <Navigation>
      <NavigationItem path="/about" caption="About" icon="question-circle"/>
    </Navigation>
  </header>
);

Header.propTypes = {
  toolbar: React.PropTypes.element,
};

Header.defaultProps = {
  toolbar: null,
};

export default Header;
