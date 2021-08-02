const express = require('express');
const mlsData = require('../../data/agentMlsData.json')

const mlsRouter = express.Router();

handleGetMlsData = (req, res) => {
    const { search = '', sort } = req.query;

    if (sort) {
        if(!['name', 'transSideUnits', 'vol', 'exp'].includes(sort)) {
        return res
            .status(400)
            .json({error: {message: 'Sort must be name, transSideUnits, vol or exp.'}})
        }
    }

    let results = mlsData
        .filter( agent =>
            agent
            .name
            .toLowerCase()
            .includes(search.toLowerCase())
        );

    if (sort) {
        if (sort === 'transSideUnits') {
        results.sort((a, b) => {
            return parseInt(a[sort]) < parseInt(b[sort]) ? 1 : parseInt(a[sort]) > parseInt(b[sort]) ? -1 : 0
        })
        } else {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
        })
        }
    }

    res.status(200).json(results)
}

mlsRouter
    .route('/api/mlsData')
    .get(handleGetMlsData);

module.exports = mlsRouter;
