import cfxnes from 'cfxnes';

cfxnes.logLevel = __LOG_LEVEL__;

const nes = cfxnes();
const defaults = nes.config.get();

export default nes;
export {defaults};
