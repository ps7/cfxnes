import React from 'react';
import {Icon} from '../../common';
import {Port} from '../../../enums';
import GamepadMapButton from './GamepadMapButton';

const Gamepad = ({gamepad: {index, id, mapping}, onMap}) => (
  <div className="gamepad">
    <Icon name="gamepad"/> {index}: {id}{' '}
    {mapping === 'standard' ? (
      <span>
        <Icon name="wrench"/> bind it to{' '}
        {Port.values.map(port => (
          <GamepadMapButton key={port} index={index} port={port} onMap={onMap}/>
        ))}
      </span>
    ) : (
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
  onMap: React.PropTypes.func.isRequired,
};

export default Gamepad;
