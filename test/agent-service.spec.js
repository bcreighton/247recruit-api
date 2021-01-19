const { expect } = require("chai");
const AgentService = require('../src/services/agent-service');
const {testAgents, testBrokerages} = require('./test-vars');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');

describe(`Agent service object`, () => {
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

    context(`Given 'agents' has data`, () => {
        // insert necessary data for agent table requirements
        before(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
        });

        it(`getAgents() resolves all agents from the 'agents' table`, () => {
            updatedTestAgents = testAgents.map((a, n = 1) => {
                let kv = {brokerage: parseInt(`${n+1}`)};
                let obj = {...a, ...kv};
                return obj;
            }) 
            return AgentService.getAgents(db)
                .then(actual => {
                    expect(actual).to.eql(updatedTestAgents.map(a => ({
                        ...a,
                        license_exp: new Date(a.license_exp),
                        sponsor_date: new Date(a.sponsor_date)
                    })));
                });
        });
    });

    context(`Given 'agent' has no data`, () => {
        it(`getAgens() resolves an empty array`, () => {
            return AgentService.getAgents(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });
    });
});