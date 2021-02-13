const path = require('path');
const express = require('express');
const xss = require('xss');
const { v4: uuid } = require('uuid');
const NoteService = require('../services/note-service');

const noteRouter = express.Router();
const bodyParser = express.json();

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
    .post(bodyParser, (req, res, next) => {
        const { username_id, agent_id, title, content } = req.body;
        const newNote = { username_id, agent_id, title, content };

        if (!username_id) res.status(400).send('User Id is required');
        if (!agent_id) res.status(400).send('Agent Id is required');
        if (!title) res.status(400).send('Title is required');
        if (!content) res.status(400).send('Content is required');

        if (title.length < 3) res.status(400).send('Title must be at least 3 characters long');
        if (content.length < 5) res.status(400).send('Content must be at least 5 characters long');

        NoteService.insertNote(
            req.app.get('db'),
            newNote
        )
            .then(note => {
                res.status(201)
                .location(path.posix.join(req.originalUrl, `${note.id}`))
                .json(note)
            })
            .catch(next)
    });

noteRouter
    .route('/:id')
    .all((req, res, next) => {
        NoteService.getById(
            req.app.get('db'), 
            req.params.id
        )
        .then(note => {
            if (!note) {
                return res.status(404).json({
                    error: { message: `Note does not exist`}
                })
            }
            res.note = note;
            next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json({
            id: res.note.id,
            timestamp: new Date(res.note.timestamp),
            title: xss(res.note.title),
            content: xss(res.note.content),
            username_id: res.note.username_id,
            agent_id: res.note.agent_id
        })
    })
    .delete((req, res, next) => {
        NoteService.deleteNote(
            req.app.get('db'),
            req.params.id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    });

module.exports = noteRouter;
