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

    describe(`Given no agents`, () => {
      context(`GET /api/agent`, () => {
        it(`responds with 200 and an empty list`, () => {
          return supertest(app)
            .get('/api/agent')
            .set(auth, token)
            .expect(200, [])
        })
      });

      context(`GET /api/agent/:id`, () => {
        it(`responds with 404`, () => {
          const agentId = 123456789;

          return supertest(app)
            .get(`/api/agent/${agentId}`)
            .set(auth, token)
            .expect(404, {error: { message: `Agent doesn't exist`}})
        })
      })
    })

    describe(`Given there are agents in the database`, () => {
      // insert necessary data for agent table requirements
      beforeEach(() => {
        return dbTableTransactions.insertAgentData(db)
        .then(() => dbTableTransactions.insertBrokerageData(db))
        .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
      });

      context(`GET /api/agent`, () => {
        it(`responds with 200 and all of the agents`, () => {
            return supertest(app)
              .get('/api/agent')
              .set(auth, token)
              .expect(200, updatedTestAgents)
        });
      });

      context(`GET /api/agent/:id`, () => {
        it(`responds with 200 and the specific agent`, () => {
          const agentId = 2;
          const expectedAgent = updatedTestAgents[agentId -1];
  
          return supertest(app)
            .get(`/api/agent/${agentId}`)
            .set(auth, token)
            .expect(200, expectedAgent)
        })
      })
    })
});
