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

// agent array to test verification of agents to be followed
const tempAgents = [
  {
    "id":"ff6da226-530c-11eb-ae93-0242ac130002",
    "name":"Karen Chappell [SALE] ",
    "officeName":"Camillo Properties",
    "licenseDate":"2/27/2013",
    "licenseExp":"2/28/2021",
    "phone":"713-539-3790",
    "listingSideUnits":"1514",
    "listingSideVolume":"$2,390,120",
    "sellingSideUnits":"0",
    "sellingSideVolume":"$0",
    "transSideUnits":"1514",
    "transSideVolume":"$2,390,120"
  },
  {
    "id":"0795e77e-530d-11eb-ae93-0242ac130002",
    "name":"Richard Hale [BRK] ",
    "officeName":"Perry Development Management",
    "licenseDate":"6/16/1988",
    "licenseExp":"8/31/2021",
    "phone":"&nbsp;",
    "listingSideUnits":"1473",
    "listingSideVolume":"$577,086,069",
    "sellingSideUnits":"105",
    "sellingSideVolume":"$39,703,930",
    "transSideUnits":"1578",
    "transSideVolume":"$616,789,999"
  },
  {
    "id":"a91f7ed4-530d-11eb-ae93-0242ac130002",
    "name":"Lance Loken [SALE] ",
    "officeName":"Keller Williams Platinum",
    "licenseDate":"9/17/2010",
    "licenseExp":"9/30/2021",
    "phone":"&nbsp;",
    "listingSideUnits":"1189",
    "listingSideVolume":"$303,238,683",
    "sellingSideUnits":"212",
    "sellingSideVolume":"$59,241,233",
    "transSideUnits":"1401",
    "transSideVolume":"$362,479,916"
  },
  {
    "id":"d2e7bda6-b543-40f9-8982-acd1fdb9b712",
    "name":"Jack Lipar [SALE] ",
    "officeName":"LGI Homes",
    "licenseDate":"11/13/2008",
    "licenseExp":"11/30/2020",
    "phone":"281-923-5166",
    "listingSideUnits":"902",
    "listingSideVolume":"$204,499,410",
    "sellingSideUnits":"0",
    "sellingSideVolume":"$0",
    "transSideUnits":"902",
    "transSideVolume":"$204,499,410"
  },
  {
    "id":"d2e7bda6-b543-40f9-8982-acd1fdb9b712",
    "name":"Michael Dickerson [SALE] ",
    "officeName":"Progress Residential Property",
    "licenseDate":"5/6/2009",
    "licenseExp":"5/31/2021",
    "phone":"800-218-4796",
    "listingSideUnits":"758",
    "listingSideVolume":"$1,256,607",
    "sellingSideUnits":"555",
    "sellingSideVolume":"$921,376",
    "transSideUnits":"1313",
    "transSideVolume":"$2,177,983"
  },
  {
    "id":"d2e7bda6-b543-40f9-8982-acd1fdb9b712",
    "name":"Jared Turner [SALE] ",
    "officeName":"Turner Mangum,LLC",
    "licenseDate":"3/5/2013",
    "licenseExp":"3/31/2021",
    "phone":"832-421-0077",
    "listingSideUnits":"729",
    "listingSideVolume":"$208,841,312",
    "sellingSideUnits":"136",
    "sellingSideVolume":"$37,831,956",
    "transSideUnits":"865",
    "transSideVolume":"$246,673,268"
  },
]

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

// Combine agent data into one array
// Find matching objects

app.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;

  const i = users.findIndex(u => u.id === id );

  if (i === -1) res.status(404).send('User not found');

  users.splice(i, 1);

  res.status(204).end();
})

// AGENT ROUTES
app.get('/api/agent', (req, res) => {
  res.json(tempAgents);
})

app.get('/api/agent/:id', (req, res) => {
  const { id } = req.params;
  const agent = tempAgents.find(a => a.id == id);

  if (!agent) res.status(400).send('Agent not found');

  res.json(agent);
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