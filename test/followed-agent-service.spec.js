const { expect } = require("chai");
const FollowedAgentService = require('../src/services/followed-agent-service');
const {testAgents, testBrokerages, testUsers, testNotes, testFollowedAgents} = require('./test-vars');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');

describe.only(`Followed Agent service object`, () => {
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

    context(`Given 'followed_agents' has data`, () => {
        // insert necessary data for db table requirements
        before(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.insertUserData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
            .then(() => dbTableTransactions.insertNoteData(db))
            .then(() => dbTableTransactions.insertFollowedAgents(db))
        });

        it(`getFollowedAgents() resolves all followed agents from the 'followed_agents' table`, () => {
            testAgents.map((a, n = 1) => {
                let kv = {brokerage: parseInt(`${n+1}`)};
                let obj = {...a, ...kv};
                return obj;
            }) 
            return FollowedAgentService.getFollowedAgents(db)
                .then(actual => {
                    expect(actual).to.eql(testFollowedAgents);
                });
        });
    });

    context(`Given 'followed_agents' has no data`, () => {
        it(`getFollowedAgents() resolves an empty array`, () => {
            return FollowedAgentService.getFollowedAgents(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });
    });
});