const AgentService = {
    getAgents(knex) {
        return knex
            .from('agents')
            .join('brokerages ', 'brokerages.id', 'agents.brokerage')
            .select(knex.ref('agents.id').as('id'),
                    knex.ref('agents.name').as('name'),
                    knex.ref('brokerages.brokerage_name').as('brokerage'),
                    knex.ref('agents.tot_vol').as('vol'),
                    knex.ref('agents.tot_units').as('trans')
            )
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