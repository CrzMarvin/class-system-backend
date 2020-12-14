const express = require('express');
const { raw } = require('objection');

// const queries = require('./users.queries');
const Course = require('./courses.model');
const Icon = require('../icons/icons.model');
const Audience = require('../audience/audience.model');
const { checkIdIsNumber } = require('../../lib/queryUtils');
const tableNames = require("../../constants/tableNames");
const { limit } = require('../db');
const router = express.Router();

// const subQ = Icon.select('base_url', 'resource');

// router.get('/', async (req, res) => {
//   const courses = await Course
//     .query()
//     .where('deleted_at', null)
//     .select([
//       'course.id',
//       'course.name',
//       'course.icon_id',
//       'course.star',
//       Icon.query()
//         .where('icon_id', ref('icon.id'))
//         .select(raw('concat(base_url, resource)').as('url'))
//         .first()
//         .as('petCount'),
//     ]);
//     // .withGraphFetched('icon_info').select(1);
//   res.json(courses);
// });
router.get('/', async (req, res) => {
  const courses = await Course
    .query()
    .where('course.deleted_at', null)
    .leftJoin('classroom', 'course.classroom_id', 'classroom.id')
    .orderBy('course.id')
    .select(
      'course.id',
      'teacher_id',
      'classroom_id',
      'classroom.name as classroomName',
      'classroom.icon_id as classroomIconId',
      'classroom.audience_id',
      'type_id',
      'weekday_index',
      'start_time',
      'end_time',
    );
  res.json(courses);
});

router.get('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const course = await Course
      .query()
      .where('deleted_at', null)
      .andWhere('id', req.params.id)
      .limit(1)
      .select(
        'id',
        'weekday_index',
        'start_time',
        'end_time',
      )
      .withGraphFetched('class_type(getType)')
      // .withGraphFetched('teacher(getInfo).[icon_info.[base_url, resource]]')
      .withGraphFetched({
        teacher: {
          $modify: ['getInfo'],
          icon_info: {
            $modify: ['getIcon'],
          },
        },
      })
      .withGraphFetched({
        classroom: {
          $modify: ['getInfo'],
          icon_info: {
            $modify: ['getIcon'],
          },
        },
      })
      .first();
    if (!course) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const course = await Course
      .query()
      .insert(req.body);
    res.json(course);
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
    const course = await Course.query().patchAndFetchById(
      req.params.id,
      {
        ...req.body,
        updated_at: new Date().toISOString(),
      },
    );
    if (!course) {
      res.status(404);
      throw new Error('no content');
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    checkIdIsNumber(req.params.id, res);
    const course = await Course.query()
      .patchAndFetchById(
        req.params.id,
        {
          deleted_at: new Date().toISOString(),
        },
      );
    res.json(course);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
