var express = require('express');
var router = express.Router();
var db = require('../src/db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const [[ping]] = await db.query('SELECT 1 AS ok');
    res.render('index', { title: 'Express + MySQL', db_ok: ping.ok === 1 });
  } catch (err) {
    res.render('index', { title: 'Express + MySQL', db_ok: false, error: err.message });
  }
});

module.exports = router;
