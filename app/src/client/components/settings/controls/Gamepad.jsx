import React from 'react';
import {Icon} from '../../common';
import {Port} from '../../../enums';
import GamepadMapButton from './GamepadMapButton';

const STANDARD = 'standard';

const Gamepad = ({gamepad: {index, id, mapping}, onMapRequest}) => (
  <div className="gamepad">
    <Icon name="gamepad"/> {index}: {id} &nbsp;
    {mapping === STANDARD && (
      <span>
        <Icon name="wrench"/> bind it to &nbsp;
        {Port.values.map(port => (
          <GamepadMapButton key={port} index={index} port={port} onMapRequest={onMapRequest}/>
        ))}
      </span>
    )}
    {mapping !== STANDARD && (
      <span title="Auto-mapping functionality is not available because your browser could not recognise layout of the gamepad.">
        <Icon name="question"/> unrecognised layout
      </span>
    )}
  </div>
);

Gamepad.propTypes = {
  gamepad: React.PropTypes.shape({
    index: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    mapping: React.PropTypes.string,
  }).isRequired,
  onMapRequest: React.PropTypes.func.isRequired,
};

export default Gamepad;
