const { expect } = require("chai");
const {testAgents, testBrokerages, testUsers, testFollowedAgents, testNotes} = require('./app.fixtures');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');
const supertest = require("supertest");
const app = require("../src/app");

describe(`Agent Endpoints`, () => {
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

describe(`User Endpoints`, () => {
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

  describe(`Given no users`, () => {
    context(`GET /api/user`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/user')
          .set(auth, token)
          .expect(200, [])
      })
    });

    context(`GET /api/user/:id`, () => {
      it(`responds with 404`, () => {
        const userId = 123456789;

        return supertest(app)
          .get(`/api/user/${userId}`)
          .set(auth, token)
          .expect(404, {error: { message: `User does not exist`}})
      })
    })
  })

  describe(`Given there are users in the database`, () => {
    // insert necessary data for user table requirements
    beforeEach(() => {
      return dbTableTransactions.insertAgentData(db)
      .then(() => dbTableTransactions.insertBrokerageData(db))
      .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
      .then(() => dbTableTransactions.insertUserData(db))
    });

    context(`GET /api/user`, () => {
      it(`responds with 200 and all of the users`, () => {
          return supertest(app)
            .get('/api/user')
            .set(auth, token)
            .expect(200, testUsers)
      });
    });

    context(`GET /api/user/:id`, () => {
      it(`responds with 200 and the specific user`, () => {
        const userId = 2;
        const expectedUser = testUsers[userId -1];

        return supertest(app)
          .get(`/api/user/${userId}`)
          .set(auth, token)
          .expect(200, expectedUser)
      })
    })
  })
});

describe(`Followed Agents Endpoints`, () => {
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

  describe(`Given no followed agents`, () => {
    // insert necessary data for user table requirements
    beforeEach(() => {
      return dbTableTransactions.insertAgentData(db)
      .then(() => dbTableTransactions.insertBrokerageData(db))
      .then(() => dbTableTransactions.insertUserData(db))
      .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
    });

    context(`GET /api/user/:id/followed-agents`, () => {
      it(`responds with 200 and an empty list`, () => {
        const userId = 1;

        return supertest(app)
          .get(`/api/user/${userId}/followed-agents`)
          .set(auth, token)
          .expect(200, [])
      })
    });

    context(`GET /api/user/:id/followed-agents`, () => {
      it(`responds with 404`, () => {
        const userId = 123456789;

        return supertest(app)
          .get(`/api/user/${userId}/followed-agents`)
          .set(auth, token)
          .expect(404, {error: { message: `User does not exist`}})
      })
    })
  })

  describe(`Given there are followed agents in the database`, () => {
    // insert necessary data for user table requirements
    beforeEach(() => {
      return dbTableTransactions.insertAgentData(db)
      .then(() => dbTableTransactions.insertBrokerageData(db))
      .then(() => dbTableTransactions.insertUserData(db))
      .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
      .then(() => dbTableTransactions.insertFollowedAgents(db))
    });

    context(`GET /api/user/:id/followed-agents`, () => {
      it(`responds with 200 and all of the followed agents for a specific user`, () => {
          const userId = 2;
          expectedFollowedAgents = testFollowedAgents.filter(a => userId === a.username_id);
        
          return supertest(app)
            .get(`/api/user/${userId}/followed-agents`)
            .set(auth, token)
            .expect(200, expectedFollowedAgents)
      });
    });
  })
});

describe(`Note Endpoints`, () => {
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

  describe(`Given no notes`, () => {
    // insert necessary data for users and agents table requirements
    beforeEach(() => {
      return dbTableTransactions.insertAgentData(db)
      .then(() => dbTableTransactions.insertBrokerageData(db))
      .then(() => dbTableTransactions.insertUserData(db))
      .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
    });

    context(`GET /api/note/:id`, () => {
      it(`responds with 404; if note does not exist`, () => {
        const noteId = 123456789;

        return supertest(app)
          .get(`/api/note/${noteId}`)
          .set(auth, token)
          .expect(404, {error: { message: `Note does not exist`}})
      })
    })
  })

  describe(`Given there are notes in the database`, () => {
    // insert necessary data for note table requirements
    beforeEach(() => {
      return dbTableTransactions.insertAgentData(db)
      .then(() => dbTableTransactions.insertBrokerageData(db))
      .then(() => dbTableTransactions.insertUserData(db))
      .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
      .then(() => dbTableTransactions.insertNoteData(db))
    });

    context(`GET /api/note/:note-id`, () => {
      it(`responds with 200 and the specific note`, () => {
        const noteId = 2;
        const expectedNote = testNotes[noteId -1];

        return supertest(app)
          .get(`/api/note/${noteId}`)
          .set(auth, token)
          .expect(200, expectedNote)
      })
    })
  })
});

describe(`Brokerage Endpoints`, () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 438fed41-e90f-49bb-ab1a-1c946f3fc696';

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

  describe(`Given no brokerages`, () => {
    // insert necessary data for users and agents table requirements
    beforeEach(() => {
      return dbTableTransactions.insertAgentData(db)
      .then(() => dbTableTransactions.insertBrokerageData(db))
      .then(() => dbTableTransactions.insertUserData(db))
      .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
    });

    context(`GET /api/brokerage/:id`, () => {
      it(`responds with 404; if brokerage does not exist`, () => {
        const brokerageId = 123456789;

        return supertest(app)
          .get(`/api/brokerage/${brokerageId}`)
          .set(auth, token)
          .expect(404, {error: { message: `Brokerage does not exist`}})
      })
    })
  })

  describe(`Given there are brokerages in the database`, () => {
    // insert necessary data for brokerage table requirements
    beforeEach(() => {
      return dbTableTransactions.insertAgentData(db)
      .then(() => dbTableTransactions.insertBrokerageData(db))
      .then(() => dbTableTransactions.insertUserData(db))
      .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
      .then(() => dbTableTransactions.insertNoteData(db))
    });

    context(`GET /api/brokerage/:brokerage-id`, () => {
      it(`responds with 200 and the specific brokerage`, () => {
        const brokerageId = 2;
        const expectedBrokerage = testBrokerages[brokerageId -1];

        return supertest(app)
          .get(`/api/brokerage/${brokerageId}`)
          .set(auth, token)
          .expect(200, expectedBrokerage)
      })
    })
  })
});
