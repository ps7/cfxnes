import React from 'react';

const EmulatorOutput = ({loading, onCanvasChange}) => (
  <div className="emulator-output">
    <canvas ref={onCanvasChange}/>
    {loading && <div>Loading...</div>}
  </div>
);

EmulatorOutput.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  onCanvasChange: React.PropTypes.func.isRequired,
};

export default EmulatorOutput;
