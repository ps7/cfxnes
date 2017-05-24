import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {isAncestorOrSelf} from '../../common';
import {Button, ButtonGroup, Icon, IconStack, Input, Popup, Tooltip} from '../common';
import './VolumeControl.css';

export default class VolumeControl extends PureComponent {

  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onEnabledChange: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  state = {popupVisible: false};

  setButton = button => {
    this.button = button;
  }

  handlePopupToggle = () => {
    this.setState({popupVisible: !this.state.popupVisible});
  };

  handlePopupClose = () => {
    if (!isAncestorOrSelf(event.target, this.button)) {
      this.setState({popupVisible: false});
    }
  };

  render() {
    const {enabled, value, onEnabledChange, onValueChange} = this.props;
    const {popupVisible} = this.state;

    return (
      <ButtonGroup className="volume-control">
        <Button className="volume-control-button" active={popupVisible}
                refButton={this.setButton} onClick={this.handlePopupToggle}>
          <IconStack className="volume-control-icon">
            {value > 0.5 && <Icon name="volume-up" stack="1x"/>}
            {value > 0 && value <= 0.5 && <Icon name="volume-down" stack="1x"/>}
            {value === 0 && <Icon name="volume-off" stack="1x"/>}
            {!enabled && <Icon name="ban" stack="1x"/>}
          </IconStack>
          <Tooltip position="bottom">Volume</Tooltip>
        </Button>
        {popupVisible && (
          <Popup className="volume-control-popup" onBlur={this.handlePopupClose}>
            <Input type="checkbox" value={enabled} onChange={onEnabledChange}/>
            <Input type="range" min="0" max="1" step="0.01" disabled={!enabled}
                   value={value} onChange={onValueChange}/>
          </Popup>
        )}
      </ButtonGroup>
    );
  }

}
