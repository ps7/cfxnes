export const MASTER = 'master';
export const PULSE_1 = 'pulse1';
export const PULSE_2 = 'pulse2';
export const TRIANGLE = 'triangle';
export const NOISE = 'noise';
export const DMC = 'dmc';

export const values = [MASTER, PULSE_1, PULSE_2, TRIANGLE, NOISE, DMC];

const params = {
  [MASTER]: {caption: 'Master volume'},
  [PULSE_1]: {caption: 'Pulse channel 1'},
  [PULSE_2]: {caption: 'Pulse channel 2'},
  [TRIANGLE]: {caption: 'Triangle channel'},
  [NOISE]: {caption: 'Noise channel'},
  [DMC]: {caption: 'DMC channel'},
};

export function getCaption(channel) {
  return params[channel].caption;
}
