const express = require('express');
const { Pokemon } = require('../models');

const router = express.Router();

router.get('/', (_, res) => {
    Pokemon.find().then(pokemon => {
       pokemon.forEach(pokemon => {
        const dataIso = pokemon._id.getTimestamp().toISOString();
        const dataInfo = dataIso.split('T')[0];
        const dataEmPedacos = dataInfo.split('-');

        pokemon.capturadoEm = `${dataEmPedacos[2]}/${dataEmPedacos[1]}/${dataEmPedacos[0]}`;
       });
       
        res.render('paginas/pokemons/index', {
            pokemons: pokemon, 
        });
    });
});

module.exports = router;