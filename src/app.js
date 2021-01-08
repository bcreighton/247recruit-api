require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const licenseData = require('../data/agentLicenseData.json')
const mlsData = require('../data/agentMlsData.json')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken = (req, res, next) => {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({
      error: 'Unauthorized request'
    })
  }
  next()
})

handleGetLicenseData = (req, res) => {
  const { search = '', sort } = req.query;

  if (sort) {
    if (!['name'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be name, transSideUnits.');
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
      debugger;
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
    })
  }
  res.json(results)
}

handleGetMlsData = (req, res) => {
  const { search = '', sort } = req.query;

  if (sort) {
    if(!['name', 'transSideUnits', 'vol', 'exp'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be name, transSideUnits, vol or exp.')
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

  res.json(results)
}

app.get('/api/licenseData', handleGetLicenseData)
app.get('/api/mlsData', handleGetMlsData)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})


module.exports = app