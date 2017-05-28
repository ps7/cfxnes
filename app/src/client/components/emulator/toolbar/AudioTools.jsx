import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {isAncestorOrSelf} from '../../../common';
import {Button, ButtonGroup, Icon, Input, Popup, Tooltip} from '../../common';
import './AudioTools.css';

export default class AudioTools extends PureComponent {

  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onEnabledChange: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  state = {
    popupVisible: false,
  };

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

  getVolumeIconName() {
    const {value} = this.props;
    if (value > 0.5) return 'volume-up';
    if (value > 0) return 'volume-down';
    return 'volume-off';
  }

  renderVolumeButton() {
    const {enabled} = this.props;
    const {popupVisible} = this.state;
    return (
      <Button active={popupVisible} refButton={this.setButton} onClick={this.handlePopupToggle}>
        <Icon name={this.getVolumeIconName()} fixedWidth/>
        {!enabled && <Icon name="ban" size="2x" className="audio-volume-disable-icon"/>}
        {!popupVisible && <Tooltip position="bottom">Volume</Tooltip>}
      </Button>
    );
  }

  renderVolumePopup() {
    const {enabled, value, onEnabledChange, onValueChange} = this.props;
    return (
      <Popup className="audio-volume-popup" onBlur={this.handlePopupClose}>
        <Input type="checkbox" value={enabled} onChange={onEnabledChange}/>
        <Input type="range" min="0" max="1" step="0.01" disabled={!enabled}
                value={value} onChange={onValueChange}/>
      </Popup>
    );
  }

  render() {
    const {popupVisible} = this.state;
    return (
      <ButtonGroup className="audio-tools">
        {this.renderVolumeButton()}
        {popupVisible && this.renderVolumePopup()}
      </ButtonGroup>
    );
  }

}
