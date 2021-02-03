const express = require('express');
const xss = require('xss');
const { v4: uuid } = require('uuid');
const UserService = require('../services/user-service')
const FollowedAgentsService = require('../services/followed-agent-service')

const userRouter = express.Router();
const bodyParser = express.json();

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

userRouter
    .route('/')
    .get((req, res, next) => {
      const knexInstance = req.app.get('db');

      UserService.getUsers(knexInstance)
        .then(users => {
          res.json(users);
        })
        .catch(next)
    })
    .post(bodyParser, (req, res) => {
        const {username, pass, firstname, lastname, email} = req.body;

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

userRouter
    .route('/:id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        const { id } = req.params;

        UserService.getById(knexInstance, id)
          .then(user => {
            if (!user) {
              return res.status(404).json({
                error: {message: `User does not exist`}
              })
            }
            res.json({
              id: user.id,
              username: xss(user.username),
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              phone: user.phone,
              brokerage: user.brokerage
            })
          })
          .catch(next)
    })
    .delete((req, res) => {
      const { id } = req.params;

      const i = users.findIndex(u => u.id === id );
    
      if (i === -1) res.status(404).send('User not found');
    
      users.splice(i, 1);
    
      res.status(204).end();
    })

module.exports = userRouter;