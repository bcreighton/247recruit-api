const { expect } = require("chai");
const {
  testAgents, 
  testBrokerages, 
  testUsers, 
  testFollowedAgents, 
  testNotes, 
  maliciousData 
} = require('./app.fixtures');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');
const supertest = require("supertest");
const app = require("../src/app");
const followedAgentRouter = require("../src/routers/followed-agent-router");

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
            connection: process.env.TEST_DATABASE_URL,
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

      context(`Given an XSS attack agent`, () => {
        beforeEach('insert malicious agent', () => {
          return db
            .into('agents')
            .insert([ maliciousData.agent ])
        })

        it('removes XSS attack content', () => {
          return supertest(app)
            .get(`/api/agent/${maliciousData.agent.id}`)
            .set(auth, token)
            .expect(200)
            .expect(res => {
              expect(res.body.name).to.equal('Naughty Naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
            })
        })
      })

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

//===============================================================

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
          connection: process.env.TEST_DATABASE_URL,
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

    context(`DELETE /api/user/:id`, () => {
      it(`responds with 404`, () => {
        const userId = 123456;
  
        return supertest(app)
          .delete(`/api/user/${userId}`)
          .set(auth, token)
          .expect(404, {error: {
            message: `User does not exist`
          }})
      })
    })

    context(`PATCH /api/user/:id`, () => {
      it(`responds with 404`, () => {
        const userId = 123456;

        return supertest(app)
          .patch(`/api/user/${userId}`)
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

    context(`Given an XSS attack user`, () => {
      beforeEach('insert malicious user', () => {
        return db
          .into('users')
          .insert([ maliciousData.user ])
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/user/${maliciousData.user.id}`)
          .set(auth, token)
          .expect(200)
          .expect(res => {
            expect(res.body.username).to.equal('Naughty Naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
          })
      })
    })

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

    context(`POST /api/user`, () => {
      it(`creates a new user, responding with 201 and the new user`, () => {
        const newUser = {
          username: "testNewUser",
          password: "testPassword",
          first_name: "test",
          last_name: "user",
          email: "testnewuser@user.com",
          phone: "927-708-1215",
          brokerage: 2
        }

        return supertest(app)
          .post(`/api/user`)
          .set(auth, token)
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body.username).to.eql(newUser.username);
            expect(res.body.password).to.eql(newUser.password);
            expect(res.body.first_name).to.eql(newUser.first_name);
            expect(res.body.last_name).to.eql(newUser.last_name);
            expect(res.body.email).to.eql(newUser.email);
            expect(res.body.phone).to.eql(newUser.phone);
            expect(res.body.brokerage).to.eql(newUser.brokerage);
            expect(res.body).to.have.property('id');
            expect(res.headers.location).to.eql(`/api/user/${res.body.id}`)
          })
          .then(postRes => 
            supertest(app)
              .get(`/api/user/${postRes.body.id}`)
              .set(auth, token)
              .expect(postRes.body)
            )
      })
    })

    context(`DELETE /api/user/:id`, () => {
      it(`responds with 204 and removes the user`, () => {
        const idToRemove = 2; 
        const expectedUsers = testUsers.filter(note => note.id !== idToRemove)

        return supertest(app)
          .delete(`/api/user/${idToRemove}`)
          .set(auth, token)
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/user`)
              .set(auth, token)
              .expect(expectedUsers)
          )
      })
    })

    context(`PATCH /api/user/:id`, () => {
      it(`responds with 400 when no required fields supplied`, () => {
        const idToUpdate = 2;

        return supertest(app)
          .patch(`/api/user/${idToUpdate}`)
          .set(auth, token)
          .send({irrelevantField: 'foo'})
          .expect(400, {
            error: {message: `Request body must contain either 'password', 'email', 'phone', or 'brokerage'`}
          })
      })
      
      it(`responds with 204 and updates the user`, () => {
        const idToUpdate = 2;
        const updateUser = {
            password: 'updated user password',
            email: "update@email.com",
            phone: '303-111-1111',
            brokerage: 2
        }
        const expectedUser = {
          ...testUsers[idToUpdate-1],
          ...updateUser,
        }

        return supertest(app)
          .patch(`/api/user/${idToUpdate}`)
          .set(auth, token)
          .send(updateUser)
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/user/${idToUpdate}`)
              .set(auth, token) 
              .expect(expectedUser)
          )
      })

      it(`responds with 204 when updateing a subset of fields`, () => {
        const idToUpdate = 2;
        const updateUser = {
          email: 'update@email.com'
        }

        const expectedUser = {
          ...testUsers[idToUpdate - 1],
          ...updateUser,
        }

        return supertest(app)
          .patch(`/api/user/${idToUpdate}`)
          .set(auth, token)
          .send({
            ...updateUser,
            fieldToIgnore: 'should note be in the GET response'
          })
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/user/${idToUpdate}`)
              .set(auth, token)
              .expect(expectedUser)
          )
      })
    })
  })
});

