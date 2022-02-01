const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.SECRET_KEY;

    return expressJwt({
        secret: secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/ , methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/products(.*)/ , methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/ , methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/orders(.*)/ , methods:['GET', 'OPTIONS', 'POST']},

            {url: /\/api\/v1\/users\/login/ , methods:['POST']},
            {url: /\/api\/v1\/users\/register/ , methods:['POST']},
            {url: /\/api\/v1\/users/ , methods:['POST']}
/*             {url: /(.*)/} */
        ]
    })
}

async function isRevoked(req, payload, done){
    if(!payload.isAdmin){
        done(null, true);
    }

    done();
}

module.exports = authJwt;