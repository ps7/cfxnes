import React from 'react';
import {connect} from 'react-redux';
import {resumeEmulator, suspendEmulator} from '../actions';

class Emulator extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      newRomId: React.PropTypes.string,
    }).isRequired,
    loading: React.PropTypes.bool.isRequired,
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

  render() {
    return (
      <main className="emulator">
        <canvas ref={this.setCanvas}/>
      </main>
    );
  }

}

const mapStateToProps = state => ({
  loading: state.emulator.loading,
});

export default connect(mapStateToProps)(Emulator);
