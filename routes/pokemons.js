const express = require('express');
const { Pokemon } = require('../models');

const router = express.Router();

router.get('/', (_, res) => {
    Pokemon.find().then(pokemon => {
        res.render('paginas/pokemons/index', {
            pokemons: pokemon, 
        });
    });
});

module.exports = router;