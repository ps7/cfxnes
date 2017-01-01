import React from 'react';
import {Link} from 'react-router';

export default function({path, caption, icon}) {
  return (
    <li className="header-menu-item">
      <Link to={path} activeClassName="active">
        <i className={`fa fa-${icon}`}></i> {caption}
      </Link>
    </li>
  );
}
