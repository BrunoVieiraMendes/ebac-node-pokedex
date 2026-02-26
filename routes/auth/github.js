const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const crypto = require('crypto');

const { Usuario } = require('../../models');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
    clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_OAUTH_REDIRECT_URL,
    scope: ['user:email']
},
async (accessToken, refreshToken, profile, done) => {

    try {
        // GitHub pode não trazer email direto
        let email = null;

        if (profile.emails && profile.emails.length > 0) {
            email = profile.emails[0].value;
        } else {
            // fallback caso não venha email
            email = `${profile.username}@github.local`;
        }

        let usuario = await Usuario.findOneAndUpdate(
            { email },
            { githubUsuarioId: profile.id },
            { new: true }
        );

        if (!usuario) {
            usuario = await Usuario.create({
                email,
                githubUsuarioId: profile.id,
                nome: profile.displayName || profile.username,
                senha: crypto.randomBytes(48).toString('hex'),
            });
        }

        return done(null, usuario);

    } catch (err) {
        return done(err, null);
    }
}));