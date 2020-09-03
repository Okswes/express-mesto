const Card = require('../models/card');

const getAllCards = (req, res) => Card.find({})
  .then((user) => res.send({ data: user }))
  .catch((err) => res.status(500).send({ message: err.message }));

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => {
    if (card) {
      return res
        .status(200)
        .send(card);
    }
    return res
      .status(404)
      .send({ message: 'Нет карточки с таким id' });
  })
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') return res.status(404).send({ message: err.message });
    return res.status(500).send({ message: 'Произошла ошибка' });
  });

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = { getAllCards, createCard, deleteCard };
