const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();

let articles = require('../db/articles');

router.post('/', (req, res) => {
  let body = req.body;
  articles.post(body)
});

router.put('/:id', (req, res) => {
  let body = req.body;
  articles.put(body);
});



module.exports = router;