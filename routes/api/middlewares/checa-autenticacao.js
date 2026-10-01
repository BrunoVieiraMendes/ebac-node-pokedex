const jwt = require ('jsonwebtoken');

const { Usuario } = require ('../../../models');

const checaAutenticacao = async (req, res, next) => {
   // usuario logado pelo navegador (sessao do passport)
   if (req.isAuthenticated && req.isAuthenticated()) {
        req.usuario = req.user;
        return next();
   }

   try{
        const jwtUsuario = req.headers.authorization.replace('Bearer ', '');
        const email = (await jwt.verify(jwtUsuario, process.env.SEGREDO_JWT)).email;

        const usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
            throw 'Usuario não encontrado';
        }

        req.usuario = usuario;

        next();
   } catch (e) {
        console.log("ERRO:", e);
        res.status(401).json({
            sucesso: false,
            erro: 'Faca login para acessar essa rota ',
        })
   }
   
};

module.exports = {
    checaAutenticacao,
}