const express = require('express');
const UserService = require('../services/user-service')
const FollowedAgentsService = require('../services/followed-agent-service')

const followedAgentRouter = express.Router();

followedAgentRouter
    .route('/:userId')
    .all((req, res, next) => {
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
        debugger;
        FollowedAgentsService.getByUsernameId(
            req.app.get('db'), 
            req.params.userId
        )
            .then(agents => {
                return res.json(agents)
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