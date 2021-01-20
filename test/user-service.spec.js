const { expect } = require("chai");
const UserService = require('../src/services/user-service');
const {testAgents, testBrokerages, testUsers} = require('./fixtures');
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

    context(`Given 'users' has data`, () => {
        // insert necessary data for brokerage table requirements
        beforeEach(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.insertUserData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
        });

        it(`getUsers() resolves all users from the 'users' table`, () => {
            return UserService.getUsers(db)
                .then(actual => {
                    expect(actual).to.eql(testUsers);
                });
        });

        it(`getById() resolves a user by id from the 'users' table`, () => {
            const thirdId = 3;
            const thirdTestUser = testUsers[thirdId -1];

            return UserService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        username: thirdTestUser.username,
                        first_name: thirdTestUser.first_name,
                        last_name: thirdTestUser.last_name,
                        email: thirdTestUser.email,
                        phone: thirdTestUser.phone,
                        brokerage: thirdTestUser.brokerage
                    })
                })
        })

        it(`updateUser() updates a user from the 'users' table`, () => {
            const idOfUserToUpdate = 3;
            const newUserData = {
                email: "srogan250@springer.com",
                phone: "927-708-4768",
                brokerage: 3
            }

            return UserService.updateUser(db, idOfUserToUpdate, newUserData)
                .then(() => UserService.getById(db, idOfUserToUpdate))
                .then(user => {
                    expect(user).to.eql({
                        id: idOfUserToUpdate,
                        username: user.username,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        ...newUserData
                    })
                })
        })

        it(`deleteUser() removes a user by id from the 'users' table`, () => {
            const userId = 3;

            return UserService.deleteUser(db, userId)
                .then(() => UserService.getUsers(db))
                .then(allUsers => {
                    const expected = testUsers.filter(u => u.id !== userId);
                    expect(allUsers).to.eql(expected)
                })
        })
    });

    context(`Given 'users' has no data`, () => {
        // insert necessary data for brokerage table requirements
        beforeEach(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
        })

        it(`getUsers() resolves an empty array`, () => {
            return UserService.getUsers(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });

        it(`insertUser() inserts a new user and resolves the new user with an id`, () => {
            const newUser = {
                username: 'Test User',
                first_name: 'Test',
                last_name: 'User',
                email: 'testuser@testuser.com',
                phone: '303-111-1111',
                brokerage: 2
            };

            return UserService.insertUser(db, newUser)
                .then(actual => {
                    expect(actual).that.eql({
                        id: 1,
                        username: newUser.username,
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        email: newUser.email,
                        phone: newUser.phone,
                        brokerage: newUser.brokerage
                    })
                })
        })
    });
});