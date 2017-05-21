import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const Option = ({label, value}) => (
  <option key={value} value={value}>{label}</option>
);

Option.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default class Select extends PureComponent {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape(Option.propTypes)).isRequired,
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
      <select onChange={this.handleChange} {...attrs}>
        {options.map(Option)}
      </select>
    );
  }

}
