const UserService = {
    getUsers(knex) {
        return knex.select('*').from('users')
    }
};

module.exports = UserService;