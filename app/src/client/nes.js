import cfxnes from 'cfxnes';

cfxnes.logLevel = __LOG_LEVEL__;

const nes = cfxnes();
const {video, fullscreen, audio, devices, inputs, config} = nes;
const defaults = config.get();

export default nes;
export {video, fullscreen, audio, devices, inputs, config, defaults};
