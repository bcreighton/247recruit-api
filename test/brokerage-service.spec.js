const { expect } = require("chai");
const BrokerageService = require('../src/services/brokerage-service')
const {testAgents, testBrokerages} = require('./test-vars');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');

describe(`Brokerage service object`, () => {
    let db;

    // Establish db connection

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
    });

    before(() => dbTableTransactions.cleanDB(db));
    afterEach(() => dbTableTransactions.cleanDB(db));
    after(() => db.destroy());

    context(`Given 'brokerages' has data`, () => {
        // insert necessary data for brokerage table requirements
        before(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
        });

        it(`getBrokerages() resolves all brokerages from the 'brokerages' table`, () => {
            testAgents.map((a, n = 1) => {
                let kv = {brokerage: parseInt(`${n+1}`)};
                let obj = {...a, ...kv};
                return obj;
            }) 
            return BrokerageService.getBrokerages(db)
                .then(actual => {
                    expect(actual).to.eql(testBrokerages);
                });
        });
    });

    context(`Given 'brokerages' has no data`, () => {
        it(`getBrokerages() resolves an empty array`, () => {
            return BrokerageService.getBrokerages(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });
    });
});