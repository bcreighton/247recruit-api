const FollowedAgentService = {
    getFollowedAgents(knex) {
        return knex.select('*').from('followed_agents')
    }
};

module.exports = FollowedAgentService;