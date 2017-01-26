import {handleActions} from 'redux-actions';
import {video, config, defaults} from '../nes';

const maxHorScale = screen.width / 256;
const maxVerScale = screen.height / 240;
const maxScale = ~~Math.min(maxHorScale, maxVerScale);
const minScale = 1;

const createState = () => ({
  scale: video.scale,
  minScale,
  maxScale,
});

export default handleActions({
  increaseVideoScale(state) {
    if (video.scale < maxScale) {
      video.scale++;
      return createState();
    }
    return state;
  },

  decreaseVideoScale(state) {
    if (video.scale > minScale) {
      video.scale--;
      return createState();
    }
    return state;
  },

  setVideoScale(state, action) {
    video.scale = action.payload;
    return createState();
  },

  resetSettings() {
    config.set({video: defaults.video});
    return createState();
  },
}, createState());
