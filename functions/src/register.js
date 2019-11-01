const express = require('express');
const Promise = require('bluebird');

const router = express.Router();

router.get('/test', function(req, res) {
  res.send("Hello World");
})

module.exports = router;