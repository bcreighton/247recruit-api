require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const licenseData = require('../data/agentLicenseData.json')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/licenseData', (req, res) => {
  const { search = '', sort } = req.query;

  if (sort) {
    if (!['name'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one fo teh name, volume or transactions');
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
  res.json(results)
})

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