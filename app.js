const express = require('express');
const createError = require('http-errors');
const path = require ('path');
const expressLayouts = require('express-ejs-layouts');


const { connect } = require('./models');

const pokemonsRouter = require('./routes/pokemons');
const batalhaRouter = require('./routes/batalha');
const capturaRouter = require('./routes/api/captura');

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

//declarando rotas api
app.use('/api', capturaRouter);

//caso não de match em nenhuma rota, tratamos 0 404
app.use((_req, _res, next) => {
    next(createError(404));
});

//tratativa de erro genérica
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.render('paginas/erro',{
        mensagem: err.message,
        erro: err,
    });
});

const porta = 3000;
app.listen(porta, () => {
    connect();

    console.log(`Servidor rodando na porta ${porta}`);
});