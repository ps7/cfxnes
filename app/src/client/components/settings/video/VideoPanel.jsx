import React from 'react';
import {connect} from 'react-redux';
import {VideoRenderer, VideoPalette, VideoFilter, FullscreenType, SettingsGroup} from '../../../enums';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../../constants';
import {Field, Panel} from '../../common';

import {
  setVideoScale,
  setVideoPalette,
  setVideoFilter,
  setVideoDebug,
  setVideoRenderer,
  setFullscreenType,
  setFpsVisible,
} from '../../../actions';

const {VIDEO} = SettingsGroup;

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
    active: React.PropTypes.bool.isRequired,
    onActivate: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  handleHeaderClick = () => {
    this.props.onActivate(VIDEO);
  }

  handleVideoScaleChange = scale => {
    if (scale && scale >= MIN_VIDEO_SCALE && scale <= MAX_VIDEO_SCALE) {
      this.props.dispatch(setVideoScale(scale));
    }
  };

  handleVideoPaletteChange = palette => {
    this.props.dispatch(setVideoPalette(palette));
  };

  handleVideoFilterChange = filter => {
    this.props.dispatch(setVideoFilter(filter));
  };

  handleVideoDebugChange = debug => {
    this.props.dispatch(setVideoDebug(debug));
  };

  handleVideoRendererChange = webgl => {
    const renderer = webgl ? VideoRenderer.WEBGL : VideoRenderer.CANVAS;
    this.props.dispatch(setVideoRenderer(renderer));
  };

  handleFullscreenTypeChange = type => {
    this.props.dispatch(setFullscreenType(type));
  };

  handleFpsVisibleChange = visible => {
    this.props.dispatch(setFpsVisible(visible));
  };

  render() {
    const {
      videoRenderer, videoScale, videoPalette, videoFilter,
      videoDebug, fullscreenType, fpsVisible, active,
    } = this.props;
    return (
      <Panel type={VIDEO} icon="desktop" caption="Video" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        <Field id="video-scale" caption="Output scale" type="number"
               value={videoScale} onChange={this.handleVideoScaleChange}/>
        <Field id="video-palette" caption="Color palette" type="select" items={VideoPalette.items}
               value={videoPalette} onChange={this.handleVideoPaletteChange}/>
        <Field id="fullscreen-type" caption="Fullscreen mode" type="select" items={FullscreenType.items}
               value={fullscreenType} onChange={this.handleFullscreenTypeChange}/>
        <Field id="video-filter" caption="Filter" type="select" items={VideoFilter.items}
               value={videoFilter} onChange={this.handleVideoFilterChange}/>
        <Field id="video-debug" caption="Enable debug output" type="checkbox"
               value={videoDebug} onChange={this.handleVideoDebugChange}/>
        <Field id="video-renderer" caption="Use WebGL for rendering" type="checkbox"
               value={videoRenderer === VideoRenderer.WEBGL} onChange={this.handleVideoRendererChange}/>
        <Field id="fps-visible" caption="Show FPS" type="checkbox"
               value={fpsVisible} onChange={this.handleFpsVisibleChange}/>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {
    videoScale, videoPalette, videoFilter, videoDebug,
    videoRenderer, fullscreenType, fpsVisible,
  } = state.settings.values;
  return {
    videoScale, videoPalette, videoFilter, videoDebug,
    videoRenderer, fullscreenType, fpsVisible,
  };
};

export default connect(mapStateToProps)(VideoPanel);
