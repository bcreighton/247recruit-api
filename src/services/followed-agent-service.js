const FollowedAgentService = {
    getFollowedAgents(knex) {
        return knex.select('*').from('followed_agents')
    },

    getByUsernameId(knex, id) {
        return knex
            .from('followed_agents')
            .select('*')
            .where('username_id', id)
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