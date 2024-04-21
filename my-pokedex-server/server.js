const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const adapter = new FileSync("db.json"); // The database file
const db = low(adapter);
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

db.defaults({ pokemons: [] }).write();

// GET - List of all the Pokemon
app.get("/pokemon", (req, res) => {
  const pokemons = db.get("pokemons").value();
  res.json(pokemons);
});

// POST - Add a new Pokemon
app.post("/pokemon", (req, res) => {
  const newPokemon = { id: Date.now().toString(), ...req.body };
  db.get("pokemons").push(newPokemon).write();
  res.status(201).json(newPokemon);
});

// GET - Get a specific Pokemon by name
app.get("/pokemon/:name", (req, res) => {
  const pokemon = db.get("pokemons").find({ name: req.params.name }).value();
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

// PUT - Update a specific Pokemon
app.put("/pokemon/:name", (req, res) => {
  const updatedPokemon = db
    .get("pokemons")
    .find({ name: req.params.name })
    .assign(req.body)
    .write();
  res.json(updatedPokemon);
});

// DELETE - Remove a specific Pokemon
app.delete("/pokemon/:name", (req, res) => {
  const pokemon = db.get("pokemons").remove({ name: req.params.name }).write();
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});
