import React from 'react';
import Gamepad from './Gamepad';

export default class GamepadList extends React.Component {

  static propTypes = {
    onMapRequest: React.PropTypes.func.isRequired,
  };

  state = {gamepads: []};

  componentDidMount() {
    if (navigator.getGamepads) {
      this.timer = setInterval(this.updateGamepads, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateGamepads = () => {
    const gamepads = Array.from(navigator.getGamepads())
                          .filter(gamepad => gamepad);
    this.setState({gamepads});
  }

  render() {
    const {gamepads} = this.state;
    const {onMapRequest} = this.props;
    return (
      <div className="gamepad-list">
        {!gamepads.length && 'No gamepads seem to be connected. Plug in a gamepad and then press any of its buttons to activate it.'}
        {gamepads.map(gamepad => <Gamepad key={gamepad.index} gamepad={gamepad} onMapRequest={onMapRequest}/>)}
      </div>
    );
  }

}
