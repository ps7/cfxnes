import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {optionPropTypes, optionsPropType} from './propTypes';

const Option = ({label, value}) => (
  <option key={value} value={value}>{label}</option>
);

Option.propTypes = optionPropTypes;

export default class Select extends PureComponent {

  static propTypes = {
    options: optionsPropType.isRequired,
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
      onChange(event.target.value);
    }
  };

  render() {
    const {options, value, onChange, ...attrs} = this.props;
    return (
      <select defaultValue={value} onChange={this.handleChange} {...attrs}>
        {options.map(Option)}
      </select>
    );
  }

}
