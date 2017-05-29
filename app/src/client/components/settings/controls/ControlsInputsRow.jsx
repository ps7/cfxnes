import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Tooltip} from '../../common';
import {Source} from '../../../enums';
import DeviceInput, {deviceInputPropType} from './DeviceInput';
import SourceInput, {sourceInputPropType} from './SourceInput';
import './ControlsInputsRow.css';

export default class ControlsInputsRow extends PureComponent {

  static propTypes = {
    deviceInput: deviceInputPropType.isRequired,
    sourceInputs: PropTypes.arrayOf(sourceInputPropType).isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
  };

  static defaultProps = {
    onAdd: null,
    onRemove: null,
  };

  handleAdd = () => {
    const {deviceInput, onAdd} = this.props;
    onAdd(deviceInput);
  };

  handleRemove = sourceInput => {
    const {onRemove} = this.props;
    onRemove(sourceInput);
  };

  render() {
    const {deviceInput, sourceInputs, onAdd, onRemove} = this.props;
    const handleRemove = onRemove && this.handleRemove;
    return (
      <div className="controls-inputs-row">
        <DeviceInput input={deviceInput}/>
        <div className="source-inputs">
          {sourceInputs.map(input => (
            <SourceInput key={Source.getInputId(input)} input={input} onRemove={handleRemove}/>
          ))}
          {sourceInputs.length === 0 && <i className="source-input-unset">Unset</i>}
        </div>
        {onAdd && (
          <div className="add-input">
            <Button onClick={this.handleAdd}>
              <Icon name="plus"/>
              <Tooltip position="right">Bind new input</Tooltip>
            </Button>
          </div>
        )}
      </div>
    );
  }

}
