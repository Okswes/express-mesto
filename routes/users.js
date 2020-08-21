const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const getFile = (file) => fs.readFile(file);

const getAllUsers = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch((err) => res
      .send(`Ошибка ${err}`)
      .status(500));
};

const getUsers = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((result) => {
      const users = JSON.parse(result);
      const user = users.find((item) => item._id === req.params.id);
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
      console.log(err);
    });
};

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUsers);

module.exports = usersRouter;
