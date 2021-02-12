const express = require('express');
const UserService = require('../services/user-service')
const FollowedAgentsService = require('../services/followed-agent-service')

const followedAgentRouter = express.Router();

followedAgentRouter
    .route('/:userId')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        const { userId } = req.params;
        

        UserService.getById(knexInstance, userId)
        .then(user => {
            
            if (!user) {
            return res.status(404).json({
                error: {message: `User does not exist`}
            })
            }
            
            FollowedAgentsService.getByUsernameId(knexInstance, userId)
            .then(agents => {
                return res.json(agents)
            })
            .catch(next)
        })
        .catch(next)
})

module.exports = followedAgentRouter;