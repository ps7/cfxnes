import cfxnes from 'cfxnes';

cfxnes.logLevel = __LOG_LEVEL__;

const nes = cfxnes();
const defaultConfig = nes.config.get();

export {defaultConfig};
export default nes;
