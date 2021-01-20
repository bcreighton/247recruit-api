const express = require('express');

const AgentService = require('../services/agent-service');
const agentRouter = express.Router();

agentRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        AgentService.getAgents(knexInstance)
            .then(agents => {
                res.json(agents)
            })
            .catch(next)
    });

agentRouter
    .route('/:id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        const { id } = req.params;
        
        AgentService.getById(knexInstance, id)
            .then(agent => {
                res.json(agent)
            })
            .catch(next)
    });

module.exports = agentRouter;