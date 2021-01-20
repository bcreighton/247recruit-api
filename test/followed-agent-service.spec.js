const { expect } = require("chai");
const FollowedAgentService = require('../src/services/followed-agent-service');
const {testAgents, testBrokerages, testUsers, testNotes, testFollowedAgents} = require('./test-vars');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');

describe(`Followed Agent service object`, () => {
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
        beforeEach(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.insertUserData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
            .then(() => dbTableTransactions.insertNoteData(db))
            .then(() => dbTableTransactions.insertFollowedAgents(db))
        });

        it(`getFollowedAgents() resolves all followed agents from the 'followed_agents' table`, () => {
            return FollowedAgentService.getFollowedAgents(db)
                .then(actual => {
                    expect(actual).to.eql(testFollowedAgents);
                });
        });

        it(`getById() resolves all followed agents by username_id from the 'followed_agents' table`, () => {
            const thirdId = 3;
            const thirdTestUserFollowedAgents = [
                {
                    agent_id: 3,
                    username_id: 3
                },
                {
                    agent_id: 2,
                    username_id: 3
                }
            ]

            return FollowedAgentService.getByUsernameId(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql(thirdTestUserFollowedAgents)
                })
        })

        it(`deleteFollowedAgent() removes a followed agent by username and agent id from the 'followed_agents' table`, () => {
            const filter = {
                username_id: 3,
                agent_id: 2
            };
            const { username_id, agent_id } = filter;

            return FollowedAgentService.deleteFollowedAgent(db, username_id, agent_id)
                .then(() => FollowedAgentService.getFollowedAgents(db))
                .then(allFollowedAgents => {
                    debugger;
                    const expected = testFollowedAgents.filter(a => {
                        for (let key in filter) {
                            if (a[key] === undefined || a[key] != filter[key])
                                return true;
                        }
                        return false;
                    })
                    expect(allFollowedAgents).to.eql(expected)
                })
        })
    });

    context(`Given 'followed_agents' has no data`, () => {
        // insert necessary data for db table requirements
        beforeEach(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.insertUserData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
        });

        it(`getFollowedAgents() resolves an empty array`, () => {
            return FollowedAgentService.getFollowedAgents(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });

        it(`insertFollowedAgent() inserts a followed agent and resolves with the new note with an object`, () => {
            const newFollowedAgent = {
                agent_id: 3,
                username_id: 1
            }

            return FollowedAgentService.insertFollowedAgent(db, newFollowedAgent)
                .then(actual => {
                    expect(actual).to.eql({
                        agent_id: newFollowedAgent.agent_id,
                        username_id: newFollowedAgent.username_id
                    })
                })
        })
    });
});