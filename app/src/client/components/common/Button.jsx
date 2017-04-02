import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import Tooltip from './Tooltip';

export default class Button extends Component {

  static propTypes = {
    icon: PropTypes.string,
    caption: PropTypes.string,
    tooltip: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    autoFocus: PropTypes.bool,
    children: PropTypes.node,
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
