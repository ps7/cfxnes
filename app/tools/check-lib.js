const lib = require('./lib');

const {argv, stderr} = process;
const includeDebug = argv.indexOf('--include-debug') > 0;
const files = lib.getFiles({includeDebug});

if (files.main == null) {
  stderr.write('********************************************************************************\n\n');
  stderr.write('Unable to find any of these files:\n ' + files.all.join('\n '));
  stderr.write('\n\n');
  stderr.write('You need to build the cfxnes library first:\n');
  stderr.write(' cd ../lib\n');
  if (includeDebug) {
    stderr.write(' npm run build:debug # Debug build\n');
    stderr.write(' npm run build       # Production build\n\n');
  } else {
    stderr.write(' npm run build\n\n');
  }
  stderr.write('********************************************************************************\n');
  process.exit(1);
}
