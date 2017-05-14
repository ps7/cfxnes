import React, {Component, PropTypes} from 'react';
import {Button, Icon, Tooltip} from '../../common';
import {Source} from '../../../enums';
import DeviceInput from './DeviceInput';
import SourceInput from './SourceInput';

export default class ControlsInputsRow extends Component {

  static propTypes = {
    deviceInput: DeviceInput.propTypes.input,
    sourceInputs: PropTypes.arrayOf(SourceInput.propTypes.input),
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
  };

  static defaultProps = {
    deviceInput: {},
    sourceInputs: [],
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
          {sourceInputs.length === 0 && <i>Unset</i>}
        </div>
        {onAdd && (
          <div className="add-input">
            <Button onClick={this.handleAdd}>
              <Icon name="plus"/>
              <Tooltip>Bind new input</Tooltip>
            </Button>
          </div>
        )}
      </div>
    );
  }

}
