import React from 'react';
import {Button} from '../../common';
import {Source} from '../../../enums';
import DeviceInput from './DeviceInput';
import SourceInput from './SourceInput';

export default class ControlsInputsRow extends React.Component {

  static propTypes = {
    deviceInput: DeviceInput.propTypes.input,
    sourceInputs: React.PropTypes.arrayOf(SourceInput.propTypes.input),
    onAddRequest: React.PropTypes.func,
    onRemoveRequest: React.PropTypes.func,
  };

  static defaultProps = {
    deviceInput: {},
    sourceInputs: [],
    onAddRequest: null,
    onRemoveRequest: null,
  };

  handleAddClick = () => {
    const {deviceInput, onAddRequest} = this.props;
    onAddRequest(deviceInput);
  };

  handleRemoveClick = (sourceInput) => {
    const {onRemoveRequest} = this.props;
    onRemoveRequest(sourceInput);
  };

  render() {
    const {deviceInput, sourceInputs, onAddRequest, onRemoveRequest} = this.props;
    const handleRemoveClick = onRemoveRequest && this.handleRemoveClick;
    return (
      <div className="controls-inputs-row">
        <DeviceInput input={deviceInput}/>
        <div className="source-inputs">
          {sourceInputs.map(input => (
            <SourceInput key={Source.getInputId(input)} input={input} onRemoveClick={handleRemoveClick}/>
          ))}
          {sourceInputs.length === 0 && <i>Unset</i>}
        </div>
        {onAddRequest && (
          <div className="add-input">
            <Button icon="plus" tooltip="Bind new input" onClick={this.handleAddClick}/>
          </div>
        )}
      </div>
    );
  }

}
