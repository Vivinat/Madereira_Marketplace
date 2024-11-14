const { expressjwt } = require('express-jwt'); // Correção aqui

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressjwt({  // Usar expressjwt corretamente
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            {url: /\/api\/v1\/produtos(.*)/ , methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categorias(.*)/ , methods:['GET', 'OPTIONS']},
            `${api}/usuarios/login`,
            `${api}/usuarios/register`,
        ]
    });
}

async function isRevoked(req, jwt) {
    const payload = jwt.payload
    if (!payload.isAdmin) {
      return true
    }
    return false
}

module.exports = authJwt;
