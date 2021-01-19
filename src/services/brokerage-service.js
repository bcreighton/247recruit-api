const BrokerageService = {
    getBrokerages(knex) {
        return knex.select('*').from('brokerages')
    }
};

module.exports = BrokerageService;