import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Icon, Tooltip} from '../../common';

const FileTools = ({onFileOpen}) => (
  <ButtonGroup className="file-tools">
    <Button onClick={onFileOpen}>
      <Icon name="folder-open"/>
      <Tooltip position="bottom">Open ROM</Tooltip>
    </Button>
  </ButtonGroup>
);

FileTools.propTypes = {
  onFileOpen: PropTypes.func.isRequired,
};

export default FileTools;
