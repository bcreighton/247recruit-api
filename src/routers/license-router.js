const express = require('express');
const licenseData = require('../../data/agentLicenseData.json');

const licenseRouter = express.Router();

handleGetLicenseData = (req, res) => {
    const { search = '', sort } = req.query;

    if (sort) {
        if (!['name'].includes(sort)) {
        return res
            .status(400)
            .json({error: {messsage: 'Sort must be name.'}});
        }
    }

    let results = licenseData
        .filter( licensee => 
            licensee
                .licenseeName
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    if (sort) {
        results.sort((a, b) => {
        
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
        })
    }

    if (results.length === 0) res.status(400).json({error: {messsage: `There are no agents matching this search criteria, please try again.`}})
    res.json(results)
}

licenseRouter
    .route('/api/licenseData')
    .get(handleGetLicenseData);

module.exports = licenseRouter;