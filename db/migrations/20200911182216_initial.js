const Knex = require('knex'); // eslint-disable-line

const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  // createNameTable,
  url,
  references,
} = require('../../src/lib/tableUtils');

// following code is to add auto complete for knex
/**
 *  @param {Knex} knex
 */

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.user, (table) => {
      table.increments().notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('name').notNullable();
      table.string('password', 127).notNullable();
      table.datetime('last_login');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.audience, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.string('location');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.icon, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable();
      table.enu('type', ['AVATAR', 'ICON']);
      url(table, 'base_url');
      table.string('resource').notNullable();
      addDefaultColumns(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.teacher, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.enu('gender', ['MALE', 'FEMALE']);
    references(table, tableNames.icon, false);
    table.integer('star');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.classroom, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    references(table, tableNames.icon, false);
    references(table, tableNames.audience);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.class_type, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.string('color').notNullable();
    table.integer('duration');
    references(table, tableNames.audience);
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.classroom,
    tableNames.class_type,
    tableNames.teacher,
    tableNames.audience,
    tableNames.user,
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
  await Promise.all([
    tableNames.icon,
    tableNames.audience,
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
};

exports.config = { transaction: false };
