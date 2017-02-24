import React from 'react';
import {connect} from 'react-redux';
import {noop} from 'lodash-es';
import {VideoRenderer, VideoPalette, VideoFilter, FullscreenType} from '../../enums';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../constants';
import {Field, Panel} from '../common';

import {
  setVideoScale,
  setVideoPalette,
  setVideoFilter,
  setVideoDebug,
  setVideoRenderer,
  setFullscreenType,
  setFpsVisible,
} from '../../actions';

const VIDEO = 'video';

class VideoPanel extends React.Component {

  static id = VIDEO;

  static propTypes = {
    videoRenderer: React.PropTypes.oneOf(VideoRenderer.values).isRequired,
    videoScale: React.PropTypes.number.isRequired,
    videoPalette: React.PropTypes.oneOf(VideoPalette.values).isRequired,
    videoFilter: React.PropTypes.oneOf(VideoFilter.values).isRequired,
    videoDebug: React.PropTypes.bool.isRequired,
    fullscreenType: React.PropTypes.oneOf(FullscreenType.values).isRequired,
    fpsVisible: React.PropTypes.bool.isRequired,
    active: React.PropTypes.bool,
    onActivate: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
    onActivate: noop,
  }

  handleHeaderClick = () => {
    this.props.onActivate(VIDEO);
  }

  handleVideoScaleChange = e => {
    const scale = parseInt(e.target.value);
    if (scale && scale >= MIN_VIDEO_SCALE && scale <= MAX_VIDEO_SCALE) {
      this.props.dispatch(setVideoScale(parseFloat(e.target.value)));
    }
  };

  handleVideoPaletteChange = e => {
    this.props.dispatch(setVideoPalette(e.target.value));
  };

  handleVideoFilterChange = e => {
    this.props.dispatch(setVideoFilter(e.target.value));
  };

  handleVideoDebugChange = e => {
    this.props.dispatch(setVideoDebug(e.target.checked));
  };

  handleVideoRendererChange = e => {
    const renderer = e.target.checked ? VideoRenderer.WEBGL : VideoRenderer.CANVAS;
    this.props.dispatch(setVideoRenderer(renderer));
  };

  handleFullscreenTypeChange = e => {
    this.props.dispatch(setFullscreenType(e.target.value));
  };

  handleFpsVisibleChange = e => {
    this.props.dispatch(setFpsVisible(e.target.checked));
  };

  render() {
    const {
      videoRenderer, videoScale, videoPalette, videoFilter,
      videoDebug, fullscreenType, fpsVisible, active,
    } = this.props;
    return (
      <Panel type={VIDEO} icon="desktop" caption="Video" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        <Field id="video-scale" caption="Output scale" type="number" value={videoScale} onChange={this.handleVideoScaleChange}/>
        <Field id="video-palette" caption="Color palette" type="select" items={VideoPalette.items} value={videoPalette} onChange={this.handleVideoPaletteChange}/>
        <Field id="fullscreen-type" caption="Fullscreen mode" type="select" items={FullscreenType.items} value={fullscreenType} onChange={this.handleFullscreenTypeChange}/>
        <Field id="video-filter" caption="Filter" type="select" items={VideoFilter.items} value={videoFilter} onChange={this.handleVideoFilterChange}/>
        <Field id="video-debug" caption="Enable debug output" type="checkbox" checked={videoDebug} onChange={this.handleVideoDebugChange}/>
        <Field id="video-renderer" caption="Use WebGL for rendering" type="checkbox" checked={videoRenderer === VideoRenderer.WEBGL} onChange={this.handleVideoRendererChange}/>
        <Field id="fps-visible" caption="Show FPS" type="checkbox" checked={fpsVisible} onChange={this.handleFpsVisibleChange}/>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {
    videoScale, videoPalette, videoFilter, videoDebug,
    videoRenderer, fullscreenType, fpsVisible,
  } = state.settings;
  return {
    videoScale, videoPalette, videoFilter, videoDebug,
    videoRenderer, fullscreenType, fpsVisible,
  };
};

export default connect(mapStateToProps)(VideoPanel);
