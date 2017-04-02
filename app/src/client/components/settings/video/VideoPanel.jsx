import React, {Component, PropTypes} from 'react';
import {VideoRenderer, VideoPalette, VideoFilter, FullscreenType} from '../../../enums';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../../common';
import {Field} from '../../common';
import SettingsPanel from '../SettingsPanel';

const ID = 'video';

export default class VideoPanel extends Component {

  static id = ID;

  static propTypes = {
    videoRenderer: PropTypes.oneOf(VideoRenderer.values).isRequired,
    videoScale: PropTypes.number.isRequired,
    videoPalette: PropTypes.oneOf(VideoPalette.values).isRequired,
    videoFilter: PropTypes.oneOf(VideoFilter.values).isRequired,
    videoDebug: PropTypes.bool.isRequired,
    fullscreenType: PropTypes.oneOf(FullscreenType.values).isRequired,
    fpsVisible: PropTypes.bool.isRequired,
    onVideoRendererChange: PropTypes.func.isRequired,
    onVideoScaleChange: PropTypes.func.isRequired,
    onVideoPaletteChange: PropTypes.func.isRequired,
    onVideoFilterChange: PropTypes.func.isRequired,
    onVideoDebugChange: PropTypes.func.isRequired,
    onFullscreenTypeChange: PropTypes.func.isRequired,
    onFpsVisibleChange: PropTypes.func.isRequired,
  };

  handleVideoRendererChange = webgl => {
    this.props.onVideoRendererChange(webgl ? VideoRenderer.WEBGL : VideoRenderer.CANVAS);
  };

  handleVideoScaleChange = scale => {
    if (scale && scale >= MIN_VIDEO_SCALE && scale <= MAX_VIDEO_SCALE) {
      this.props.onVideoScaleChange(scale);
    }
  };

  render() {
    const {
      videoRenderer,
      videoScale,
      videoPalette,
      videoFilter,
      videoDebug,
      fullscreenType,
      fpsVisible,
      onVideoPaletteChange,
      onVideoFilterChange,
      onVideoDebugChange,
      onFullscreenTypeChange,
      onFpsVisibleChange,
      ...panelProps
    } = this.props;

    return (
      <SettingsPanel id={ID} icon="desktop" caption="Video" {...panelProps}>
        <Field id="video-scale" caption="Output scale" type="number"
               value={videoScale} onChange={this.handleVideoScaleChange}/>
        <Field id="video-palette" caption="Color palette" type="select" items={VideoPalette.items}
               value={videoPalette} onChange={onVideoPaletteChange}/>
        <Field id="fullscreen-type" caption="Fullscreen mode" type="select" items={FullscreenType.items}
               value={fullscreenType} onChange={onFullscreenTypeChange}/>
        <Field id="video-filter" caption="Filter" type="select" items={VideoFilter.items}
               value={videoFilter} onChange={onVideoFilterChange}/>
        <Field id="video-debug" caption="Enable debug output" type="checkbox"
               value={videoDebug} onChange={onVideoDebugChange}/>
        <Field id="video-renderer" caption="Use WebGL for rendering" type="checkbox"
               value={videoRenderer === VideoRenderer.WEBGL} onChange={this.handleVideoRendererChange}/>
        <Field id="fps-visible" caption="Show FPS" type="checkbox"
               value={fpsVisible} onChange={onFpsVisibleChange}/>
      </SettingsPanel>
    );
  }

}
