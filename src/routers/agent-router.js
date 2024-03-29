const express = require('express');
const xss = require('xss')
const AgentService = require('../services/agent-service');
const agentRouter = express.Router();

handleSearch = (req, res, next) => {
    const { name = '', brokerage = '', sort } = req.query;
    const knexInstance = req.app.get('db');

    AgentService.getAgents(knexInstance)
            .then(agents => {
                if (sort) {
                    if (!['ascending', 'descending', 'volume', 'transactions'].includes(sort.toLowerCase())) {
                    return res
                        .status(400)
                        .json({error:{message: `Sort must be 'Ascending', 'Descending', 'Volume' or 'Transactions'.`}});
                    }
                }
            
                let results = (!name)
                    ? agents.filter( agent => 
                        agent
                            .brokerage
                            .toLowerCase()
                            .includes(brokerage.toLowerCase())
                        )
                    : (!brokerage)
                        ? agents.filter( agent =>
                                agent
                                    .name
                                    .toLowerCase()
                                    .includes(name.toLowerCase())
                            )
                        : agents.filter( agent => 
                            agent
                                .name
                                .toLowerCase()
                                .includes(name.toLowerCase())
                            ).filter(
                                agent =>
                                agent
                                    .brokerage
                                    .toLowerCase()
                                    .includes(brokerage.toLowerCase())
                            )
            
                if (sort) {
                    let sortOption = 
                        (sort.toLowerCase() === 'ascending' || sort.toLowerCase() === 'descending')
                            ? 'name'
                            : (sort.toLowerCase() === 'transactions')
                                ? 'trans'
                                : 'vol'

                    results.sort((a, b) => {
                        return (sort.toLowerCase() === 'ascending')
                            ? a[sortOption] > b[sortOption] ? 1 : a[sortOption] < b[sortOption] ? -1 : 0
                            : (sort.toLowerCase() === 'descending' || 'transactions')
                                ? b[sortOption] > a[sortOption] ? 1 : b[sortOption] < a[sortOption] ? -1 : 0
                                : (sort.toLowerCase() === 'volume')
                                    && parseFloat(b[sortOption]) > parseFloat(a[sortOption]) ? 1 : parseFloat(b[sortOption]) < parseFloat(a[sortOption]) ? -1 : 0
                    })
                }
            
                if (results.length === 0) 
                    res
                        .status(400)
                        .json({error: { message: `There are no agents matching this search criteria, please try again.`}})
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
                    trans: agent.trans,
                    vol: agent.vol,
                    brokerage: agent.brokerage,
                    brokerage_street: agent.brokerage_street,
                    brokerage_city: agent.brokerage_city,
                    brokerage_state: agent.brokerage_state,
                })
            })
            .catch(next)
    });

module.exports = agentRouter;