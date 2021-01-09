require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { v4: uuid } = require('uuid');
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
        .send('Sort must be name.');
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

const users =[
  {
    "id": "3c8da4d5-1597-46e7-baa1-e402aed70d80",
    "username": "sallyStudent",
    "password": "c00d1ng1sc00l",
    "firstname": "Joe",
    "lastname": "Johnson",
    "email": "jj@jj.com"
  },
  {
    "id": "ce20079c-2326-4f17-8ac4-f617bfd28b7f",
    "username": "johnBlocton",
    "password": "veryg00dpassw0rd",
    "firstname": "Susie",
    "lastname": "Stalen",
    "email": "sue@sue.com"
  }
];

app.get('/api/licenseData', handleGetLicenseData)
app.get('/api/mlsData', handleGetMlsData)

app.get('/api/user', (req, res) => {
  res.json(users);
})

app.get('/api/user/:userId', (req, res) => {
  console.log('ok')
})

app.post('/api/user', (req, res) => {
  const {username, pass, firstname, lastname, email } = req.body;

  if (!username) res.status(400).send('Username is required');
  if (!pass) res.status(400).send('Password is required')
  if (!firstname || !lastname) res.status(400).send('Your first and last name are required');
  if (!email) res.status(400).send('A valid email address is required');

  if (username.length < 4 || username.length > 20) res.status(400).send('Usernname must be between 4 and 20 characters long');
  if (pass.length < 8 || pass.length > 36) res.status(400).send('Passoword must be between 8 and 36 characters long.');
  if (firstname.length < 2 || lastname.length < 2) res.status(400).send('Your first and last names must be longer than 2 characters long')
  if (!pass.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) res.status(400).send('Password must contain at least one digit');
  if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) res.status(400).send('A valid email address is required');

  const id = uuid();
  const newUser = {
    id,
    username,
    pass,
    firstname,
    lastname,
    email
  };

  users.push(newUser);

  res.send('New user added!')
})

app.delete('/api/user/:userId', (req, res) => {
  const { userId } = req.params;

  const i = users.findIndex(u => u.id === userId );

  if (i === -1) res.status(404).send('User not found');

  users.splice(i, 1);

  res.status(204).end();
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