import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const Panel = ({icon, caption, collapsed, children, onHeaderClick}) => (
  <div className={classNames('panel', {collapsed})}>
    <div className={classNames('panel-header', {clickable: onHeaderClick != null})} onClick={onHeaderClick}>
      {icon && <Icon name={icon}/>} {caption}
    </div>
    <div className="panel-body">
      {children}
    </div>
  </div>
);

Panel.propTypes = {
  icon: React.PropTypes.string,
  caption: React.PropTypes.string.isRequired,
  collapsed: React.PropTypes.bool,
  children: React.PropTypes.node,
  onHeaderClick: React.PropTypes.func,
};

Panel.defaultProps = {
  icon: null,
  collapsed: false,
  children: null,
  onHeaderClick: null,
};

export default Panel;
