const express = require('express');
const UserService = require('../services/user-service')
const FollowedAgentsService = require('../services/followed-agent-service');
const FollowedAgentService = require('../services/followed-agent-service');
const { requireAuth } = require('../middleware/basic-auth');

const followedAgentRouter = express.Router();
const bodyParser = express.json();

followedAgentRouter
    .route('/:userId')
    .all(requireAuth, (req, res, next) => {
        UserService.getById(
            req.app.get('db'),
            req.params.userId
        )
        .then(user => {
            
            if (!user) {
            return res.status(404).json({
                error: {message: `User does not exist`}
            })
            }
            res.user = user;
            next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
        FollowedAgentsService.getByUsernameId(
            req.app.get('db'), 
            req.params.userId
        )
            .then(agents => {
                return res.json(agents)
            })
            .catch(next)
        
    })
    .post(bodyParser, (req, res, next) => {
        const {agent_id, username_id } = req.body;
        const newFollowedAgent = {agent_id, username_id}

        if (!username_id) res.status(400).send('User Id is required');
        if (!agent_id) res.status(400).send('Agent Id is required');

        

        FollowedAgentsService.insertFollowedAgent(
            req.app.get('db'),
            newFollowedAgent
        )
            .then(followedAgent => {
                const {username_id, agent_id } = followedAgent;
                FollowedAgentService.getById(
                    req.app.get('db'),
                    username_id,
                    agent_id
                ) .then(agent => {
                    res.status(201)
                        .json(agent[0])
                })
                .catch(next)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        FollowedAgentsService.deleteFollowedAgent(
            req.app.get('db'),
            req.params.userId,
            req.body.agent_id
        )
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = followedAgentRouter;