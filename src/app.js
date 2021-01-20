require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const mlsRouter = require('./routers/mls-router')
const userRouter = require('./routers/user-router')
const licenseRouter = require('./routers/license-router')
const agentRouter = require('./routers/agent-router')
const noteRouter = require('./routers/note-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(express.json())
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

app.use(mlsRouter);
app.use(licenseRouter);
app.use(userRouter);
app.use('/api/agent', agentRouter);
app.use(noteRouter);

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