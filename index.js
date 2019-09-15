import express from 'express';
import helmet from 'helmet';
import path from 'path';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import log from './utils';
import api from './server/api';
import database from './server/database';

const {
  NODE_ENV = 'development',
  PORT = 8080,
} = process.env;

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.distDir = path.join(__dirname, 'dist');
app.use(express.static(path.join(app.distDir, 'client'), { index: false }));

let db = new database();
db.init(app);
db.createSample();
api(app);

app.use('/', (req, res, next) => {
  res.sendFile(path.join(app.distDir, 'client', 'index.html'));
});

app.use((err, req, res, next) => {
  if (NODE_ENV === 'development')
    res.status(500).json({ status: false, stack: err.stack });
  else
    res.status(500).json({ status: false, message: 'something went wrong' });
});

const server = http.createServer(app);
server.listen(PORT, () => {
  log.info('Server is running at port %s', PORT);
});
