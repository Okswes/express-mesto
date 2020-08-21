const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const getFile = (file) => fs.readFile(file);

const getAllCards = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch((err) => res
      .send(`Ошибка ${err}`)
      .status(500));
};

cardsRouter.get('/', getAllCards);

module.exports = cardsRouter;
