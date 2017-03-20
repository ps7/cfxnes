import React from 'react';

export default class GamepadMapButton extends React.Component {

  static propTypes = {
    index: React.PropTypes.number.isRequired,
    port: React.PropTypes.number.isRequired,
    onMapRequest: React.PropTypes.func.isRequired,
  };

  handleClick = event => {
    event.preventDefault();
    const {index, port, onMapRequest} = this.props;
    onMapRequest(index, port);
  };

  render() {
    const {port} = this.props;
    return <a className="gamepad-map-button" href="#" onClick={this.handleClick}>Port {port}</a>;
  }

}
