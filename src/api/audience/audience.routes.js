const express = require('express');

const queries = require('./audience.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const audience = await queries.find();
  res.json(audience);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const audience = await queries.get(parseInt(id, 10) || 0);
    if (audience) {
      return res.json(audience);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
