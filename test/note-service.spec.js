const { expect } = require("chai");
const NoteService = require('../src/services/note-service');
const {testAgents, testBrokerages, testUsers, testNotes} = require('./fixtures');
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
        beforeEach(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.insertUserData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
            .then(() => dbTableTransactions.insertNoteData(db))
        });

        it(`getNotes() resolves all notes from the 'notes' table`, () => {
            return NoteService.getNotes(db)
                .then(actual => {
                    const notes = actual;
                    for(let i = 0; i < testNotes.length; i++) {
                        expect(notes[i].title).to.eql(testNotes[i].title);
                        expect(notes[i].content).to.eql(testNotes[i].content);
                        expect(notes[i].username_id).to.eql(testNotes[i].username_id);
                        expect(notes[i].agent_id).to.eql(testNotes[i].agent_id);
                        expect(notes[i]).to.have.property('id');
                        const expected = new Date().toLocaleString('en', { timeZone: 'UTC' });
                        const actual = new Date(notes[i].timestamp).toLocaleString();
                        expect(actual).to.eql(expected);
                    }
            })
        })

        it(`getById() resolves a note by id from the 'notes' table`, () => {
            const thirdId = 3;
            const thirdTestNote = testNotes[thirdId -1];

            return NoteService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        title: thirdTestNote.title,
                        content: thirdTestNote.content,
                        username_id: thirdTestNote.username_id,
                        agent_id: thirdTestNote.agent_id,
                        timestamp: new Date(actual.timestamp)
                    });
                })
        })

        it(`updateNote() updates a note from the 'notes' table`, () => {
            const idOfNoteToUpdate = 3;
            const newNoteData = {
                timestamp: new Date(),
                title: 'Updated Title',
                content: 'Updated content for this note...',
            }

            return NoteService.updateNote(db, idOfNoteToUpdate, newNoteData)
                .then(() => NoteService.getById(db, idOfNoteToUpdate))
                .then(note => {
                    expect(note).to.eql({
                        id: idOfNoteToUpdate,
                        username_id: note.username_id,
                        agent_id: note.agent_id,
                        ...newNoteData
                    })
                })
        })

        it(`deleteNote() removes a note by id from the 'notes' table`, () => {
            const noteId = 3;

            return NoteService.deleteNote(db, noteId)
                .then(() => NoteService.getNotes(db))
                .then(allNotes => {
                    const expectedNotes = testNotes.filter(n => n.id !== noteId);
                    for(let i = 0; i < expectedNotes.length; i++) {
                        expect(allNotes[i].title).to.eql(expectedNotes[i].title);
                        expect(allNotes[i].content).to.eql(expectedNotes[i].content);
                        expect(allNotes[i].username_id).to.eql(expectedNotes[i].username_id);
                        expect(allNotes[i].agent_id).to.eql(expectedNotes[i].agent_id);
                        expect(allNotes[i]).to.have.property('id');
                        const expected = new Date().toLocaleString('en', { timeZone: 'UTC' });
                        const actual = new Date(allNotes[i].timestamp).toLocaleString();
                        expect(actual).to.eql(expected);
                    }
                })
        })
    });

    context(`Given 'notes' has no data`, () => {

        beforeEach(() => {
            return dbTableTransactions.insertAgentData(db)
            .then(() => dbTableTransactions.insertBrokerageData(db))
            .then(() => dbTableTransactions.insertUserData(db))
            .then(() => dbTableTransactions.alterAgentsBrokerageFkey(db))
        })

        it(`getNotes() resolves an empty array`, () => {
            return NoteService.getNotes(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });

        it(`insertNote() inserts a note and resolves with the new note with an id`, () => {
            const newNote = {
                timestamp: new Date(`2021-01-01T00:00:00.000Z`),
                title: 'Test Note',
                content: 'Test note content block...',
                username_id: 1,
                agent_id: 3
            }

            return NoteService.insertNote(db, newNote)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        timestamp: newNote.timestamp,
                        title: newNote.title,
                        content: newNote.content,
                        username_id: newNote.username_id,
                        agent_id: newNote.agent_id
                    })
                })
        })
    });
});