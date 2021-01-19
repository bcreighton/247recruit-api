const { expect } = require("chai");
const NoteService = require('../src/services/note-service');
const {testAgents, testBrokerages, testUsers, testNotes} = require('./test-vars');
const dbTableTransactions = require('./db-table-transactions');
const knex = require('knex');

describe(`Note service object`, () => {
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

    context(`Given 'notes' has data`, () => {
        // insert necessary data for db table requirements
        before(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.insertUserData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
            .then(() => dbTableTransactions.insertNoteData(db))
        });

        it(`getNotes() resolves all notes from the 'notes' table`, () => {
            testAgents.map((a, n = 1) => {
                let kv = {brokerage: parseInt(`${n+1}`)};
                let obj = {...a, ...kv};
                return obj;
            }) 
            return NoteService.getNotes(db)
                .then(actual => {
                    expect(actual).to.eql(testNotes);
                });
        });
    });

    context(`Given 'notes' has no data`, () => {
        it(`getNotes() resolves an empty array`, () => {
            return NoteService.getNotes(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });
    });
});