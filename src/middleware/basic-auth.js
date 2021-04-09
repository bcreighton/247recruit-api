const AuthService = require('../auth/auth-service');

requireAuth = (req, res, next) => {
    
    const authToken = req.get('Authorization') || '';

    let basicToken;

    if (!authToken.toLowerCase().startsWith('basic ')) {
        res.status(401).json({ error: 'Missing basic token'})
    } else {
        basicToken = authToken.slice('basic '.length, authToken.length)
    }

    const [tokenUsername, tokenPassword] = Buffer
        .from(basicToken, 'base64')
        .toString()
        .split(':')

    if (!tokenUsername || !tokenPassword) {
        return res.status(401).json({error: 'Unauthorized request'})
    }
    
    AuthService.getUsername(req.app.get('db'),tokenUsername)
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Unauthorized request'})
            }

            return AuthService.comparePasswords(tokenPassword, user.password)
                .then(passwordsMatch => {
                    (!passwordsMatch) && res.status(401).json({ error: 'Unauthorized request'})

                    req.user = user;
                    next()
                })
        })
        .catch(next)
}

module.exports = {
    requireAuth,
}