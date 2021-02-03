const express = require('express');
const xss = require('xss');
const { v4: uuid } = require('uuid');
const NoteService = require('../services/note-service');

const noteRouter = express.Router();
const bodyParser = express.json();

const notes =[
    {
        "id": "f79099ae-52fe-11eb-ae93-0242ac130002",
        "userId": "ce20079c-2326-4f17-8ac4-f617bfd28b7f",
        "agentId": "ff342108-52fe-11eb-ae93-0242ac130002",
        "title": "Note 1",
        "Content": "This is test note 1"
    },
    {
        "id": "fc52f8b0-52fe-11eb-ae93-0242ac130002",
        "userId": "3c8da4d5-1597-46e7-baa1-e402aed70d80",
        "agentId": "02c83d5e-52ff-11eb-ae93-0242ac130002",
        "title": "Note 2",
        "Content": "This is test note 2"
    },
]

noteRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        NoteService.getNotes(knexInstance)
            .then(notes => {
                res.json(notes)
            })
            .catch(next);
    })
    .post(bodyParser, (req, res) => {
        const { userId, agentId, title, content } = req.body;

        if (!userId) res.status(400).send('User Id is required');
        if (!agentId) res.status(400).send('Agent Id is required');
        if (!title) res.status(400).send('Title is required');
        if (!content) res.status(400).send('Content is required');

        if (title.length < 3) res.status(400).send('Title must be at least 3 characters long');
        if (content.length < 5) res.status(400).send('Content must be at least 5 characters long');

        const id = uuid();
        const newNote = {
            id,
            userId,
            agentId,
            title,
            content
        };

        notes.push(newNote);

        res.status(201).send('New note added!');
    });

noteRouter
    .route('/:id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        const { id } = req.params;

        NoteService.getById(knexInstance, id)
            .then(note => {
                if (!note) {
                    return res.status(404).json({
                        error: { message: `Note does not exist`}
                    })
                }
                return res.json({
                    id: note.id,
                    timestamp: note.timestamp,
                    title: xss(note.title),
                    content: xss(note.content),
                    username_id: note.username_id,
                    agent_id: note.agent_id
                })
            })
            .catch(next)
    })
    .delete((req, res) => {
        const { id } = req.params;
        const i = notes.findIndex(n => n.id === id);

        if (i === -1) res.status(404).send('Invalid data');

        notes.splice(i, 1);

        res.status(204).end();
    });

module.exports = noteRouter;
