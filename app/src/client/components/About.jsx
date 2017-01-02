import React from 'react';
import logo from '../images/logo.svg';
import Changelog from './Changelog';

export default class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {changelogVisible: false};
  }

  showChangelog = () => {
    this.setState({changelogVisible: true});
  }

  render() {
    return (
      <main className="about">
        <div class="about-logo">
          <img src={logo} alt="cfxnes logo"/>
        </div>
        <div class="about-text">
          <h1>cfxnes (TODO version)</h1>
          <p>JavaScript NES emulator and emulation library.</p>
          <p>The source code is available at <a href="https://github.com/jpikl/cfxnes">github</a> and licensed under the MIT License.</p>
          <p>Copyright © 2014-2017 Jan Pikl</p>
          {this.state.changelogVisible 
            ? <Changelog/>
            : <a href="javascript:void(0)" onClick={this.showChangelog}>Show change log</a>
          }
        </div>
      </main>
    );
  }
  
}
