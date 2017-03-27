import React from 'react';
import {connect} from 'react-redux';
import {resumeEmulator, suspendEmulator, setControlsVisible} from '../../actions';
import EmulatorControls from './EmulatorControls';
import EmulatorOutput from './EmulatorOutput';

class Emulator extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      newRomId: React.PropTypes.string,
    }).isRequired,
    loading: React.PropTypes.bool.isRequired,
    controls: EmulatorControls.propTypes.controls, // eslint-disable-line react/require-default-props
    controlsVisible: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
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
