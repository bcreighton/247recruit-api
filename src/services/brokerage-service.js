const BrokerageService = {
    getBrokerages(knex) {
        return knex.select('*').from('brokerages')
    },

    getById(knex, id) {
        return knex
            .from('brokerages')
            .select('*')
            .where('id', id)
            .first()
    }
};

module.exports = BrokerageService;