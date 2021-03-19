const FollowedAgentService = {
    getFollowedAgents(knex) {
        return knex.select('*').from('followed_agents')
    },
    getByUsernameId(knex, id) {
        return knex('followed_agents')
            .leftOuterJoin('agents', 'agents.id', 'followed_agents.agent_id')
            .where('username_id', id)
            .leftOuterJoin('brokerages', 'agents.brokerage', 'brokerages.id')
            .select(
                'followed_agents.agent_id AS id',
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
    },
    getById(knex, usernameId, agentId) {
        return knex('followed_agents')
            .leftOuterJoin('agents', 'agents.id', 'followed_agents.agent_id')
            .where({
                username_id: usernameId,
                agent_id: agentId,
            })
            .leftOuterJoin('brokerages', 'agents.brokerage', 'brokerages.id')
            .select(
                'followed_agents.agent_id AS id',
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
    },
    insertFollowedAgent(knex, newFollowedAgent) {
        return knex
            .insert(newFollowedAgent)
            .into('followed_agents')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteFollowedAgent(knex, usernameId, agentId) {
        
        return knex('followed_agents')
            .where({
                agent_id: agentId, 
                username_id: usernameId
            }).delete()
    }
};

module.exports = FollowedAgentService;