const { expect } = require("chai");
const AgentService = require('../src/services/agent-service');
const {testAgents, testBrokerages} = require('./app.fixtures');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');
const supertest = require("supertest");
const app = require("../src/app");

describe.only(`Agent Endpoints`, () => {
    let db;
    const auth = 'Authorization';
    const token = 'Bearer 438fed41-e90f-49bb-ab1a-1c946f3fc696';
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
        app.set('db', db);
    });

    before(() => dbTableTransactions.cleanDB(db));
    afterEach(() => dbTableTransactions.cleanDB(db));
    after(() => db.destroy());

    describe(`GET /api/agent`, () => {
      context(`Given no agents`, () => {
        it(`responds with 200 and an empty list`, () => {
          return supertest(app)
            .get('/api/agent')
            .set(auth, token)
            .expect(200, [])
        })
      })
  
      context(`Given there are agents in the database`, () => {
          // insert necessary data for agent table requirements
          beforeEach(() => {
              return dbTableTransactions.insertAgentData(db)
              .then(() => dbTableTransactions.insertBrokerageData(db))
              .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
          });
  
          it(`GET /api/agent responds with 200 and all of the agents`, () => {
              return supertest(app)
                .get('/api/agent')
                .set(auth, token)
                .expect(200, updatedTestAgents)
          });
        });
    })
    
    describe(`GET /api/agent/:id`, () => {
      // insert necessary data for agent table requirements
      beforeEach(() => {
        return dbTableTransactions.insertAgentData(db)
        .then(() => dbTableTransactions.insertBrokerageData(db))
        .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
      });

      it(`GET /api/agent/:id responds with 200 and the specific agent`, () => {
        const agentId = 2;
        const expectedAgent = updatedTestAgents[agentId -1];

        return supertest(app)
          .get(`/api/agent/${agentId}`)
          .set(auth, token)
          .expect(200, expectedAgent)
      })
    })   
});
