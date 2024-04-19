const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const adapter = new FileSync('db.json'); // The database file
const db = low(adapter);
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

db.defaults({ pokemons: [] }).write();

// GET - List all Pokemon
app.get('/pokemon', (req, res) => {
  const pokemons = db.get('pokemons').value();
  res.json(pokemons);
});

// POST - Add a new Pokemon
app.post('/pokemon', (req, res) => {
  db.get('pokemons')
    .push(req.body)
    .last()
    .assign({ id: Date.now().toString() }) // Assign a unique id to the new Pokemon
    .write();
  res.status(201).json(req.body);
});

// GET - Get a specific Pokemon by name
app.get('/pokemon/:name', (req, res) => {
  const pokemon = db.get('pokemons').find({ name: req.params.name }).value();
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send('Pokemon not found');
  }
});

// PUT - Update a specific Pokemon
app.put('/pokemon/:name', (req, res) => {
  const updatedPokemon = db.get('pokemons')
    .find({ name: req.params.name })
    .assign(req.body)
    .write();
  if (updatedPokemon) {
    res.json(updatedPokemon);
  } else {
    res.status(404).send('Pokemon not found');
  }
});

// DELETE - Remove a specific Pokemon
app.delete('/pokemon/:name', (req, res) => {
  const pokemon = db.get('pokemons').remove({ name: req.params.name }).write();
  if (pokemon.length > 0) {
    res.status(204).send();
  } else {
    res.status(404).send('Pokemon not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});
