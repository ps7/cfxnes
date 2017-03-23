import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import Tooltip from './Tooltip';

export default class Button extends React.Component {

  static propTypes = {
    icon: React.PropTypes.string,
    caption: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    autoFocus: React.PropTypes.bool,
    children: React.PropTypes.node,
  };

  static defaultProps = {
    icon: null,
    caption: null,
    tooltip: null,
    active: false,
    disabled: false,
    onClick: null,
    autoFocus: false,
    children: null,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.button.focus();
    }
  }

  setButton = button => {
    this.button = button;
  }

  render() {
    const {icon, caption, tooltip, active, disabled, onClick, children} = this.props;
    return (
      <button type="button" className={classNames('button', {active})}
              disabled={disabled} onClick={onClick} ref={this.setButton}>
        {children}
        {!children && icon && <Icon name={icon}/>} {!children && caption}
        {!children && tooltip && <Tooltip>{tooltip}</Tooltip>}
      </button>
    );
  }

}
