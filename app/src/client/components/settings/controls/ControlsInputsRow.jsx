import React from 'react';
import {Button} from '../../common';
import DeviceInput from './DeviceInput';
import SourceInputs from './SourceInputs';

export default class ControlsInputsRow extends React.Component {

  static propTypes = {
    deviceInput: DeviceInput.propTypes.input,
    sourceInputs: SourceInputs.propTypes.inputs,
    onChangeRequest: React.PropTypes.func,
  };

  static defaultProps = {
    deviceInput: {},
    sourceInputs: [],
    onChangeRequest: null,
  };

  handleChangeClick = () => {
    const {deviceInput, sourceInputs, onChangeRequest} = this.props;
    onChangeRequest(deviceInput, sourceInputs);
  }

  render() {
    const {deviceInput, sourceInputs, onChangeRequest} = this.props;
    return (
      <div className="controls-inputs-row">
        <DeviceInput input={deviceInput}/>
        <SourceInputs inputs={sourceInputs}/>
        {onChangeRequest && <Button caption="Change" onClick={this.handleChangeClick}/>}
      </div>
    );
  }

}
