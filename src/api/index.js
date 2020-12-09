const express = require('express');
const icons = require('./icons/icons.routes');
const audience = require('./audience/audience.routes');
const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const teachers = require('./teachers/teachers.routes');
// const classrooms = require('./classrooms/classrooms.routes');
// const class_type = require('./class_type/class_type.routes');
// const classes = require('./classes/classes.routes');
const project = require('../constants/project');

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
// router.use('/classrooms', classrooms);
// router.use('/class_type', class_type);
// router.use('/classes', classes);

module.exports = router;
