import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import inputTypes, {CHECKBOX, NUMBER, RANGE} from './inputTypes';

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
    return <input type={type} {...attrs}
                  value={type !== CHECKBOX ? value : undefined}
                  checked={type === CHECKBOX && value}
                  onChange={this.handleChange}/>;
  }

}
