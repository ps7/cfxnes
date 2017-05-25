import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Icon, Tooltip} from '../../common';
import './FileTools.css';

export default class FileTools extends PureComponent {

  static propTypes = {
    onFileOpen: PropTypes.func.isRequired,
  };

  setFileInput = input => {
    this.fileInput = input;
  }

  handleButtonClick = () => {
    this.fileInput.click();
  }

  handleFileChange = event => {
    event.target.blur();
    event.preventDefault();
    event.stopPropagation();

    const file = event.target.files[0];
    if (file) {
      this.props.onFileOpen(file);
    }
  }

  render() {
    return (
      <ButtonGroup className="file-tools">
        <Button onClick={this.handleButtonClick}>
          <Icon name="folder-open"/>
          <Tooltip position="bottom">Open ROM</Tooltip>
        </Button>
        <input className="file-tools-input" type="file"
               ref={this.setFileInput} onChange={this.handleFileChange}/>
      </ButtonGroup>
    );
  }

}