// ================================================================

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
          connection: process.env.TEST_DATABASE_URL,
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

    context(`GET /api/followed-agent/:userId`, () => {
      it(`responds with 200 and an empty list`, () => {
        const userId = 1;

        return supertest(app)
          .get(`/api/followed-agent/${userId}`)
          .set(auth, token)
          .expect(200, [])
      })
    });

    context(`GET /api/followed-agent/:userId`, () => {
      it(`responds with 404`, () => {
        const userId = 123456789;

        return supertest(app)
          .get(`/api/followed-agent/${userId}`)
          .set(auth, token)
          .expect(404, {error: { message: `User does not exist`}})
      })
    })

    context(`DELETE /api/followed-agent/:userid`, () => {
      it(`responds with 404 when user does not exist`, () => {
        const userId = 123456;
        const followedAgent = {
            agent_id: 3,
            username_id: userId
        }

        return supertest(app)
          .delete(`/api/followed-agent/${userId}`)
          .set(auth, token)
          .send(followedAgent)
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

    context(`GET /api/followed-agent/:userId`, () => {
      it(`responds with 200 and all of the followed agents for a specific user`, () => {
          const userId = 2;
          expectedFollowedAgents = testFollowedAgents.filter(a => userId === a.username_id);
        
          return supertest(app)
            .get(`/api/followed-agent/${userId}`)
            .set(auth, token)
            .expect(200, expectedFollowedAgents)
      });
    });

    context(`POST /api/followed-agent/:userId`, () => {
      it(`responds with 201 and the new followed agent relationship`, () => {
        const userId = 2;
        const newFollowedAgent = {
          agent_id: 2,
          username_id: userId,
        }

        return supertest(app)
          .post(`/api/followed-agent/${userId}`)
          .set(auth, token)
          .send(newFollowedAgent)
          .expect(201)
          .expect(res => {
            expect(res.body.agent_id).to.eql(newFollowedAgent.agent_id);
            expect(res.body.username_id).to.eql(newFollowedAgent.username_id);
          })
          .then(postRes =>
            supertest(app)
              .get(`/api/followed-agent/${userId}`)  
              .set(auth, token)
              .expect(postRes => {
                expect(postRes.body).to.deep.include(newFollowedAgent)
              })
          )
      })
    })

    context(`DELETE /api/followed-agent/:userId`, () => {
      it(`responds with 204 and removes the followed agent relationship`, () => {
        const userId = 3;
        const followedAgentToRemove = {
            agent_id: 3,
            username_id: 3
        };
        const expectedFollowedAgents = testFollowedAgents.filter(fa =>
            fa.username_id === userId && fa.agent_id !== followedAgentToRemove.agent_id
          )
        
        return supertest(app)
          .delete(`/api/followed-agent/${userId}`)
          .set(auth, token)
          .send(followedAgentToRemove)
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/followed-agent/${userId}`)
              .set(auth, token)
              .expect(expectedFollowedAgents)
          )
      })
    })
  })
});

// ================================================================

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
          connection: process.env.TEST_DATABASE_URL,
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

    context(`DELETE /api/note/:id`, () => {
      it(`responds with 404`, () => {
        const noteId = 123456;
        return supertest(app)
          .delete(`/api/note/${noteId}`)
          .set(auth, token)
          .expect(404, {error: {message: `Note does not exist`}})
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

    context(`Given an XSS attack note`, () => {
      beforeEach('insert malicious note', () => {
        return db
          .into('notes')
          .insert([ maliciousData.note ])
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/note/${maliciousData.note.id}`)
          .set(auth, token)
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.equal('Naughty Naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
            expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
          })
      })
    })

    context(`GET /api/note/:note-id`, () => {
      it(`responds with 200 and the specific note`, function() {
        this.retries(3)

        const noteId = 2;
        const expectedNote = testNotes[noteId -1];

        return supertest(app)
          .get(`/api/note/${noteId}`)
          .set(auth, token)
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedNote.title);
            expect(res.body.content).to.eql(expectedNote.content);
            expect(res.body.username_id).to.eql(expectedNote.username_id);
            expect(res.body.agent_id).to.eql(expectedNote.agent_id);
            expect(res.body).to.have.property('id');
            const expected = new Date().toLocaleString('en', { timeZone: 'UTC' });
            const actual = new Date(res.body.timestamp).toLocaleString();
            expect(actual).to.eql(expected);
          })
      })
    })

    context(`POST /api/note`, () => {
      it(`creates a note, responding with 201 and the new note id`, function() {
        this.retries(3);

        const newNote = {
            title: 'Test new note',
            content: 'Test new note content...',
            username_id: 1,
            agent_id: 2
        }
        return supertest(app)
          .post(`/api/note`)
          .set(auth, token)
          .send(newNote)
          .expect(201)
          .expect(res => {
            expect(res.body.title).to.eql(newNote.title);
            expect(res.body.content).to.eql(newNote.content);
            expect(res.body.username_id).to.eql(newNote.username_id);
            expect(res.body.agent_id).to.eql(newNote.agent_id);
            expect(res.body).to.have.property('id');
            expect(res.headers.location).to.eql(`/api/note/${res.body.id}`);
            const expected = new Date().toLocaleString('en', { timeZone: 'UTC' });
            const actual = new Date(res.body.timestamp).toLocaleString();
            expect(actual).to.eql(expected);
          })
          .then(postRes => 
            supertest(app)
              .get(`/api/note/${postRes.body.id}`)
              .set(auth, token)
              .expect(postRes.body)
          )
      })
    })

    context(`DELETE /api/note/:note-id`, () => {
      it(`responds with 204 and removes the note`, () => {
        const idToRemove = 2;
        const expectedNotes = testNotes.filter(note => note.id !== idToRemove)

        return supertest(app)
          .delete(`/api/note/${idToRemove}`)
          .set(auth, token)
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/note`)
              .set(auth, token)
              .expect(getRes => {
                for(let i = 0; i < expectedNotes.length; i++) {
                  expect(getRes.body[i].title).to.eql(expectedNotes[i].title);
                  expect(getRes.body[i].content).to.eql(expectedNotes[i].content);
                  expect(getRes.body[i].username_id).to.eql(expectedNotes[i].username_id);
                  expect(getRes.body[i].agent_id).to.eql(expectedNotes[i].agent_id);
                  expect(getRes.body[i]).to.have.property('id');
                  const expected = new Date().toLocaleString('en', { timeZone: 'UTC' });
                  const actual = new Date(getRes.body[i].timestamp).toLocaleString();
                  expect(actual).to.eql(expected);
                }
              })
          )
      })
    })

    context(`PATCH /api/note/:note-id`, () => {
      it(`responds with 400 when no required fields supplied`, () => {
        const idToUpdate = 2;

        return supertest(app)
          .patch(`/api/note/${idToUpdate}`)
          .set(auth, token)
          .send({irrelevantField: 'foo'})
          .expect(400, {
            error: {message: `Request body must contain either 'title' or 'content'`}
          })
      })

      it(`responds with 204 and updates the note`, () => {
        const idToUpdate = 2;
        const updateNote = {
            title: 'updated title',
            content: 'updated content...',
        }
        const expectedNote = {
          ...testNotes[idToUpdate - 1],
          ...updateNote,
        }

        return supertest(app)
          .patch(`/api/note/${idToUpdate}`)
          .set(auth, token)
          .send(updateNote)
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/note/${idToUpdate}`)
              .set(auth, token)
              .expect(getRes => {
                expect(getRes.body.title).to.eql(expectedNote.title);
                expect(getRes.body.content).to.eql(expectedNote.content);
                expect(getRes.body).to.have.property('id')
                expect(getRes.body).to.have.property('username_id')
                expect(getRes.body).to.have.property('agent_id')
                const expected = new Date().toLocaleString('en', { timeZone: 'UTC' });
                const actual = new Date(getRes.body.timestamp).toLocaleString();
                expect(actual).to.eql(expected);
              })
          )
      })

      it(`responds with 204 when updating a subset of fields`, () => {
        const idToUpdate = 2;
        const updateNote = {
          content: 'updated content'
        }
        const expectedNote = {
          ...testNotes[idToUpdate - 1],
          ...updateNote,
        }

        return supertest(app)
          .patch(`/api/note/${idToUpdate}`)
          .set(auth, token)
          .send({
            ...updateNote,
            fieldToignore: 'should not be in the GET response'
          })
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/note/${idToUpdate}`)  
              .set(auth, token)
              .expect(getRes => {
                expect(getRes.body.title).to.eql(expectedNote.title);
                expect(getRes.body.content).to.eql(expectedNote.content);
                expect(getRes.body).to.have.property('id')
                expect(getRes.body).to.have.property('username_id')
                expect(getRes.body).to.have.property('agent_id')
                const expected = new Date().toLocaleString('en', { timeZone: 'UTC' });
                const actual = new Date(getRes.body.timestamp).toLocaleString();
                expect(actual).to.eql(expected);
              })
          )
      })
    })
  })
})

// ==================================================================================

describe(`Brokerage Endpoints`, () => {
  let db;
  const auth = 'Authorization';
  const token = 'Bearer 438fed41-e90f-49bb-ab1a-1c946f3fc696';

  // Establish db connection

  before(() => {
      db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
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

    context(`Given an XSS attack brokerage`, () => {
      beforeEach('insert malicious brokerage', () => {
        return db
          .into('brokerages')
          .insert([ maliciousData.brokerage ])
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/brokerage/${maliciousData.brokerage.id}`)
          .set(auth, token)
          .expect(200)
          .expect(res => {
            expect(res.body.brokerage_name).to.equal('Naughty Naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
            expect(res.body.street).to.equal('Naughty Naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
            expect(res.body.city).to.equal('Naughty Naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
          })
      })
    })

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
