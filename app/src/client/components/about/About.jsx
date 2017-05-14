import React, {PureComponent} from 'react';
import {logoSvg} from '../../images';
import Changelog from './Changelog';
import cfxnes from 'cfxnes';
import './About.css';

export default class About extends PureComponent {

  state = {changelogVisible: false};

  handleShowChangelog = event => {
    event.preventDefault();
    this.setState({changelogVisible: true});
  };

  render() {
    return (
      <main className="about">
        <div className="about-logo">
          <img src={logoSvg} alt="cfxnes logo"/>
        </div>
        <div className="about-text">
          <h1>cfxnes ({cfxnes.version})</h1>
          <p>JavaScript NES emulator and emulation library.</p>
          <p>The source code is available at <a href="https://github.com/jpikl/cfxnes">github</a> and licensed under the MIT License.</p>
          <p>Copyright © 2014-2017 Jan Pikl</p>
          {this.state.changelogVisible
            ? <Changelog/>
            : <a href="#" onClick={this.handleShowChangelog}>Show change log</a>
          }
        </div>
      </main>
    );
  }

}
