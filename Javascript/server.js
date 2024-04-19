const express = require('express');
const Pokedex = require('pokedex');
const bodyParser = require('body-parser');

const app = express();
const pokedex = new Pokedex();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Liste over alle Pokemon.
app.get('/pokemon', (req, res) => {
  res.json(pokedex.pokemon());
});

// Få en spesifikk Pokemon med navn.
app.get('/pokemon/:name', (req, res) => {
  const pokemon = pokedex.pokemon(req.params.name);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send('Pokemon not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
