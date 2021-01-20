const AgentService = {
    getAgents(knex) {
        debugger;
        return knex.select('*').from('agents')
    },

    getById(knex, id) {
        return knex
            .from('agents')
            .select('*')
            .where('id', id)
            .first()
    }
};

module.exports = AgentService;