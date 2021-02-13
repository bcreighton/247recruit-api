const path = require('path');
const express = require('express');
const xss = require('xss');
const { v4: uuid } = require('uuid');
const UserService = require('../services/user-service')

const userRouter = express.Router();
const bodyParser = express.json();

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
    .post(bodyParser, (req, res, next) => {
        const {username, password, first_name, last_name, email, phone, brokerage} = req.body;
        const newUser = { username, password, first_name, last_name, email, phone, brokerage}
        

        if (!username) res.status(400).send('Username is required');
        if (!password) res.status(400).send('Password is required')
        if (!first_name || !last_name) res.status(400).send('Your first and last name are required');
        if (!email) res.status(400).send('A valid email address is required');

        // if (username.length < 4 || username.length > 20) res.status(400).send('Usernname must be between 4 and 20 characters long');
        // if (password.length < 8 || password.length > 36) res.status(400).send('Passoword must be between 8 and 36 characters long.');
        // if (first_name.length < 2 || last_name.length < 2) res.status(400).send('Your first and last names must be longer than 2 characters long')
        // if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) res.status(400).send('Password must contain at least one digit');
        // if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) res.status(400).send('A valid email address is required');

        UserService.insertUser(
          req.app.get('db'),
          newUser
        )
          .then(user => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `${user.id}`))
              .json(user)
          })
          .catch(next)
    })

userRouter
    .route('/:id')
    .all((req, res, next) => {
      UserService.getById(
        req.app.get('db'),
        req.params.id
      )
          .then(user => {
            if (!user) {
              return res.status(404).json({
                error: {message: `User does not exist`}
              })
            }
            res.user = user; //save the user for the next middleware
            next()
          })
          .catch(next)
    })
    .get((req, res, next) => {
      res.json({
        id: res.user.id,
        username: xss(res.user.username),
        password: xss(res.user.password),
        first_name: res.user.first_name,
        last_name: res.user.last_name,
        email: res.user.email,
        phone: res.user.phone,
        brokerage: res.user.brokerage
      })
    })
    .delete((req, res, next) => {
      UserService.deleteUser(
        req.app.get('db'),
        req.params.id
      )
        .then(() => {
          res.status(204).end()
        })
        .catch(next)
    })
    .patch(bodyParser, (req, res, next) => {
      const {email, password, phone, brokerage} = req.body;
      const userToUpdate = {email, password, phone, brokerage}

      const numberOfValues = Object.values(userToUpdate).filter(Boolean).length

      if (numberOfValues === 0 ) {
        return res.status(400).json({
          error: {
            message: `Request body must contain either 'password', 'email', 'phone', or 'brokerage'`
          }
        })
      }

      UserService.updateUser(
        req.app.get('db'),
        req.params.id,
        userToUpdate,
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })

module.exports = userRouter;