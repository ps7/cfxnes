import React, {PureComponent, PropTypes} from 'react';
import {CHECKBOX, NUMBER, RANGE, values as inputTypes} from './InputType';

function getInputValue(input) {
  const {type} = input;
  if (type === CHECKBOX) {
    return input.checked;
  }
  const {value} = input;
  if (type === NUMBER || type === RANGE) {
    return parseFloat(value);
  }
  return value;
}

export default class Input extends PureComponent {

  static propTypes = {
    type: PropTypes.oneOf(inputTypes).isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: null,
    onChange: null,
  };

  handleChange = event => {
    const {onChange} = this.props;
    if (onChange) {
      onChange(getInputValue(event.target));
    }
  };

  render() {
    const {type, value, ...attrs} = this.props;
    return <input {...attrs} type={type}
                  value={type !== CHECKBOX ? value : undefined}
                  checked={type === CHECKBOX && value}
                  onChange={this.handleChange}/>;
  }

}
