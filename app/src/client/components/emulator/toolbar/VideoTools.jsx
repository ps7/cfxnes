import React from 'react';
import PropTypes from 'prop-types';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../../common';
import {Button, ButtonGroup, Icon, Tooltip} from '../../common';

const VideoTools = ({scale, onScaleDecrease, onScaleIncrease, onFullscreen}) => (
  <ButtonGroup className="video-tools">
    <Button disabled={scale <= MIN_VIDEO_SCALE} onClick={onScaleDecrease}>
      <Icon name="search-minus"/>
      <Tooltip position="bottom">Decrease scale</Tooltip>
    </Button>
    <Button disabled={scale >= MAX_VIDEO_SCALE} onClick={onScaleIncrease}>
      <Icon name="search-plus"/>
      <Tooltip position="bottom">Increase scale</Tooltip>
    </Button>
    <Button onClick={onFullscreen}>
      <Icon name="arrows-alt"/>
      <Tooltip position="bottom">Fullscreen</Tooltip>
    </Button>
  </ButtonGroup>
);

VideoTools.propTypes = {
  scale: PropTypes.number.isRequired,
  onScaleIncrease: PropTypes.func.isRequired,
  onScaleDecrease: PropTypes.func.isRequired,
  onFullscreen: PropTypes.func.isRequired,
};

export default VideoTools;
