const express = require('express');
const xss = require('xss');
const BrokerageService = require('../services/brokerage-service');
const { requireAuth } = require('../middleware/basic-auth');

const brokerageRouter = express.Router();

brokerageRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        
        BrokerageService.getBrokerages(knexInstance)
            .then(brokerages => {
                res.json(brokerages)
            })
            .catch(next);
    })

brokerageRouter
    .route('/:id')
    .all(requireAuth)
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const { id } = req.params;

        BrokerageService.getById(knexInstance, id)
            .then(brokerage => {
                if (!brokerage) {
                    return res.status(404).json({
                        error: { message: 'Brokerage does not exist'}
                    })
                }
                return res.json({
                    id: brokerage.id,
                    brokerage_name: xss(brokerage.brokerage_name),
                    broker_id: brokerage.broker_id,
                    street: xss(brokerage.street),
                    city: xss(brokerage.city),
                    st: brokerage.st
                })
            })
            .catch(next)
    })

module.exports = brokerageRouter;