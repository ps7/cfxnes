const path = require('path');
const fs = require('fs');

exports.getFiles = function({includeDebug} = {}) {
  const names = [];
  if (includeDebug) {
    names.push('cfxnes.debug.js');
  }
  names.push('cfxnes.js');
  const all = names.map(name => path.resolve(__dirname, '../../lib/dist', name));
  const main = all.filter(file => fs.existsSync(file))[0];
  return {all, main};
};
