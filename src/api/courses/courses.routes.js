const express = require('express');

const Course = require('./courses.model');
const Teacher = require('../teachers/teachers.model');
const Classroom = require('../classrooms/classrooms.model');
const ClassType = require('../class_types/class_types.model');
const { checkIdIsNumber } = require('../../lib/queryUtils');

const router = express.Router();

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
    const { teacher_id, classroom_id, type_id } = req.body;
    if (teacher_id !== undefined) {
      const teacher = await Teacher.query().findById(teacher_id);
      if (!teacher) {
        res.status(400);
        throw new Error('invalid teacher id');
      }
    }
    if (classroom_id !== undefined) {
      const classroom = await Classroom.query().findById(classroom_id);
      if (!classroom) {
        res.status(400);
        throw new Error('invalid classroom id');
      }
    }
    if (type_id !== undefined) {
      const classType = await ClassType.query().findById(type_id);
      if (!classType) {
        res.status(400);
        throw new Error('invalid classType id');
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
