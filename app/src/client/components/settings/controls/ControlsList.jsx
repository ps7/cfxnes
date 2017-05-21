import React from 'react';
import PropTypes from 'prop-types';
import {keysValuePropType} from '../../../common';
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
  controls: keysValuePropType(Port.values, Controls.propTypes.controls).isRequired,
  onDeviceChange: PropTypes.func,
  onInputAdd: PropTypes.func,
  onInputRemove: PropTypes.func,
};

ControlsList.defaultProps = {
  onDeviceChange: null,
  onInputAdd: null,
  onInputRemove: null,
};

export default ControlsList;
