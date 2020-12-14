const express = require('express');

// const queries = require('./users.queries');
const ClassType = require('./class_types.model');
const Audience = require('../audience/audience.model');
const { checkIdIsNumber } = require('../../lib/queryUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  const classTypes = await ClassType
    .query()
    .where('deleted_at', null)
    .select(
      'id',
      'name',
      'color',
      'duration',
      'duration',
      'audience_id',
    )
    .withGraphFetched('audience_info(getInfo)');
  res.json(classTypes);
});

router.get('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const class_type = await ClassType.query()
      .where('class_type.deleted_at', null)
      .andWhere('class_type.id', req.params.id)
      .limit(1)
      .select(
        'id',
        'name',
        'color',
        'duration',
        'duration',
        'audience_id',
      )
      .withGraphFetched('audience_info(getInfo)')
      .first();
    if (!class_type) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(class_type);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const { audience_id } = req.body;
    if (audience_id !== undefined) {
      const audience = await Audience.query().findById(audience_id);
      if (!audience) {
        res.status(400);
        throw new Error('invalid audience id');
      }
    }
    const class_type = await ClassType
      .query()
      .insert(req.body);
    res.json(class_type);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const { audience_id } = req.body;
    if (audience_id !== undefined) {
      const audience = await Audience.query().findById(audience_id);
      if (!audience) {
        res.status(400);
        throw new Error('invalid audience id');
      }
    }
    const class_type = await ClassType.query().patchAndFetchById(
      req.params.id,
      {
        ...req.body,
        updated_at: new Date().toISOString(),
      },
    );
    if (!class_type) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(class_type);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const class_type = await ClassType.query()
      .patchAndFetchById(
        req.params.id,
        {
          deleted_at: new Date().toISOString(),
        },
      );
    res.json(class_type);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
