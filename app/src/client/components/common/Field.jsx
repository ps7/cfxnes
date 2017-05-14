import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';
import Input from './Input';
import Select from './Select';
import {CHECKBOX, SELECT, values as fieldTypes} from './FieldType';
import './Field.css';

export default class Field extends PureComponent {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(fieldTypes).isRequired,
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    id: null,
    className: null,
    label: null,
    value: null,
    onChange: null,
  };

  renderInput() {
    const {label, type, ...attrs} = this.props;
    if (type === SELECT) {
      return <Select {...attrs}/>;
    }
    return <Input {...attrs} type={type}/>;
  }

  render() {
    const {id, className, type, label} = this.props;
    return (
      <div className={classNames('field', id && `field-${id}`, className)}>
        {type === CHECKBOX && this.renderInput()}
        {type === CHECKBOX && label && ' '}
        {label && <label htmlFor={id}>{label}</label>}
        {type !== CHECKBOX && label && ' '}
        {type !== CHECKBOX && this.renderInput()}
      </div>
    );
  }

}
