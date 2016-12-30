import path from 'path';
import express from 'express';
import * as roms from './roms';

const app = express();
const dev = app.get('env') === 'development';

if (dev) {
  app.use(require('morgan')('dev'));
}

app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/api', roms.router);

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  if (dev) {
    console.log(error.stack);
  }
  res.sendStatus(500);
});

app.listen(process.env.PORT || 5000);

roms.watch(path.join(__dirname, dev ? '../../../roms' : 'roms'));
