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

    // Clear all data from the db tables

    before(() => dbTableTransactions.cleanDB(db));

    // Clear all data from the db tables after each test

    afterEach(() => dbTableTransactions.cleanDB(db));
    
    after(() => db.destroy());

    context(`Given 'agents' has data`, () => {
        // insert test data into the appropriate
        before(() => {
            return (
                db
                .into('agents')
                .insert(testAgents)
                .then(() => {
                    return db.into('brokerages')
                    .insert(testBrokerages)
                })
            )
        });

        before(() => {
            return db('agents')
                .where('id', '=', 1)
                .update('brokerage', 1)
                .then(() => {
                    return db('agents')
                        .where('id', '=', 2)
                        .update('brokerage', 2)
                })
                .then(() => {
                    return db('agents')
                        .where('id', '=', 3)
                        .update('brokerage', 3)
                });
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