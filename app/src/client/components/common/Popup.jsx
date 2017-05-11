import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import './Popup.css';

export default class Popup extends Component {

  static propTypes = {
    className: PropTypes.string,
    onBlur: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: null,
    onBlur: null,
    children: null,
  };

  componentDidMount() {
    addEventListener('mousedown', this.handleMouseDown);
  }

  componentWillUnmount() {
    removeEventListener('mousedown', this.handleMouseDown);
  }

  setElement = element => {
    this.element = element;
  }

  handleMouseDown = event => {
    const {onBlur} = this.props;
    if (onBlur) {
      const {clientX, clientY} = event;
      const {top, left, right, bottom} = this.element.getBoundingClientRect();
      if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
        onBlur();
      }
    }
  };

  render() {
    const {className, children} = this.props;
    return (
      <div className={classNames('popup', className)} ref={this.setElement}>
        {children}
      </div>
    );
  }

}
