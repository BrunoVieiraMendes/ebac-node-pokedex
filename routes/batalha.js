const express = require('express');

const buscaInfoPokemon = require('../services/busca-pokemon');

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const pokemonIdRandomico = Math.round(Math.random() * 904 + 1);
        console.log(pokemonIdRandomico);

        const pokemon = await buscaInfoPokemon(pokemonIdRandomico);

        return res.render('paginas/batalha/index', { pokemon });

    } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
        return res.status(500).send("Erro ao carregar Pokémon para batalha");
    }
});


module.exports = router;
