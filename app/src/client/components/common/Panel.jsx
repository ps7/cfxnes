import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './Panel.css';

const Panel = ({className, collapsed, children, ...attrs}) => (
  <div className={classNames('panel', className, {collapsed})} {...attrs}>
    {children}
  </div>
);

Panel.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  children: PropTypes.node,
};

Panel.defaultProps = {
  className: null,
  collapsed: false,
  children: null,
};

Panel.Header = ({className, children, ...attrs}) => (
  <div className={classNames('panel-header', className)} {...attrs}>
    {children}
  </div>
);

Panel.Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Panel.Header.defaultProps = {
  className: null,
  children: null,
};

Panel.Body = ({className, children, ...attrs}) => (
  <div className={classNames('panel-body', className)} {...attrs}>
    {children}
  </div>
);

Panel.Body.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Panel.Body.defaultProps = {
  className: null,
  children: null,
};

export default Panel;
