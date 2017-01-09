import React from 'react';
import {connect} from 'react-redux';
import nes from '../nes';
import {startEmulator, stopEmulator} from '../actions';

class Emulator extends React.Component {

  componentDidMount() {
    nes.video.output = this.refs.canvas;
  }

  componentWillUnmount() {
    nes.video.output = null;
  }

  render() {
    const {params, running, dispatch} = this.props;
    const {romId} = params;
    return (
      <main className="emulator">
        <h1>Emulator</h1>
        <div>ROM ID: {romId || '?'}</div>
        <div><canvas ref="canvas"></canvas></div>
        <div>
          {running
            ? <button onClick={() => dispatch(stopEmulator())}>Stop</button>
            : <button onClick={() => dispatch(startEmulator())}>Start</button>
          }
        </div>
      </main>
    );
  }

}

function mapStateToProps(state) {
  return {
    running: state.running,
  };
}

export default connect(mapStateToProps)(Emulator);
