var express = require('express');
var router = express.Router();
var db = require('../src/db');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const [rows] = await db.query('SELECT id, name, email, created_at FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
