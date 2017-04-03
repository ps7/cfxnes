import {fetchJson, fetchArrayBuffer} from './common';

const BASE_URL = '/api/roms';

export function getAll() {
  return fetchJson(BASE_URL);
}

export function getOne(romId) {
  return fetchJson(`${BASE_URL}/${romId}`);
}

export function getData(rom) {
  return fetchArrayBuffer(rom.file);
}
