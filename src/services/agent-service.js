const AgentService = {
    getAgents(knex) {
        return knex
            .from('agents')
            .join('brokerages', 'brokerages.id', 'agents.brokerage')
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
            .join('brokerages', 'brokerages.id', 'agents.brokerage')
            .select(knex.ref('agents.id').as('id'),
                    knex.ref('agents.name').as('name'),
                    knex.ref('agents.phone').as('phone'),
                    knex.ref('agents.email').as('email'),
                    knex.ref('agents.tot_vol').as('vol'),
                    knex.ref('agents.tot_units').as('trans'),
                    knex.ref('brokerages.brokerage_name').as('brokerage'),
                    knex.ref('brokerages.street').as('brokerage_street'),
                    knex.ref('brokerages.city').as('brokerage_city'),
                    knex.ref('brokerages.st').as('brokerage_state'),
            )
            .where('agents.id', id)
            .first()
    }
};

module.exports = AgentService;