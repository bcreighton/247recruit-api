const AgentService = {
    getAgents(knex) {
        return knex.select('*').from('agents')
    }
};

module.exports = AgentService;