import React from 'react';
import {fromPairs} from 'lodash-es';
import {Port} from '../../../enums';
import Controls from './Controls';

const ControlsList = ({controls, onDeviceChange, onInputAdd, onInputRemove}) => {
  return (
    <div className="controls-list">
      {Port.values.map(port => {
        return <Controls key={port} port={port} controls={controls[port]}
                        onDeviceChange={onDeviceChange}
                        onInputAdd={onInputAdd}
                        onInputRemove={onInputRemove}/>;
      })}
    </div>
  );
};

ControlsList.propTypes = {
  controls: React.PropTypes.shape(
    fromPairs(Port.values.map(port => [port, Controls.propTypes.controls]))
  ).isRequired,
  onDeviceChange: React.PropTypes.func,
  onInputAdd: React.PropTypes.func,
  onInputRemove: React.PropTypes.func,
};

ControlsList.defaultProps = {
  onDeviceChange: null,
  onInputAdd: null,
  onInputRemove: null,
};

export default ControlsList;
