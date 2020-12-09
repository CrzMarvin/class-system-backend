const express = require('express');
const yup = require('yup');
// TODO: extract to general hashing util
const bcrypt = require('bcrypt');
const { sign } = require('../../lib/jwt');
const User = require('../users/users.model');

const router = express.Router();

const schema = yup.object().shape({
  name: yup.string().trim().min(2),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(8)
    .max(100)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[Za-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
});

const errorMessages = {
  invalidLogin: 'Invalid login.',
  emailInUse: 'Email in use.',
};

router.post('/signup', async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const createdUser = { email, password, name };
    try {
      await schema.validate(createdUser, { abortEarly: false });
    } catch (error) {
      res.status(400);
      throw error;
    }
    const existingUser = await User.query().where({ email }).first();
    if (existingUser) {
      const error = new Error(errorMessages.emailInUse);
      res.status(403);
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const insertedUser = await User.query().insert({
      name,
      email,
      password: hashedPassword,
    });
    delete insertedUser.password;
    const payload = {
      id: insertedUser.id,
      name,
      email,
    };
    const access_token = await sign(payload);
    res.json({ user: payload, access_token });
  } catch (error) {
    next(error);
  }
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    try {
      await schema.validate({
        name: 'name',
        email,
        password,
      }, { abortEarly: false });
    } catch (error) {
      res.status(400);
      throw error;
    }
    const user = await User.query().where({ email }).first();
    if (!user) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(401);
      throw error;
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(401);
      throw error;
    }
    delete user.password;
    const payload = {
      id: user.id,
      name: user.name,
      email,
    };
    const access_token = await sign(payload);
    res.json({ user: payload, access_token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
