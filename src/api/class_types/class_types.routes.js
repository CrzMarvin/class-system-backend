const express = require('express');
const { raw } = require('objection');

// const queries = require('./users.queries');
const ClassType = require('./class_types.model');
const Audience = require('../audience/audience.model');
const { checkIdIsNumber } = require('../../lib/queryUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  const classTypes = await ClassType
    .query()
    .where('class_type.deleted_at', null)
    .leftJoin('audience', 'class_type.audience_id', 'audience.id')
    .orderBy('class_type.id')
    .select(
      'class_type.id',
      'class_type.name',
      'class_type.color',
      'class_type.duration',
      'audience_id',
      raw('audience.name').as('audience_name'),
    );
  res.json(classTypes);
});

router.get('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const class_type = await ClassType.query()
      .where('class_type.deleted_at', null)
      .andWhere('class_type.id', req.params.id)
      .leftJoin('audience', 'class_type.audience_id', 'audience.id')
      .select(
        'class_type.id',
        'class_type.name',
        'class_type.color',
        'class_type.duration',
        'audience_id',
        raw('audience.name').as('audience_name'),
      )
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
