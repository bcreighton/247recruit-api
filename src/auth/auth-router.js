const express = require('express');
const AuthService = require('./auth-service')

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const {username, password } = req.body;
        const loginUser = { username, password };

        for (const [key, value] of Object.entries(loginUser))
            (value == null) && res.status(400).json({ error: `Missing '${key}' in request body`})
        
        AuthService.getUsername(
            req.app.get('db'),
            loginUser.username,
        )
            .then(dbUser => {
                (!dbUser) && res.status(400).json({ error: 'Incorrect username or password'})

                return AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        (!compareMatch) && res.status(400).json({ error: 'Incorrect username or password'})

                        const sub = dbUser.username;
                        const payload = { user_id: dbUser.id }
                        res.send({
                            authToken: AuthService.createJwt(sub, payload)
                        })
                    })
            })
            .catch(next)
    })

module.exports = authRouter;