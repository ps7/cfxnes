import React from 'react';
import PropTypes from 'prop-types';

const EmulatorOutput = ({loading, refCanvas}) => (
  <div className="emulator-output">
    <canvas ref={refCanvas}/>
    {loading && <div>Loading...</div>}
  </div>
);

EmulatorOutput.propTypes = {
  loading: PropTypes.bool.isRequired,
  refCanvas: PropTypes.func.isRequired,
};

export default EmulatorOutput;
