import React from 'react';
import {connect} from 'react-redux';
import nes from '../nes';

class Emulator extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      romId: React.PropTypes.string,
    }).isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    nes.video.output = this.canvas;
  }

  componentWillUnmount() {
    this.handleStop();
    nes.video.output = null;
  }

  setCanvas = canvas => {
    this.canvas = canvas;
  }

  render() {
    const {params, running} = this.props;
    const {romId} = params;
    return (
      <main className="emulator">
        <canvas ref={this.setCanvas}/>
      </main>
    );
  }

}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Emulator);
