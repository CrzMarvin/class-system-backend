const express = require('express');
const { raw } = require('objection');

// const queries = require('./users.queries');
const Classroom = require('./classrooms.model');
const Icon = require('../icons/icons.model');
const Audience = require('../audience/audience.model');
const { checkIdIsNumber } = require('../../lib/queryUtils');

const router = express.Router();

// const subQ = Icon.select('base_url', 'resource');

// router.get('/', async (req, res) => {
//   const classrooms = await Classroom
//     .query()
//     .where('deleted_at', null)
//     .select([
//       'classroom.id',
//       'classroom.name',
//       'classroom.icon_id',
//       'classroom.star',
//       Icon.query()
//         .where('icon_id', ref('icon.id'))
//         .select(raw('concat(base_url, resource)').as('url'))
//         .first()
//         .as('petCount'),
//     ]);
//     // .withGraphFetched('icon_info').select(1);
//   res.json(classrooms);
// });
router.get('/', async (req, res) => {
  const classrooms = await Classroom
    .query()
    .where('classroom.deleted_at', null)
    .leftJoin('icon', 'classroom.icon_id', 'icon.id')
    .leftJoin('audience', 'classroom.audience_id', 'audience.id')
    .orderBy('classroom.id')
    .select(
      'classroom.id',
      'classroom.name',
      'icon_id',
      'audience_id',
      raw('concat(base_url, resource)').as('icon_url'),
      raw('audience.name').as('audience_name'),
    );
  res.json(classrooms);
});

router.get('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const classroom = await Classroom.query()
      .where('classroom.deleted_at', null)
      .andWhere('classroom.id', req.params.id)
      .leftJoin('icon', 'classroom.icon_id', 'icon.id')
      .leftJoin('audience', 'classroom.audience_id', 'audience.id')
      .select(
        'classroom.id',
        'classroom.name',
        'icon_id',
        'audience_id',
        raw('concat(base_url, resource)').as('icon_url'),
        raw('audience.name').as('audience_name'),
      )
      .first();
    if (!classroom) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(classroom);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const classroom = await Classroom
      .query()
      .insert(req.body);
    res.json(classroom);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const { icon_id, audience_id } = req.body;
    if (icon_id !== undefined) {
      const icon = await Icon.query().findById(icon_id);
      if (!icon) {
        res.status(400);
        throw new Error('invalid icon id');
      }
    }
    if (audience_id !== undefined) {
      const audience = await Audience.query().findById(audience_id);
      if (!audience) {
        res.status(400);
        throw new Error('invalid audience id');
      }
    }
    const classroom = await Classroom.query().patchAndFetchById(
      req.params.id,
      {
        ...req.body,
        updated_at: new Date().toISOString(),
      },
    );
    if (!classroom) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(classroom);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const classroom = await Classroom.query()
      .patchAndFetchById(
        req.params.id,
        {
          deleted_at: new Date().toISOString(),
        },
      );
    res.json(classroom);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
