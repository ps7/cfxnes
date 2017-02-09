import React from 'react';
import {connect} from 'react-redux';
import {makeEnumPropType} from '../../utils';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../constants';
import {Field, Panel} from '../common';

import {
  setVideoScale, setVideoPalette,
  setVideoFilter, setVideoDebug,
  setVideoRenderer, setFullscreenType,
  setFpsVisible,
} from '../../actions';

const CANVAS_RENDERER = 'canvas';
const WEBGL_RENDERER = 'webgl';

const videoPalettes = [
  {id: 'asq-real-a', caption: 'ASQ (reality A)'},
  {id: 'asq-real-b', caption: 'ASQ (reality B)'},
  {id: 'bmf-fin-r2', caption: 'BMF (final revision 2)'},
  {id: 'bmf-fin-r3', caption: 'BMF (final revision 3)'},
  {id: 'fceu-13', caption: 'FCEU .13'},
  {id: 'fceu-15', caption: 'FCEU .15'},
  {id: 'fceux', caption: 'FCEUX'},
  {id: 'nestopia-rgb', caption: 'Nestopia (RGB)'},
  {id: 'nestopia-yuv', caption: 'Nestopia (YUV)'},
];

const videoFilters = [
  {id: 'nearest', caption: 'Pixelated'},
  {id: 'linear', caption: 'Linear'},
];

const fullscreenTypes = [
  {id: 'maximized', caption: 'Upscale to maximum resolution'},
  {id: 'normalized', caption: 'Upscale without visual artifacts'},
  {id: 'stretched', caption: 'Stretch to fill the whole sceen'},
];

class VideoPanel extends React.Component {

  static id = 'video';

  static propTypes = {
    videoRenderer: React.PropTypes.oneOf([CANVAS_RENDERER, WEBGL_RENDERER]).isRequired,
    videoScale: React.PropTypes.number.isRequired,
    videoPalette: makeEnumPropType(videoPalettes).isRequired,
    videoFilter: makeEnumPropType(videoFilters).isRequired,
    videoDebug: React.PropTypes.bool.isRequired,
    fullscreenType: makeEnumPropType(fullscreenTypes).isRequired,
    fpsVisible: React.PropTypes.bool.isRequired,
    collapsed: React.PropTypes.bool,
    onHeaderClick: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    collapsed: false,
    onHeaderClick: false,
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
    const renderer = e.target.checked ? WEBGL_RENDERER : CANVAS_RENDERER;
    this.props.dispatch(setVideoRenderer(renderer));
  };

  handleFullscreenTypeChange = e => {
    this.props.dispatch(setFullscreenType(e.target.value));
  };

  handleFpsVisibleChange = e => {
    this.props.dispatch(setFpsVisible(e.target.value));
  };

  render() {
    const {
      videoRenderer, videoScale, videoPalette, videoFilter, videoDebug,
      fullscreenType, fpsVisible, collapsed, onHeaderClick,
    } = this.props;
    return (
      <Panel type={VideoPanel.id} icon="desktop" caption="Video" collapsed={collapsed} onHeaderClick={onHeaderClick}>
        <Field id="video-scale" caption="Output scale" type="number" value={videoScale} onChange={this.handleVideoScaleChange}/>
        <Field id="video-palette" caption="Color palette" type="select" items={videoPalettes} value={videoPalette} onChange={this.handleVideoPaletteChange}/>
        <Field id="fullscreen-type" caption="Fullscreen mode" type="select" items={fullscreenTypes} value={fullscreenType} onChange={this.handleFullscreenTypeChange}/>
        <Field id="video-filter" caption="Filter" type="select" items={videoFilters} value={videoFilter} onChange={this.handleVideoFilterChange}/>
        <Field id="video-debug" caption="Enable debug output" type="checkbox" checked={videoDebug} onChange={this.handleVideoDebugChange}/>
        <Field id="video-renderer" caption="Use WebGL for rendering" type="checkbox" checked={videoRenderer === WEBGL_RENDERER} onChange={this.handleVideoRendererChange}/>
        <Field id="fps-visible" caption="Show FPS" type="checkbox" value={fpsVisible} onChange={this.handleFpsVisibleChange}/>
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
