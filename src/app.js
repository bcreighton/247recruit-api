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

  if (results.length === 0) res.status(400).send(`There are no agents matching the search of '${search}', please try again.`)
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
    "email": "jj@jj.com",
    "followedAgents": [
      'ff6da226-530c-11eb-ae93-0242ac130002',
      '0795e77e-530d-11eb-ae93-0242ac130002',
      '107eb0f0-530d-11eb-ae93-0242ac130002'
    ]
  },
  {
    "id": "ce20079c-2326-4f17-8ac4-f617bfd28b7f",
    "username": "johnBlocton",
    "password": "veryg00dpassw0rd",
    "firstname": "Susie",
    "lastname": "Stalen",
    "email": "sue@sue.com",
    "followedAgents": [
      '9f1aa6c0-530d-11eb-ae93-0242ac130002',
      'a45e2b2a-530d-11eb-ae93-0242ac130002',
      'a91f7ed4-530d-11eb-ae93-0242ac130002'
    ]
  }
];

const notes =[
  {
    "id": "f79099ae-52fe-11eb-ae93-0242ac130002",
    "userId": "ce20079c-2326-4f17-8ac4-f617bfd28b7f",
    "agentId": "ff342108-52fe-11eb-ae93-0242ac130002",
    "title": "Note 1",
    "Content": "This is test note 1"
  },
  {
    "id": "fc52f8b0-52fe-11eb-ae93-0242ac130002",
    "userId": "3c8da4d5-1597-46e7-baa1-e402aed70d80",
    "agentId": "02c83d5e-52ff-11eb-ae93-0242ac130002",
    "title": "Note 2",
    "Content": "This is test note 2"
  },
]

app.get('/api/licenseData', handleGetLicenseData)
app.get('/api/mlsData', handleGetMlsData)

// USER ROUTES

app.get('/api/user', (req, res) => {
  res.json(users);
})

app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id == id);

  if (!user) res.status(400).send('User not found');

  res.json(user);
})

app.get('/api/user/:id/followedAgents', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id == id);
  if (!user) res.status(400).send('User not found');

  const agents = user.followedAgents;
  if (!agents) res.status(400).send('No followed agents available');

  res.json(agents);
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

  res.status(201).send('New user added!')
})

app.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;

  const i = users.findIndex(u => u.id === id );

  if (i === -1) res.status(404).send('User not found');

  users.splice(i, 1);

  res.status(204).end();
})

// NOTES ROUTES

app.get('/api/note', (req, res) => {
  res.json(notes);
})

app.get('/api/note/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.find(n => n.id == id)

  if (!note) res.status(400).send('No note found');

  res.json(note);
})

app.post('/api/note', (req, res) => {
  const { userId, agentId, title, content } = req.body;

  if (!userId) res.status(400).send('User Id is required');
  if (!agentId) res.status(400).send('Agent Id is required');
  if (!title) res.status(400).send('Title is required');
  if (!content) res.status(400).send('Content is required');

  if (title.length < 3) res.status(400).send('Title must be at least 3 characters long');
  if (content.length < 5) res.status(400).send('Content must be at least 5 characters long');

  const id = uuid();
  const newNote = {
    id,
    userId,
    agentId,
    title,
    content
  };

  notes.push(newNote);

  res.status(201).send('New note added!')

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