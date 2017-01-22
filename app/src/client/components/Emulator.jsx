import React from 'react';
import {connect} from 'react-redux';
import nes from '../nes';
import {startEmulator, stopEmulator} from '../actions';

class Emulator extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      romId: React.PropTypes.string,
    }).isRequired,
    running: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    nes.video.output = this.canvas;
  }

  componentWillUnmount() {
    nes.stop();
    nes.video.output = null;
  }

  setCanvas = canvas => {
    this.canvas = canvas;
  }

  handleStart = () => {
    this.props.dispatch(startEmulator());
  };

  handleStop = () => {
    this.props.dispatch(stopEmulator());
  };

  render() {
    const {params, running} = this.props;
    const {romId} = params;
    return (
      <main className="emulator">
        <h1>Emulator</h1>
        <div>ROM ID: {romId || '?'}</div>
        <div><canvas ref={this.setCanvas}/></div>
        <div>
          {running
            ? <button onClick={this.handleStop}>Stop</button>
            : <button onClick={this.handleStart}>Start</button>
          }
        </div>
      </main>
    );
  }

}

const mapStateToProps = state => ({
  running: state.running,
});

export default connect(mapStateToProps)(Emulator);
