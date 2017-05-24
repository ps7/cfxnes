import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Icon, Tooltip} from '../../common';

const SystemTools = ({running, onPower, onReset, onStart, onStop}) => (
  <ButtonGroup className="system-tools">
    <Button onClick={onPower}>
      <Icon name="power-off"/>
      <Tooltip position="bottom">Power</Tooltip>
    </Button>
    <Button onClick={onReset}>
      <Icon name="repeat"/>
      <Tooltip position="bottom">Reset</Tooltip>
    </Button>
    {running ? (
      <Button onClick={onStop}>
        <Icon name="pause"/>
        <Tooltip position="bottom">Pause</Tooltip>
      </Button>
    ) : (
      <Button onClick={onStart}>
        <Icon name="play"/>
        <Tooltip position="bottom">Run</Tooltip>
      </Button>
    )}
  </ButtonGroup>
);

SystemTools.propTypes = {
  running: PropTypes.bool.isRequired,
  onPower: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

export default SystemTools;
