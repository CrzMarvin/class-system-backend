const express = require('express');

// const queries = require('./users.queries');
const Icon = require('./icons.model');

const router = express.Router();

const addURL = (icon) => ({
  ...icon,
  url: icon.url(),
});

router.get('/', async (req, res, next) => {
  try {
    const icons = await Icon
      .query()
      .select('id', 'name', 'type', 'base_url', 'resource')
      .where('deleted_at', null);
    const iconsWithUrl = icons.map(addURL);
    res.json(iconsWithUrl);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const icon = await Icon.query()
      .where('deleted_at', null)
      .select('id', 'name', 'type', 'base_url', 'resource')
      .andWhere('id', req.params.id)
      // .withGraphJoined('item_infos') // TODO: make this work
      .first();
    // items.item_infos = items.item_infos.map(
    //   e => ({ id: e.id, "user_id": e.user_id })
    // );
    if (!icon) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(addURL(icon));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
