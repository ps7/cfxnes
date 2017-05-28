import React, {PureComponent} from 'react';
import {logoSvg} from '../../images';
import {LinkButton} from '../common';
import Changelog from './Changelog';
import cfxnes from 'cfxnes';
import './About.css';

export default class About extends PureComponent {

  state = {
    changelogVisible: false,
  };

  handleShowChangelog = () => {
    this.setState({changelogVisible: true});
  };

  render() {
    return (
      <main className="about">
        <div className="about-section">
          <img className="about-logo" src={logoSvg} alt="cfxnes logo"/>
        </div>
        <div className="about-section">
          <h1>cfxnes ({cfxnes.version})</h1>
          <p>JavaScript NES emulator and emulation library.</p>
          <p>The source code is available at <a href="https://github.com/jpikl/cfxnes">github</a> and licensed under the MIT License.</p>
          <p>Copyright © 2014-2017 Jan Pikl</p>
          {this.state.changelogVisible
            ? <Changelog/>
            : <LinkButton onClick={this.handleShowChangelog}>Show change log</LinkButton>
          }
        </div>
      </main>
    );
  }

}
