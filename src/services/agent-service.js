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
        return knex('agents')
            .leftOuterJoin('brokerages', 'brokerages.id', 'agents.brokerage')
            .where('agents.id', id)
            .first()
            .select(
                'agents.id AS id',
                'agents.name AS name',
                'agents.phone AS phone',
                'agents.email AS email',
                'agents.tot_vol AS vol',
                'agents.tot_units AS trans',
                'brokerages.brokerage_name AS brokerage',
                'brokerages.street AS brokerage_street',
                'brokerages.city AS brokerage_city',
                'brokerages.st AS brokerage_state',
            )
    }
};

module.exports = AgentService;