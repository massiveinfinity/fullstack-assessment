import bunyan from 'bunyan';
import path from 'path';
import fs from 'fs';

function stream() {
  let logDir = path.join(__dirname, 'logs');
  let options = [];

  if (!fs.existsSync(logDir))
    fs.mkdirSync(logDir);

  options.push({ level: 'error', path: path.join(logDir, 'errors.log') });
  options.push({ level: 'info', stream: process.stdout });
}

module.exports = global.log = bunyan.createLogger({
  name: 'grocery-app',
  streams: stream(),
});
