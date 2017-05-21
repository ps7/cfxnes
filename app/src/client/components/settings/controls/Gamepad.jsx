import React from 'react';
import PropTypes from 'prop-types';
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
  gamepad: PropTypes.shape({
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    mapping: PropTypes.string,
  }).isRequired,
  onMap: PropTypes.func.isRequired,
};

export default Gamepad;
