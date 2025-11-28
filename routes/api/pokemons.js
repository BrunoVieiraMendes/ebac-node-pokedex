const express = require('express');

const { Pokemon } = require('../../models');

const router = express.Router();

//C do CRUD create 
router.post('/', async(req, res) => {
    try{
        const pokemon = await Pokemon.create(req.body);
        res.status(201).json({
            sucesso: true,
            pokemon: pokemon,
        });
    } catch (e) {
        res.status(422).json({
            sucesso: false,
            erro: e,
        });
    }

});

// R do CRUD (Read) Pesquisa

router.get('/', async (req, res) => {
    try {
        const filtros = req.query;
        const options = {};

        if (filtros.nomeComecaCom) {
            options.nome = {
                $regex: filtros.nomeComecaCom + '.*',
            };
        }
        const pokemons = await Pokemon.find(options);
        res.status(200).json({
            sucesso: true,
            pokemons: pokemons,
        })
    } catch (e) {
        res.status(500).json({
            sucesso: false,
            erro: e,
        })
    }
});


//atividade modulo 8 pesquisa por peso minimo

//peso minimo
router.get('/por-peso', async (req, res) => {
    try {
        const filtros = req.query;
        const options = {};

        if (filtros.pesoMinimo) {
            options.peso = {
                $gte: Number(filtros.pesoMinimo)
            };
        }

        const pokemons = await Pokemon.find(options);
        res.status(200).json({
            sucesso: true,
            pokemons: pokemons,
        })
    } catch (e) {
        res.status(500).json({
            sucesso: false,
            erro: e,
        })
    }

});


//altura minima

router.get('/por-altura', async (req, res) => {
    try {
        const filtros = req.query;
        const options = {};

        if (filtros.alturaMinima) {
            options.altura = {
                $gte: Number(filtros.alturaMinima)
            };
        }

        const pokemons = await Pokemon.find(options);
        res.status(200).json({
            sucesso: true,
            pokemons: pokemons,
        })
    } catch (e) {
        res.status(500).json({
            sucesso: false,
            erro: e,
        })
    }

});


//r crud exibicao pokemons

router.get('/:id', async(req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ _id: req.params.id });
        res.json({
            sucesso: true,
            pokemon: pokemon,
        })
    } catch {
        res.status(404).json({
            sucesso: false,
            erro: 'Pokemon nao encontrado',
        })
    }
});



// U do Crud (Update)

router.patch('/:id', async(req, res) => {
    try {

        const pokemon = await Pokemon.findOne({ _id: req.params.id })

        Object.keys(req.body).forEach((atributo) => {
            pokemon[atributo] = req.body[atributo];
        });

        await pokemon.save();

        res.json({
            sucesso: true,
            pokemon: pokemon,
        });

    } catch (e) {
        res.status(422).json({
            sucesso: false,
            erro: e,
        })
    }
});


//d crud delete pokemons

router.delete('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Pokemon não encontrado',
            });
        }

        res.json({
            sucesso: true,
            mensagem: 'Pokemon deletado com sucesso',
            pokemon: pokemon,
        });

    } catch (e) {
        res.status(400).json({
            sucesso: false,
            erro: 'ID inválido',
        });
    }
});


module.exports = router;