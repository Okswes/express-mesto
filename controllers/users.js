const User = require('../models/user');

const getAllUsers = (req, res) => User.find({})
  .then((user) => res.send({ data: user }))
  .catch((err) => res.status(500).send({ message: err.message }));

const getUser = (req, res) => User.findOne({ id: req.params._id })
  .then((user) => {
    if (user) {
      return res
        .status(200)
        .send(user);
    }
    return res
      .status(404)
      .send({ message: 'Нет пользователя с таким id' });
  })
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') return res.status(404).send({ message: err.message });
    return res.status(500).send({ message: 'Произошла ошибка' });
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = { createUser, getAllUsers, getUser };
