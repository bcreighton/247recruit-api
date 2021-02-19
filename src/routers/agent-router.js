const express = require('express');
const xss = require('xss')
const AgentService = require('../services/agent-service');
const agentRouter = express.Router();

handleSearch = (req, res, next) => {
    const { search = '', sort } = req.query;
    const knexInstance = req.app.get('db');
    
    // "name": "Blanca Klasen",
    //     "license_num": 392389,
    //     "email": "bklasene@tmall.com",
    //     "phone": "585-779-3232",
    //     "license_exp": "2023-04-18T06:00:00.000Z",
    //     "sponsor_date": "2018-03-15T06:00:00.000Z",
    //     "list_units": 580,
    //     "list_vol": "767722154.35",
    //     "sell_units": 282,
    //     "sell_vol": "41387827.60",
    //     "tot_units": 1063,
    //     "tot_vol": "101539426.19",
    //     "brokerage": 7

    AgentService.getAgents(knexInstance)
            .then(agents => {
                if (sort) {
                    if (!['name'].includes(sort)) {
                    return res
                        .status(400)
                        .send('Sort must be name.');
                    }
                }
            
                let results = agents
                    .filter( agent => 
                        agent
                            .name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    );
            
                if (sort) {
                    results.sort((a, b) => {
                    debugger;
                    return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
                    })
                }
            
                if (results.length === 0) 
                    res
                        .status(400)
                        .send(`There are no agents matching the search of '${search}', please try again.`)
                
                res.json(results)
            })
            .catch(next)
}

agentRouter
    .route('/')
    .get(handleSearch);

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
                    name: xss(agent.name),
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