import React from 'react';
import PropTypes from 'prop-types';
import {Field} from '../../common';
import {Region} from '../../../enums';
import SettingsPanel from '../SettingsPanel';

const ID = 'system';

const SystemPanel = ({region, speed, onRegionChange, onSpeedChange, ...panelProps}) => (
  <SettingsPanel id={ID} title="System" icon="server" {...panelProps}>
    <Field id="region" label="Region" type="select" options={Region.options}
           value={region} onChange={onRegionChange}/>
    <Field id="speed" label="Emulation speed" type="range" min="0.25" max="2" step="0.25"
           value={speed} onChange={onSpeedChange}/>
  </SettingsPanel>
);

SystemPanel.id = ID;

SystemPanel.propTypes = {
  region: PropTypes.oneOf(Region.values).isRequired,
  speed: PropTypes.number.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
};

export default SystemPanel;
