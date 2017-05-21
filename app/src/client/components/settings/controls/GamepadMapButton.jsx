import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class GamepadMapButton extends PureComponent {

  static propTypes = {
    index: PropTypes.number.isRequired,
    port: PropTypes.number.isRequired,
    onMap: PropTypes.func.isRequired,
  };

  handleClick = event => {
    event.preventDefault();
    const {index, port, onMap} = this.props;
    onMap(index, port);
  };

  render() {
    const {port} = this.props;
    return <a className="gamepad-map-button" href="#" onClick={this.handleClick}>Port {port}</a>;
  }

}
