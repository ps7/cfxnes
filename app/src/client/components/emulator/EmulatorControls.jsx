import React from 'react';
import {Link} from 'react-router';
import {Icon, Message} from '../common';
import {ControlsList} from '../settings/controls';

const EmulatorControls = ({controls, onClose}) => (
  <Message className="emulator-controls" onClose={onClose}>
    <h2>Controls <small>
      (<Link to="/settings/controls"><Icon name="wrench"/> Configure</Link>)
    </small></h2>
    <ControlsList controls={controls}/>
  </Message>
);

EmulatorControls.propTypes = {
  controls: ControlsList.propTypes.controls, // eslint-disable-line react/require-default-props
  onClose: React.PropTypes.func.isRequired,
};

export default EmulatorControls;
