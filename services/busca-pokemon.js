const axios = require('axios');

const buscaInfoPokemon = (pokeId) => {
    return new Promise((resolve,reject) => {

        const url = "https://pokeapi.co/api/v2/pokemon/" + pokeId;

        axios.get(url).then(resultado => {
            const data = resultado.data;
    
            const id = data.id;
            const nome = data.name;
            const altura = data.height;
            const peso = data.weight;
            const imagem = data.sprites.other['official-artwork'].front_default;
            const ataques = data.abilities.map(a => a.ability.name).join(', ');
    
            const estatisticas = {};
    
            data.stats.forEach((estatistica) => {
                estatisticas[estatistica.stat.name] = estatistica.base_stat;

            });

            const jogos = data.game_indices.map(a => a.version.name);

            resolve({
                id: id,
                nome: nome,
                altura: altura,
                peso: peso,
                imagem: imagem,
                ataques: ataques,
                estatisticas: estatisticas,
                jogos: jogos,
            })

        }).catch((e) => reject(e));

    });
  
};

module.exports = buscaInfoPokemon;