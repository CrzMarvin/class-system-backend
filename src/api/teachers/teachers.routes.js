const express = require('express');
const { ref, raw } = require('objection');

// const queries = require('./users.queries');
const Teacher = require('./teachers.model');
const Icon = require('../icons/icons.model');
const { checkId } = require('../../lib/queryUtils');

const router = express.Router();

// const subQ = Icon.select('base_url', 'resource');

// router.get('/', async (req, res) => {
//   const teachers = await Teacher
//     .query()
//     .where('deleted_at', null)
//     .select([
//       'teacher.id',
//       'teacher.name',
//       'teacher.icon_id',
//       'teacher.star',
//       Icon.query()
//         .where('icon_id', ref('icon.id'))
//         .select(raw('concat(base_url, resource)').as('url'))
//         .first()
//         .as('petCount'),
//     ]);
//     // .withGraphFetched('icon_info').select(1);
//   res.json(teachers);
// });
router.get('/', async (req, res) => {
  const teachers = await Teacher
    .query()
    .where('teacher.deleted_at', null)
    .leftJoin('icon', 'teacher.icon_id', 'icon.id')
    .orderBy('teacher.id')
    .select(
      'teacher.id',
      'teacher.name',
      'gender',
      'icon_id',
      'star',
      raw('concat(base_url, resource)').as('url'),
    );
  res.json(teachers);
});

router.get('/:id', async (req, res, next) => {
  try {
    checkId(req.params.id, res);
    const teacher = await Teacher.query()
      .where('deleted_at', null)
      .andWhere('id', req.params.id)
      .select([
        'teacher.id',
        'teacher.name',
        'teacher.gender',
        'teacher.icon_id',
        'teacher.star',
        Icon.query()
          .where('icon_id', ref('icon.id'))
          .select(raw('concat(base_url, resource)').as('url'))
          .first()
          .as('url'),
      ])
      // .withGraphJoined('item_infos') // TODO: make this work
      .first();
    if (!teacher) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(teacher);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    [
      'gender',
    ].forEach((prop) => {
      if (req.body[prop]) {
        req.body[prop] = req.body[prop].toString().toUpperCase().trim();
      }
    });
    const address = await Teacher
      .query()
      .insert(req.body);
    res.json(address);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    checkId(req.params.id, res);
    const { icon_id } = req.body;
    if (icon_id !== undefined) {
      const icon = await Icon.query().findById(icon_id);
      if (!icon) {
        res.status(400);
        throw new Error('invalid icon id');
      }
    }
    const teacher = await Teacher.query().patchAndFetchById(
      req.params.id,
      {
        ...req.body,
        updated_at: new Date().toISOString(),
      },
    );
    if (!teacher) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(teacher);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    checkId(req.params.id, res);
    const teacher = await Teacher.query()
      .patchAndFetchById(
        req.params.id,
        {
          deleted_at: new Date().toISOString(),
        },
      );
    res.json(teacher);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
