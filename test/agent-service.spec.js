const { expect } = require("chai");
const AgentService = require('../src/services/agent-service');
const {testAgents, testBrokerages} = require('./fixtures');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');

describe(`Agent service object`, () => {
    let db;
    const updatedTestAgents = testAgents.map((a, n = 1) => {
            let kv = {brokerage: parseInt(`${n+1}`)};
            let obj = {...a, ...kv};
            return obj;
        });

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
        beforeEach(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
        });

        it(`getAgents() resolves all agents from the 'agents' table`, () => {

            return AgentService.getAgents(db)
                .then(actual => {
                    expect(actual).to.eql(updatedTestAgents.map(a => ({
                        ...a,
                        license_exp: new Date(a.license_exp),
                        sponsor_date: new Date(a.sponsor_date)
                    })));
                });
        });

        it(`getById() resolves an agent by id from the 'agents' table`, () => {
            const thirdId = 3;
            const thirdTestAgent = updatedTestAgents[thirdId -1];

            return AgentService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        agent_name: thirdTestAgent.agent_name,
                        license_num: thirdTestAgent.license_num,
                        email: thirdTestAgent.email,
                        phone: thirdTestAgent.phone,
                        license_exp: thirdTestAgent.license_exp,
                        sponsor_date: thirdTestAgent.sponsor_date,
                        list_units: thirdTestAgent.list_units,
                        list_vol: thirdTestAgent.list_vol,
                        sell_units: thirdTestAgent.sell_units,
                        sell_vol: thirdTestAgent.sell_vol,
                        tot_units: thirdTestAgent.tot_units,
                        tot_vol: thirdTestAgent.tot_vol,
                        brokerage: thirdTestAgent.brokerage
                    })
                })
        })
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