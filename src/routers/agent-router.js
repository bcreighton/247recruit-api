const express = require('express');
const xss = require('xss')
const AgentService = require('../services/agent-service');
const agentRouter = express.Router();

handleSearch = (req, res, next) => {
    const { search = '', sort } = req.query;
    const knexInstance = req.app.get('db');

    AgentService.getAgents(knexInstance)
            .then(agents => {
                if (sort) {
                    if (!['ascending', 'descending', 'volume', 'transactions'].includes(sort.toLowerCase())) {
                    return res
                        .status(400)
                        .send(`Sort must be 'Ascending', 'Descending', 'Volume' or 'Transactions'.`);
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
                    let sortOption = 
                        (sort.toLowerCase() === 'ascending' || sort.toLowerCase() === 'descending')
                            ? 'name'
                            : (sort.toLowerCase() === 'transactions')
                                ? 'tot_units'
                                : 'tot_vol'

                    results.sort((a, b) => {
                        return (sort.toLowerCase() === 'descending' || 'transactions')
                            ? b[sortOption] > a[sortOption] ? 1 : b[sortOption] < a[sortOption] ? -1 : 0
                            : (sort.toLowerCase() === 'volume')
                                ? parseFloat(b[sortOption]) > parseFloat(a[sortOption]) ? 1 : parseFloat(b[sortOption]) < parseFloat(a[sortOption]) ? -1 : 0
                                : a[sortOption] > b[sortOption] ? 1 : a[sortOption] < b[sortOption] ? -1 : 0
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