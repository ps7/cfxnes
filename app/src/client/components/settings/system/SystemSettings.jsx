import React from 'react';
import PropTypes from 'prop-types';
import {formatMultiplier} from '../../../common';
import {Field} from '../../common';
import {Region} from '../../../enums';
import SettingsPanel from '../SettingsPanel';
import connect from './connect';

export const SYSTEM = 'system';

const speedLabels = [0.25, 1, 2].map(formatMultiplier);

const SystemSettings = ({active, region, speed, onActivate, onRegionChange, onSpeedChange}) => (
  <SettingsPanel id={SYSTEM} title="System" icon="server" active={active} onActivate={onActivate}>
    <Field id="region" label="Region" type="select" options={Region.options}
           value={region} onChange={onRegionChange}/>
    <Field id="speed" label="Emulation speed" type="slider" min={0.25} max={2} step={0.25}
           format={formatMultiplier} labels={speedLabels} value={speed} onChange={onSpeedChange}/>
  </SettingsPanel>
);

SystemSettings.propTypes = {
  active: PropTypes.bool.isRequired,
  region: PropTypes.oneOf(Region.values).isRequired,
  speed: PropTypes.number.isRequired,
  onActivate: PropTypes.func.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
};

export default connect(SystemSettings);
