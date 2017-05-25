'use strict';

var express = require('express')
var router = express.Router()
var User = require('../models/user')

// Helper function responsible for fetching all Tasks
function getAllUsers(req, res){
  User.find({}, function (err, users) {
    if (err) {
        console.error(`Error: ${error}`)
        res.send(`Error: ${error}`)
    } else {
        console.log(users)
        res.send(users)
    }
  })
}

function createUser(req, res) {
  User.create({username: req.body.username, email: req.body.email, password: req.body.password, history: req.body.history, score: 0}, function(err, user) {
    if (err) {
      console.log(req.body)
      // console.error(`Error: ${error}`)
      // res.send(`Error: ${error}`)
      console.log(err)
    }
    else {
      console.log(user)
      res.send(user)
    }
  })
}

router.route('/')
  .get(function (req, res) {
  /**
  * Respond with all tasks stored on database if 'GET' request to route
  * '/tasks'; the only time we send an error back to the client
  */
    getAllUsers(req, res)
  })

router.route('/newuser')
  .post(function(req,res) {
    createUser(req, res)
  })

module.exports = router
