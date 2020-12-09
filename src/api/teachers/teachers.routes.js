const express = require('express');
const { ref, raw } = require('objection');

// const queries = require('./users.queries');
const Teacher = require('./teachers.model');
const Icon = require('../icons/icons.model');

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
    .join('icon', 'teacher.id', 'icon.id')
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
    res.json(teacher);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    [
      'street_address_1',
      'street_address_2',
      'city',
      'zipcode',
    ].forEach((prop) => {
      if (req.body[prop]) {
        req.body[prop] = req.body[prop].toString().toLowerCase().trim();
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

module.exports = router;
