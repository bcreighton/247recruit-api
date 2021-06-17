const { expect } = require("chai");
const BrokerageService = require('../src/services/brokerage-service')
const {testAgents, testBrokerages} = require('./fixtures');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');

describe(`Brokerage service object`, () => {
    let db;

    // Establish db connection

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
    });

    before(() => dbTableTransactions.cleanDB(db));
    afterEach(() => dbTableTransactions.cleanDB(db));
    after(() => db.destroy());

    context(`Given 'brokerages' has data`, () => {
        // insert necessary data for brokerage table requirements
        beforeEach(() => {
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

        it(`getById() resolves a brokerage by id from the 'brokerages' table`, () => {
            const thirdId = 3;
            const thirdTestBrokerage = testBrokerages[thirdId -1];

            return BrokerageService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        brokerage_name: thirdTestBrokerage.brokerage_name,
                        broker_id: thirdTestBrokerage.broker_id,
                        street: thirdTestBrokerage.street,
                        city: thirdTestBrokerage.city,
                        st: thirdTestBrokerage.st
                    })
                })
        })
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