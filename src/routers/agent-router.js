const express = require('express');
const xss = require('xss')
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
                if (!agent) {
                    return res.status(404).json({
                        error: { message: `Agent doesn't exist`}
                    })
                }
                res.json({
                    id: agent.id,
                    agent_name: xss(agent.agent_name),
                    license_num: agent.license_num,
                    email: xss(agent.email),
                    phone: agent.phone,
                    license_exp: agent.license_exp,
                    sponsor_date: agent.sponsor_date,
                    list_units: agent.list_units,
                    list_vol: agent.list_vol,
                    sell_units: agent.sell_units,
                    sell_vol: agent.sell_vol,
                    tot_units: agent.tot_units,
                    tot_vol: agent.tot_vol,
                    brokerage: agent.brokerage
                })
            })
            .catch(next)
    });

module.exports = agentRouter;