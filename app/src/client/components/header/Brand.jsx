import React from 'react';
import {Link} from 'react-router-dom';
import {logoSvg} from '../../images';
import './Brand.css';

export default () => (
  <Link className="brand" to="/emulator">
    <img className="brand-logo" src={logoSvg} alt="cfxnes logo"/>
    <h1 className="brand-title">cfxnes</h1>
  </Link>
);
