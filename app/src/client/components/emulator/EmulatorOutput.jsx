import React from 'react';
import PropTypes from 'prop-types';
import {Loader} from '../common';
import './EmulatorOutput.css';

const EmulatorOutput = ({loading, refCanvas}) => (
  <div className="emulator-output">
    <canvas ref={refCanvas}/>
    {loading && (
      <Loader className="emulator-loader" inverse>Loading...</Loader>
    )}
  </div>
);

EmulatorOutput.propTypes = {
  loading: PropTypes.bool.isRequired,
  refCanvas: PropTypes.func.isRequired,
};

export default EmulatorOutput;
