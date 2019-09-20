import express from 'express';
import path from 'path';
import Sequelize from 'sequelize';

module.exports = app => {
  const router = express.Router();
  const Op = Sequelize.Op;

  router.get('/findAll', (req, res) => {
    app.db.grocery.findAll({ limit: 20, order: [['productName', 'ASC']] })
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  router.post('/search', (req, res) => {
    const { brand, productName } = req.body;
    app.db.grocery.findAll({
      where: {
        brand: { [Op.like]: '%' + brand + '%' },
        productName: { [Op.like]: '%' + productName + '%' },
      },
    })
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  router.put('/update', (req, res) => {
    const { id, brand, productName } = req.body;
    app.db.grocery.update({
      brand, productName,
    }, {
      where: { groceryId: id },
    })
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  app.use('/grocery', router);
};
