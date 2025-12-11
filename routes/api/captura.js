const express = require('express');

const buscaInfoPokemon = require('../../services/busca-pokemon');
const { Pokemon } = require('../../models');


const router = express.Router();

router.post('/:id', async (req, res) => {
    try {
        const pokemon = await buscaInfoPokemon(req.params.id);

        const pokemonFoiCapturado = Math.random() <= 0.4;
        console.log(pokemonFoiCapturado);

        if (pokemonFoiCapturado) {

            try {
                const pokemonCapturado = await Pokemon.create({
                    ...pokemon,
                    ...{
                        capturadoPor: req.usuario._id,
                    }
                });

                return res.json({
                    capturado: true,
                    id: pokemonCapturado._id
                });

            } catch (e) {
                return res.status(500).json({ erro: e });
            }

        } else {
            return res.json({ capturado: false });
        }

    } catch (error) {
        return res.status(404).json({ erro: "Pokémon não encontrado" });
    }
});

module.exports = router;
