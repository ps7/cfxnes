import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';
import Input from './Input';
import Select from './Select';
import {CHECKBOX, SELECT, values as fieldTypes} from './FieldType';
import './Field.css';

export default class Field extends PureComponent {

  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf(fieldTypes).isRequired,
    caption: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    id: null,
    caption: null,
    value: null,
    onChange: null,
  };

  renderInput() {
    const {caption, type, ...attrs} = this.props;
    if (type === SELECT) {
      return <Select {...attrs}/>;
    }
    return <Input {...attrs} type={type}/>;
  }

  render() {
    const {id, caption, type} = this.props;
    return (
      <div className={classNames('field', id && `field-${id}`)}>
        {type === CHECKBOX && this.renderInput()}
        {type === CHECKBOX && caption && ' '}
        {caption && <label htmlFor={id}>{caption}</label>}
        {type !== CHECKBOX && caption && ' '}
        {type !== CHECKBOX && this.renderInput()}
      </div>
    );
  }

}
