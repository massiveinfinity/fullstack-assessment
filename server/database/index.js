import db from '../../sequelize/models';
import Promise from 'bluebird';

export default class Database {
  constructor() {
    this.db = db;
  }

  init(app) {
    this.db.sequelize.sync({ force: false });
    app.db = this.db;
  }

  createSample(create = false) {
    if (!create) return;

    let sample = require('./sample.js').sample;
    Promise.mapSeries(sample, item => this.db.grocery.create(item));
  }
}
