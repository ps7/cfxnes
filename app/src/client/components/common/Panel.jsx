import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const Panel = ({id, icon, caption, collapsed, children, onHeaderClick}) => (
  <div id={id} className={classNames('panel', {collapsed})}>
    <div className={classNames('panel-header', {clickable: onHeaderClick != null})} onClick={onHeaderClick}>
      {icon && <Icon name={icon}/>} {caption}
    </div>
    <div className="panel-body">
      {children}
    </div>
  </div>
);

Panel.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  caption: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
  children: PropTypes.node,
  onHeaderClick: PropTypes.func,
};

Panel.defaultProps = {
  id: null,
  type: null,
  icon: null,
  collapsed: false,
  children: null,
  onHeaderClick: null,
};

export default Panel;
