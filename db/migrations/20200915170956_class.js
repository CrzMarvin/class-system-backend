const Knex = require('knex'); // eslint-disable-line
const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  references,
  // url,
} = require('../../src/lib/tableUtils');

// following code is to add auto complete for knex
// ps: if you use {import('Knex')}, you don't have to require() on the top like the following code
/**
 *  @param {import('Knex')} knex
 */

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.course, (table) => {
    table.increments();
    references(table, tableNames.teacher, false);
    references(table, tableNames.classroom, false);
    references(table, tableNames.class_type, false, 'type');
    table.integer('weekday_index');
    table.string('start_time');
    table.string('end_time');
    // table.dateTime('expiration_date');
    addDefaultColumns(table);
  });
};

/**
 *  @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.course,
    ]
      .reverse()
      .map((name) => knex.schema.dropTableIfExists(name)),
  );
};
