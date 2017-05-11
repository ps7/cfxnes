import React, {Component, PropTypes} from 'react';

const Option = ({caption, value}) => (
  <option key={value} value={value}>{caption}</option>
);

Option.propTypes = {
  value: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default class Select extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(Option.propTypes)).isRequired,
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
    const {items, ...attrs} = this.props;
    return (
      <select {...attrs} onChange={this.handleChange}>
        {items.map(Option)}
      </select>
    );
  }

}
