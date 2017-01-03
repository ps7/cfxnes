import cfxnes from 'cfxnes';

cfxnes.logLevel = 'info';

const nes = cfxnes();
const defaultConfig = nes.config.get();

export {defaultConfig};
export default nes;
