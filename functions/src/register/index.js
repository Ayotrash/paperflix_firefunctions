const express = require('express');
const Promise = require('bluebird');

const router = express.Router();

const { register } = require('./controller');

router.post('/', function(req, res) {
  Promise.try(() => register(req.body))
    .then(response => res.status(response.statusCode).json(response))
    .catch(error => res.status(response.statusCode).send(error))
})

module.exports = router;