import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';
import './Button.css';

export default class Button extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    autoFocus: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: null,
    active: false,
    disabled: false,
    onClick: null,
    autoFocus: false,
    children: null,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.element.focus();
    }
  }

  setElement = element => {
    this.element = element;
  }

  render() {
    const {className, active, children, ...attrs} = this.props;
    return (
      <button type="button" ref={this.setElement}
              className={classNames('button', {active}, className)}
              {...attrs}>
        {children}
      </button>
    );
  }

}
