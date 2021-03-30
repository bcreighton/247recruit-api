const AuthService = {
    getUsername(knex, username) {
        return knex('users')
            .where({username: username})
            .first()
    }
}