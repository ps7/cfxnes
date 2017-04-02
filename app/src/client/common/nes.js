import cfxnes from 'cfxnes';

cfxnes.logLevel = __LOG_LEVEL__;

export const nes = cfxnes();
export const nesDefaults = nes.config.get();
