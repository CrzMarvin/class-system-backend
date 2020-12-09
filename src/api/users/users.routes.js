const express = require('express');

// const queries = require('./users.queries');
const User = require('./users.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User
    .query()
    .select('id', 'email', 'name', 'created_at', 'updated_at')
    .where('deleted_at', null);
  res.json(users);
});

module.exports = router;
