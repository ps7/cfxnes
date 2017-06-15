import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.css';

export default class Button extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    refButton: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: null,
    active: false,
    disabled: false,
    onClick: null,
    refButton: null,
    children: null,
  };

  setElement = element => {
    this.element = element;
  }

  render() {
    const {className, active, refButton, children, ...attrs} = this.props;
    const fullClassName = classNames('button', {active}, className);

    return (
      <button type="button" ref={refButton} className={fullClassName} {...attrs}>
        {children}
      </button>
    );
  }

}
