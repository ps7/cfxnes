import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';

export default class Button extends React.Component {

  static propTypes = {
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.node,
    ]),
    caption: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    focus: React.PropTypes.bool,
    children: React.PropTypes.node,
  };

  static defaultProps = {
    icon: null,
    caption: null,
    tooltip: null,
    active: false,
    disabled: false,
    onClick: null,
    focus: false,
    children: null,
  };

  componentDidMount() {
    if (this.props.focus) {
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
          title={tooltip} disabled={disabled} onClick={onClick} ref={this.setButton}>
        {children}
        {!children && (typeof icon === 'string' ? <Icon name={icon}/> : icon)}
        {!children && caption}
      </button>
    );
  }

}
