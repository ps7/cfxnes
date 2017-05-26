import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {LinkButton} from '../../common';
import './GamepadMapButton.css';

export default class GamepadMapButton extends PureComponent {

  static propTypes = {
    index: PropTypes.number.isRequired,
    port: PropTypes.number.isRequired,
    onMap: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const {index, port, onMap} = this.props;
    onMap(index, port);
  };

  render() {
    const {port} = this.props;
    return (
      <LinkButton className="gamepad-map-button" onClick={this.handleClick}>
        Port {port}
      </LinkButton>
    );
  }

}
