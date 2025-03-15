const express = require('express');
const path = require ('path');
const expressLayouts = ('express-ejs-layouts');

const { connect } = require('./models');

const pokemonsRouter = require('./routes/pokemons');
const batalhaRouter = require('./routes/batalha');

const app = express();

// configurando ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

//configurando arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


//declarando rotas
app.use('/pokemons', pokemonsRouter);
app.use('/batalha', batalhaRouter);

const porta = 3000;
app.listen(porta, () => {
    connect();

    console.log(`Servidor rodando na porta ${porta}`);
});