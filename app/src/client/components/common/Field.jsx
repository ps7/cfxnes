import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Select from './Select';

const CHECKBOX = 'checkbox';
const TEXT = 'text';
const NUMBER = 'number';
const RANGE = 'range';
const SELECT = 'select';

export default class Field extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    type: PropTypes.oneOf([CHECKBOX, TEXT, NUMBER, RANGE, SELECT]).isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: null,
    onChange: null,
  };

  handleChange = event => {
    const {type, onChange} = this.props;
    if (onChange) {
      const {target} = event;
      const rawValue = type === CHECKBOX ? target.checked : target.value;
      const value = type === NUMBER || type === RANGE ? parseFloat(rawValue) : rawValue;
      onChange(value);
    }
  };

  renderInput() {
    const {id, caption, type, value, ...attrs} = this.props;

    if (type === SELECT) {
      return <Select id={id} value={value} {...attrs} onChange={this.handleChange}/>;
    }

    return <input id={id} type={type} {...attrs}
                  value={type !== CHECKBOX ? value : undefined}
                  checked={type === CHECKBOX && value}
                  onChange={this.handleChange}/>;
  }

  render() {
    const {id, caption, type} = this.props;
    return (
      <div className={classNames('field', id && `field-${id}`)}>
        <label htmlFor={id}>
          {type === CHECKBOX && this.renderInput()}
          {type === CHECKBOX && ' '}
          {caption}
        </label>
        {type !== CHECKBOX && this.renderInput()}
      </div>
    );
  }

}
