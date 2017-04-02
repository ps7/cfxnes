import React, {PropTypes} from 'react';

const EmulatorOutput = ({loading, onCanvasChange}) => (
  <div className="emulator-output">
    <canvas ref={onCanvasChange}/>
    {loading && <div>Loading...</div>}
  </div>
);

EmulatorOutput.propTypes = {
  loading: PropTypes.bool.isRequired,
  onCanvasChange: PropTypes.func.isRequired,
};

export default EmulatorOutput;
