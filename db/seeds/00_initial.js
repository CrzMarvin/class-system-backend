const Knex = require('knex'); // eslint-disable-line
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const tableNames = require('../../src/constants/tableNames');
const icons = require('../../src/constants/icons');
const classrooms = require('../../src/constants/classrooms');
const teachers = require('../../src/constants/teachers');
const class_types = require('../../src/constants/classTypes');
// following code is to add auto complete for knex
/**
 *  @param {Knex} knex
 */

exports.seed = async (knex) => {
  //  pipe await func in array
  // await orderedTableNames
  //   .reduce(
  //     async (promise, table_name) => {
  //       await promise;
  //       return knex(table_name).del();
  //     },
  //     Promise.resolve(),
  //   );
  await Promise.all(Object
    .keys(tableNames)
    .map((name) => knex(name).del()));
  const password = crypto.randomBytes(15).toString('hex');
  const user = {
    email: 'Lemon_Rum@outlook.com',
    name: 'CX',
    password: await bcrypt.hash(password, 12),
  };
  const [createdUser] = await knex(tableNames.user)
    .insert(user)
    .returning('*');
  if (process.env.NODE_ENV !== 'test') {
    console.log('User created:', { password }, createdUser);
  }
  const audience = {
    name: '园区',
    location: '工业园区观枫街1号,文博广场B06-天天打击乐',
  };
  const [createdAud] = await knex(tableNames.audience)
    .insert(audience)
    .returning('*');
  console.log('createdAud', createdAud);
  const { id: audience_id } = createdAud;
  await knex(tableNames.icon)
    .insert(icons, '*');
  classrooms.forEach((classroom) => {
    classroom.audience_id = audience_id; // eslint-disable-line
  });
  class_types.forEach((class_type) => {
    class_type.audience_id = audience_id; // eslint-disable-line
  });
  await knex(tableNames.classroom)
    .insert(classrooms, '*');
  await knex(tableNames.teacher)
    .insert(teachers, '*');
  await knex(tableNames.class_type)
    .insert(class_types, '*');
};
