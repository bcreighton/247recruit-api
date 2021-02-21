const AgentService = {
    getAgents(knex) {
        return knex('agents')
            .join('brokerages', 'brokerages.id', 'agents.brokerage')
            .select('*')
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