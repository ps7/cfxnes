export const MASTER = 'master';
export const PULSE_1 = 'pulse1';
export const PULSE_2 = 'pulse2';
export const TRIANGLE = 'triangle';
export const NOISE = 'noise';
export const DMC = 'dmc';

export const values = [MASTER, PULSE_1, PULSE_2, TRIANGLE, NOISE, DMC];

const params = {
  [MASTER]: {label: 'Master volume'},
  [PULSE_1]: {label: 'Pulse channel 1'},
  [PULSE_2]: {label: 'Pulse channel 2'},
  [TRIANGLE]: {label: 'Triangle channel'},
  [NOISE]: {label: 'Noise channel'},
  [DMC]: {label: 'DMC channel'},
};

export function getLabel(channel) {
  return params[channel].label;
}
