import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {resumeEmulator, suspendEmulator, setControlsVisible} from '../../actions';
import EmulatorControls from './EmulatorControls';
import EmulatorOutput from './EmulatorOutput';

class Emulator extends Component {

  static propTypes = {
    params: PropTypes.shape({
      newRomId: PropTypes.string,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    controls: EmulatorControls.propTypes.controls, // eslint-disable-line react/require-default-props
    controlsVisible: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {canvas} = this;
    const {newRomId} = this.props.params;
    this.props.dispatch(resumeEmulator({canvas, newRomId}));
  }

  componentWillUnmount() {
    this.props.dispatch(suspendEmulator());
  }

  handleCanvasChange = canvas => {
    this.canvas = canvas;
  }

  handleControlsClose = () => {
    this.props.dispatch(setControlsVisible(false));
  };

  render() {
    const {loading, controlsVisible, controls} = this.props;
    return (
      <main className="emulator">
        {controlsVisible && <EmulatorControls controls={controls} onClose={this.handleControlsClose}/>}
        <EmulatorOutput loading={loading} onCanvasChange={this.handleCanvasChange}/>
      </main>
    );
  }

}

const mapStateToProps = state => {
  const {loading} = state.emulator;
  const {controlsVisible, controls} = state.settings.values;
  return {loading, controlsVisible, controls};
};

export default connect(mapStateToProps)(Emulator);
