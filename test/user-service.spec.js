const { expect } = require("chai");
const UserService = require('../src/services/user-service');
const {testAgents, testBrokerages, testUsers} = require('./test-vars');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');

describe(`User service object`, () => {
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
            .then(() => dbTableTransactions.insertUserData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
        });

        it(`getUsers() resolves all users from the 'users' table`, () => {
            testAgents.map((a, n = 1) => {
                let kv = {brokerage: parseInt(`${n+1}`)};
                let obj = {...a, ...kv};
                return obj;
            }) 
            return UserService.getUsers(db)
                .then(actual => {
                    expect(actual).to.eql(testUsers);
                });
        });
    });

    context(`Given 'users' has no data`, () => {
        it(`getUsers() resolves an empty array`, () => {
            return UserService.getUsers(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });
    });
});