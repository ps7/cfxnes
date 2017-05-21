import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Gamepad from './Gamepad';

export default class GamepadList extends PureComponent {

  static propTypes = {
    onMap: PropTypes.func.isRequired,
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
    const {onMap} = this.props;
    return (
      <div className="gamepad-list">
        {!gamepads.length && 'No gamepads seem to be connected. Plug in a gamepad and then press any of its buttons to activate it.'}
        {gamepads.map(gamepad => <Gamepad key={gamepad.index} gamepad={gamepad} onMap={onMap}/>)}
      </div>
    );
  }

}
