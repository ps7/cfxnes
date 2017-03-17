import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Icon, Message} from '../common';
import {Controls} from '../settings/controls';
import {resumeEmulator, suspendEmulator, setControlsVisible} from '../../actions';
import {Port} from '../../enums';

class Emulator extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      newRomId: React.PropTypes.string,
    }).isRequired,
    loading: React.PropTypes.bool.isRequired,
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

  setCanvas = canvas => {
    this.canvas = canvas;
  }

  handleCloseControls = () => {
    this.props.dispatch(setControlsVisible(false));
  };

  renderControls() {
    const {controls} = this.props;
    return (
      <Message className="emulator-controls" onClose={this.handleCloseControls}>
        <h2>Controls <small>
          (<Link to="/settings/controls"><Icon name="wrench"/> Configure</Link>)
        </small></h2>
        {Port.values.map(port => <Controls port={port} controls={controls[port]}/>)}
      </Message>
    );
  }

  render() {
    const {loading, controlsVisible} = this.props;

    return (
      <main className="emulator">
        {controlsVisible && this.renderControls()}
        <div className="emulator-output">
          <canvas ref={this.setCanvas}/>
          {loading && <div>Loading...</div>}
        </div>
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
