const express = require('express');

const queries = require('./icons.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const icons = await queries.find();
  res.json(icons);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const icon = await queries.get(parseInt(id, 10) || 0);
    if (icon) {
      return res.json(icon);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
