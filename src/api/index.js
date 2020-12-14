const express = require('express');
const icons = require('./icons/icons.routes');
const audience = require('./audience/audience.routes');
const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const teachers = require('./teachers/teachers.routes');
const classrooms = require('./classrooms/classrooms.routes');
const class_types = require('./class_types/class_types.routes');
const courses = require('./courses/courses.routes');
const project = require('../constants/project');
// const { authenticateJWT } = require('../lib/jwt');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/icons', icons);
router.use('/audience', audience);
router.use('/auth', auth);
router.use('/users', users);
router.use('/teachers', teachers);
router.use('/classrooms', classrooms);
// router.use('/classrooms', authenticateJWT, classrooms);
router.use('/class_types', class_types);
router.use('/courses', courses);

module.exports = router;
