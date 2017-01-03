import React from 'react';
import {Link} from 'react-router';
import HeaderMenu from './HeaderMenu';
import HeaderMenuItem from './HeaderMenuItem';

export default ({toolbar}) => (
  <header>
    <Link to="/">cfxnes</Link>
    <HeaderMenu>
      <HeaderMenuItem path="/emulator" caption="Emulator" icon="gamepad"/>
      <HeaderMenuItem path="/library" caption="Library" icon="book"/>
      <HeaderMenuItem path="/settings" caption="Settings" icon="cog"/>
    </HeaderMenu>
    {toolbar}
    <HeaderMenu>
      <HeaderMenuItem path="/about" caption="About" icon="question-circle"/>
    </HeaderMenu>
  </header>
);
