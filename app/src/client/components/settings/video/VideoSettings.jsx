import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../../common';
import {VideoRenderer, VideoPalette, VideoFilter, FullscreenType} from '../../../enums';
import {Field} from '../../common';
import SettingsPanel from '../SettingsPanel';
import connect from './connect';

export const VIDEO = 'video';

class VideoSettings extends PureComponent {

  static propTypes = {
    active: PropTypes.bool.isRequired,
    videoRenderer: PropTypes.oneOf(VideoRenderer.values).isRequired,
    videoScale: PropTypes.number.isRequired,
    videoPalette: PropTypes.oneOf(VideoPalette.values).isRequired,
    videoFilter: PropTypes.oneOf(VideoFilter.values).isRequired,
    videoDebug: PropTypes.bool.isRequired,
    fullscreenType: PropTypes.oneOf(FullscreenType.values).isRequired,
    fpsVisible: PropTypes.bool.isRequired,
    onActivate: PropTypes.func.isRequired,
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
      active, videoRenderer, videoScale, videoPalette, videoFilter, videoDebug,
      fullscreenType, fpsVisible, onActivate, onVideoPaletteChange, onVideoFilterChange,
      onVideoDebugChange, onFullscreenTypeChange, onFpsVisibleChange,
    } = this.props;

    return (
      <SettingsPanel id={VIDEO} title="Video" icon="desktop" active={active} onActivate={onActivate}>
        <Field id="video-scale" label="Output scale" type="number"
               value={videoScale} onChange={this.handleVideoScaleChange}/>
        <Field id="video-palette" label="Color palette" type="select" options={VideoPalette.options}
               value={videoPalette} onChange={onVideoPaletteChange}/>
        <Field id="fullscreen-type" label="Fullscreen mode" type="select" options={FullscreenType.options}
               value={fullscreenType} onChange={onFullscreenTypeChange}/>
        <Field id="video-filter" label="Filter" type="select" options={VideoFilter.options}
               value={videoFilter} onChange={onVideoFilterChange}/>
        <Field id="video-debug" label="Enable debug output" type="checkbox"
               value={videoDebug} onChange={onVideoDebugChange}/>
        <Field id="video-renderer" label="Use WebGL for rendering" type="checkbox"
               value={videoRenderer === VideoRenderer.WEBGL} onChange={this.handleVideoRendererChange}/>
        <Field id="fps-visible" label="Show FPS" type="checkbox"
               value={fpsVisible} onChange={onFpsVisibleChange}/>
      </SettingsPanel>
    );
  }

}

export default connect(VideoSettings);
