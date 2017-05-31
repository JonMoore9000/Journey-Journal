const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const uuid = require('uuid');

router.use(jsonParser);

const adventure = require('./models');

router.get('/', (req, res) => {
  adventure
    .find({'userName':  req.query.userName})
    .exec()
    .then(adventures => {
      res.json({
        adventures: adventures.map(
          (adventure) => adventure)
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['place', 'date', 'notes'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = adventure.create(
    {place: req.body.place, date: req.body.date, notes: req.body.notes});
  res.status(201).json(item);
});

router.delete('/', (req, res) => {
    adventure
        .findByValueAndRemove(req.query.place)
        .exec()
        .then(() => {
            console.log(`Deleting place with name \"${req.query.gameName}\"`);
            res.status(204).end();
        });
  });

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['name', 'date', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating games \`${req.params.id}\``);
  const updatedItem = games.update({
    id: req.params.id,
    name: req.body.name,
    game: req.body.game
  });
  res.status(204).json(updatedItem);
});

module.exports = router;
