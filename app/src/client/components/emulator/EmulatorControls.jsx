import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Icon, Message} from '../common';
import {ControlsList} from '../settings/controls';

const EmulatorControls = ({controls, onClose}) => (
  <Message className="emulator-controls" onClose={onClose}>
    <h2>Controls <small>
      (<NavLink to="/settings/controls"><Icon name="wrench"/> Configure</NavLink>)
    </small></h2>
    <ControlsList controls={controls}/>
  </Message>
);

EmulatorControls.propTypes = {
  controls: ControlsList.propTypes.controls, // eslint-disable-line react/require-default-props
  onClose: PropTypes.func.isRequired,
};

export default EmulatorControls;
