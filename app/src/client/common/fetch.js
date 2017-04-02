import log from './log';

export function fetchJson(url) {
  return fetchResource(url).then(response => response.json());
}

export function fetchArrayBuffer(url) {
  return fetchResource(url).then(response => response.arrayBuffer());
}

function fetchResource(url) {
  return fetch(url)
    .catch(error => {
      log.error(error);
      throw new Error('Failed to connect to the server.');
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to download data (${response.status} ${response.statusText})`);
      }
      return response;
    });
}
