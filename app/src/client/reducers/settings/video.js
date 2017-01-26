import {handleActions} from 'redux-actions';
import nes from '../../nes';

const {video} = nes;

const maxHorScale = screen.width / 256;
const maxVerScale = screen.height / 240;
const maxScale = ~~Math.min(maxHorScale, maxVerScale);
const minScale = 1;

const initialState = {
  scale: video.scale,
  minScale,
  maxScale,
};

export default handleActions({
  increaseVideoScale(state) {
    if (video.scale < maxScale) {
      video.scale++;
      return {...state, scale: video.scale};
    }
    return state;
  },
  decreaseVideoScale(state) {
    if (video.scale > minScale) {
      video.scale--;
      return {...state, scale: video.scale};
    }
    return state;
  },
}, initialState);
