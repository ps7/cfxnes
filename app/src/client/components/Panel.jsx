import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const Panel = ({icon, caption, open, children, onHeaderClick}) => (
  <div className={classNames('panel', {collapsed: !open})}>
    <div className={classNames('panel-header', {clickable: onHeaderClick != null})} onClick={onHeaderClick}>
      <Icon name={icon}/> {caption}
    </div>
    <div className="panel-body">
      {children}
    </div>
  </div>
);

Panel.propTypes = {
  icon: React.PropTypes.string.isRequired,
  caption: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool,
  children: React.PropTypes.node,
  onHeaderClick: React.PropTypes.func,
};

Panel.defaultProps = {
  open: true,
  children: null,
  onHeaderClick: null,
};

export default Panel;
